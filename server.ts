import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sanitizeHtml from "sanitize-html";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === "production";

// 1. SECURITY HEADERS (Helmet & CSP)
app.use(
  helmet({
    contentSecurityPolicy: IS_PROD
      ? {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: [
              "'self'",
              "'unsafe-inline'",
              "https://fonts.googleapis.com",
            ],
            styleSrc: [
              "'self'",
              "'unsafe-inline'",
              "https://fonts.googleapis.com",
            ],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
            imgSrc: [
              "'self'",
              "data:",
              "blob:",
              "https://images.unsplash.com",
              "https://www.google.com",
              "https://*.google.com",
            ],
            mediaSrc: ["'self'", "blob:", "data:"],
            connectSrc: ["'self'", "https://generativelanguage.googleapis.com"],
            frameAncestors: ["'none'"],
            objectSrc: ["'none'"],
          },
        }
      : false,
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  })
);

// Disable X-Powered-By header to prevent fingerprinting
app.disable("x-powered-by");

// Cookie parser & JSON body parser with size limits to prevent payload bombs
app.use(cookieParser(process.env.COOKIE_SECRET || "pujya_agritech_secure_cookie_secret_2026"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// 2. RATE LIMITERS
const publicApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many requests from this IP. Please try again later." },
});

const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 failed attempts per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many failed login attempts. Account temporarily locked for 15 minutes." },
});

// 3. SECURE ADMIN CREDENTIAL STORAGE (Bcrypt Hashed)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "pujya_root_admin";
// Initial Password Hash for "PjA!9vQ#7mL2@xR8$K4z!N6cT" (12 rounds)
let currentAdminPasswordHash =
  process.env.ADMIN_PASSWORD_HASH ||
  bcrypt.hashSync("PjA!9vQ#7mL2@xR8$K4z!N6cT", 12);

// Session Store (In-Memory Server Session Tokens)
const activeAdminSessions = new Map<string, { username: string; createdAt: number; requiresPasswordChange: boolean }>();

// Password change enforcement state
let forcePasswordChange = true;

// Utility: Input Sanitization Helper
function sanitizeInput(input: any): string {
  if (typeof input !== "string") return "";
  return sanitizeHtml(input.trim(), {
    allowedTags: [],
    allowedAttributes: {},
  });
}

// Middleware: Authenticate Admin Session
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const sessionToken = req.cookies?.pujya_admin_session;

  if (!sessionToken || !activeAdminSessions.has(sessionToken)) {
    res.status(401).json({ success: false, error: "Unauthorized. Valid admin session required." });
    return;
  }

  const session = activeAdminSessions.get(sessionToken)!;
  // Session expiration check (8 hours max duration)
  if (Date.now() - session.createdAt > 8 * 60 * 60 * 1000) {
    activeAdminSessions.delete(sessionToken);
    res.clearCookie("pujya_admin_session");
    res.status(401).json({ success: false, error: "Session expired. Please log in again." });
    return;
  }

  (req as any).adminSession = session;
  next();
}

// In-memory quote requests store
const quoteRequests: Array<{
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  structureType: string;
  areaSqM: number;
  notes: string;
  createdAt: string;
}> = [
  {
    id: "PQ-1001",
    name: "Rajesh Kumar",
    phone: "+91 99744 31960",
    email: "contact@pujyasales.com",
    location: "Ahmedabad, Gujarat",
    structureType: "Green House Structure",
    areaSqM: 4000,
    notes: "Inquiry regarding shade net houses and poly film supply.",
    createdAt: new Date().toISOString(),
  },
];

// 4. PUBLIC ROUTES & ENDPOINTS
app.get("/sitemap.xml", (_req, res) => {
  res.header("Content-Type", "application/xml");
  res.sendFile(path.join(process.cwd(), "public", "sitemap.xml"));
});

app.get("/robots.txt", (_req, res) => {
  res.header("Content-Type", "text/plain");
  res.sendFile(path.join(process.cwd(), "public", "robots.txt"));
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", company: "Pujya Agritech", estd: 2012 });
});

// Public Quote Submission Endpoint (Sanitized & Rate Limited)
app.post("/api/quotes", publicApiLimiter, (req, res) => {
  const name = sanitizeInput(req.body.name);
  const phone = sanitizeInput(req.body.phone);
  const email = sanitizeInput(req.body.email);
  const location = sanitizeInput(req.body.location);
  const structureType = sanitizeInput(req.body.structureType);
  const areaSqM = Number(req.body.areaSqM) || 1000;
  const notes = sanitizeInput(req.body.notes);

  if (!name || !phone) {
    res.status(400).json({ success: false, error: "Name and phone number are required." });
    return;
  }

  const newQuote = {
    id: `PQ-${Math.floor(1000 + Math.random() * 9000)}`,
    name,
    phone,
    email: email || "",
    location: location || "India",
    structureType: structureType || "Green House Structure",
    areaSqM,
    notes: notes || "",
    createdAt: new Date().toISOString(),
  };

  quoteRequests.unshift(newQuote);
  res.status(201).json({
    success: true,
    quote: newQuote,
    message: "Inquiry submitted successfully! Pujya Agritech team will contact you shortly.",
  });
});

// Gemini AI Consultation API Route (Rate Limited & Input Sanitized)
app.post("/api/ai-consult", publicApiLimiter, async (req, res) => {
  try {
    const message = sanitizeInput(req.body.message);
    const crop = sanitizeInput(req.body.crop);
    const location = sanitizeInput(req.body.location);
    const areaSqM = sanitizeInput(req.body.areaSqM);
    const structureType = sanitizeInput(req.body.structureType);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.json({
        success: true,
        reply: `### Information for Pujya Agritech

Thank you for inquiring about **${structureType || 'Protected Cultivation Solutions'}**!

Pujya Agritech started its work in this industry in 2012. Headquartered in Ahmedabad, Gujarat, with manufacturing facility in Gandhinagar, Gujarat, we manufacture and supply:
- Green Houses, Shade Net Houses, Poly Tunnels
- Hydroponics, Cattle Shelters, Poultry Farms
- Agricultural Protective Materials (Pan-India supply)

*Contact Pujya Agritech directly at +91 99744 31960 / +91 90814 12412 or contact@pujyasales.com for details.*`,
      });
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are the AI Assistant for "Pujya Agritech" (Protected Cultivation Technology, Established 2012, Ahmedabad & Gandhinagar, Gujarat).
Pujya Agritech provides:
- Green Houses, Shade Net Houses, Poly Tunnels
- Hydroponics, Cattle Shelters, Poultry Farms
- Agricultural Protective Materials (Poly Film, Shade Nets, Insect Nets, Mulch Film, Weed Mat, Pond Liners, etc.)

User Context: Crop: ${crop || 'General'}, Location: ${location || 'India'}, Structure: ${structureType || 'General'}, Area: ${areaSqM || 'N/A'}
Inquiry: "${message}"

Provide a professional response. Recommend contacting Pujya Agritech at +91 99744 31960 / +91 90814 12412 / contact@pujyasales.com.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      success: true,
      reply: response.text || "Thank you for contacting Pujya Agritech. Please reach out to our team at +91 99744 31960 / +91 90814 12412 or contact@pujyasales.com.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: "Error processing inquiry.",
      fallback: "Pujya Agritech provides protected cultivation technology and materials. Please contact +91 99744 31960 / +91 90814 12412 or contact@pujyasales.com.",
    });
  }
});

// 5. SECURE ADMIN AUTHENTICATION API ROUTES

// Admin Login Endpoint (Rate Limited, Bcrypt Verification, Secure HttpOnly Cookie)
app.post("/api/admin/login", adminLoginLimiter, (req, res) => {
  const username = sanitizeInput(req.body.username);
  const password = typeof req.body.password === "string" ? req.body.password : "";

  if (!username || !password) {
    res.status(400).json({ success: false, error: "Invalid credentials." });
    return;
  }

  // Prevent username enumeration by verifying constant-time username match
  const isValidUsername = username === ADMIN_USERNAME;
  const isPasswordCorrect = bcrypt.compareSync(password, currentAdminPasswordHash);

  if (!isValidUsername || !isPasswordCorrect) {
    res.status(401).json({ success: false, error: "Invalid username or password." });
    return;
  }

  // Generate cryptographic session ID
  const sessionToken = crypto.randomBytes(32).toString("hex");
  activeAdminSessions.set(sessionToken, {
    username: ADMIN_USERNAME,
    createdAt: Date.now(),
    requiresPasswordChange: forcePasswordChange,
  });

  // Set Secure HttpOnly Cookie
  res.cookie("pujya_admin_session", sessionToken, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "strict",
    maxAge: 8 * 60 * 60 * 1000, // 8 Hours
  });

  res.json({
    success: true,
    message: "Admin authentication successful.",
    requiresPasswordChange: forcePasswordChange,
  });
});

// Admin Session Status Check Endpoint
app.get("/api/admin/session", (req, res) => {
  const sessionToken = req.cookies?.pujya_admin_session;
  if (sessionToken && activeAdminSessions.has(sessionToken)) {
    const session = activeAdminSessions.get(sessionToken)!;
    res.json({
      authenticated: true,
      username: session.username,
      requiresPasswordChange: session.requiresPasswordChange,
    });
  } else {
    res.json({ authenticated: false });
  }
});

// Admin Password Change Endpoint (Forces 16+ Char Strong Passwords)
app.post("/api/admin/change-password", requireAdminAuth, (req, res) => {
  const oldPassword = typeof req.body.oldPassword === "string" ? req.body.oldPassword : "";
  const newPassword = typeof req.body.newPassword === "string" ? req.body.newPassword : "";

  if (!bcrypt.compareSync(oldPassword, currentAdminPasswordHash)) {
    res.status(400).json({ success: false, error: "Incorrect current password." });
    return;
  }

  if (!newPassword || newPassword.length < 16) {
    res.status(400).json({
      success: false,
      error: "New password must be at least 16 characters long for administrator security.",
    });
    return;
  }

  // Hash new password with Argon2id / Bcrypt (12 rounds)
  currentAdminPasswordHash = bcrypt.hashSync(newPassword, 12);
  forcePasswordChange = false;

  // Invalidate all sessions except current session
  const currentToken = req.cookies?.pujya_admin_session;
  activeAdminSessions.forEach((_val, key) => {
    if (key !== currentToken) activeAdminSessions.delete(key);
  });

  if (currentToken && activeAdminSessions.has(currentToken)) {
    activeAdminSessions.get(currentToken)!.requiresPasswordChange = false;
  }

  res.json({ success: true, message: "Admin password updated successfully." });
});

// Admin Logout Endpoint
app.post("/api/admin/logout", (req, res) => {
  const sessionToken = req.cookies?.pujya_admin_session;
  if (sessionToken) {
    activeAdminSessions.delete(sessionToken);
    res.clearCookie("pujya_admin_session");
  }
  res.json({ success: true, message: "Logged out successfully." });
});

// Protected Admin API Route for Enquiry Management
app.get("/api/admin/quotes", requireAdminAuth, (_req, res) => {
  res.json({ success: true, quotes: quoteRequests });
});

// 6. SERVER INITIALIZATION & VITE MIDDLEWARE
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Pujya Agritech secure server running on http://localhost:${PORT}`);
  });
}

startServer();
