var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_helmet = __toESM(require("helmet"), 1);
var import_cookie_parser = __toESM(require("cookie-parser"), 1);
var import_express_rate_limit = __toESM(require("express-rate-limit"), 1);
var import_bcryptjs = __toESM(require("bcryptjs"), 1);
var import_crypto = __toESM(require("crypto"), 1);
var import_sanitize_html = __toESM(require("sanitize-html"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = Number(process.env.PORT) || 3e3;
var IS_PROD = process.env.NODE_ENV === "production";
app.use(
  (0, import_helmet.default)({
    contentSecurityPolicy: IS_PROD ? {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com"
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com"
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https://images.unsplash.com",
          "https://www.google.com",
          "https://*.google.com"
        ],
        mediaSrc: ["'self'", "blob:", "data:"],
        connectSrc: ["'self'", "https://generativelanguage.googleapis.com"],
        frameAncestors: ["'none'"],
        objectSrc: ["'none'"]
      }
    } : false,
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" }
  })
);
app.disable("x-powered-by");
app.use((0, import_cookie_parser.default)(process.env.COOKIE_SECRET || "pujya_agritech_secure_cookie_secret_2026"));
app.use(import_express.default.json({ limit: "1mb" }));
app.use(import_express.default.urlencoded({ extended: true, limit: "1mb" }));
var publicApiLimiter = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many requests from this IP. Please try again later." }
});
var adminLoginLimiter = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 5,
  // Max 5 failed attempts per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many failed login attempts. Account temporarily locked for 15 minutes." }
});
var ADMIN_USERNAME = process.env.ADMIN_USERNAME || "pujya_root_admin";
var currentAdminPasswordHash = process.env.ADMIN_PASSWORD_HASH || import_bcryptjs.default.hashSync("PjA!9vQ#7mL2@xR8$K4z!N6cT", 12);
var activeAdminSessions = /* @__PURE__ */ new Map();
var forcePasswordChange = true;
function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  return (0, import_sanitize_html.default)(input.trim(), {
    allowedTags: [],
    allowedAttributes: {}
  });
}
function requireAdminAuth(req, res, next) {
  const sessionToken = req.cookies?.pujya_admin_session;
  if (!sessionToken || !activeAdminSessions.has(sessionToken)) {
    res.status(401).json({ success: false, error: "Unauthorized. Valid admin session required." });
    return;
  }
  const session = activeAdminSessions.get(sessionToken);
  if (Date.now() - session.createdAt > 8 * 60 * 60 * 1e3) {
    activeAdminSessions.delete(sessionToken);
    res.clearCookie("pujya_admin_session");
    res.status(401).json({ success: false, error: "Session expired. Please log in again." });
    return;
  }
  req.adminSession = session;
  next();
}
var quoteRequests = [
  {
    id: "PQ-1001",
    name: "Rajesh Kumar",
    phone: "+91 99744 31960",
    email: "info@pujyaagritech.com",
    company: "Pujya Sales Corp",
    city: "Ahmedabad",
    location: "Ahmedabad, Gujarat",
    source: "Website Consultation Form",
    structureType: "Green House Structure",
    areaSqM: 4e3,
    notes: "Inquiry regarding shade net houses and poly film supply.",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  }
];
app.get("/sitemap.xml", (_req, res) => {
  res.header("Content-Type", "application/xml");
  res.sendFile(import_path.default.join(process.cwd(), "public", "sitemap.xml"));
});
app.get("/robots.txt", (_req, res) => {
  res.header("Content-Type", "text/plain");
  res.sendFile(import_path.default.join(process.cwd(), "public", "robots.txt"));
});
app.get("/site.webmanifest", (_req, res) => {
  res.header("Content-Type", "application/manifest+json");
  res.sendFile(import_path.default.join(process.cwd(), "public", "site.webmanifest"));
});
app.get("/google:token.html", (req, res) => {
  const filename = `google${req.params.token}.html`;
  const filePath = import_path.default.join(process.cwd(), "public", filename);
  res.header("Content-Type", "text/html");
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("Google Search Console verification file not found.");
    }
  });
});
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", company: "Pujya Agritech", estd: 2017 });
});
app.post("/api/quotes", publicApiLimiter, (req, res) => {
  const name = sanitizeInput(req.body.name);
  const phone = sanitizeInput(req.body.phone || req.body.mobile);
  const email = sanitizeInput(req.body.email);
  const company = sanitizeInput(req.body.company);
  const city = sanitizeInput(req.body.city);
  const location = sanitizeInput(req.body.location || req.body.city);
  const source = sanitizeInput(req.body.source || "Website Form");
  const consent = Boolean(req.body.consent);
  const structureType = sanitizeInput(req.body.structureType) || source;
  const areaSqM = Number(req.body.areaSqM) || 1e3;
  const notes = sanitizeInput(req.body.notes) || `Lead Source: ${source}`;
  if (!name || !phone) {
    res.status(400).json({ success: false, error: "Name and phone number are required." });
    return;
  }
  const newQuote = {
    id: `PQ-${Math.floor(1e3 + Math.random() * 9e3)}`,
    name,
    phone,
    email: email || "",
    company: company || "",
    city: city || "",
    location: location || city || "India",
    source,
    consent,
    structureType,
    areaSqM,
    notes: notes || "",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  quoteRequests.unshift(newQuote);
  res.status(201).json({
    success: true,
    quote: newQuote,
    message: "Inquiry submitted successfully! Pujya Agritech team will contact you shortly."
  });
});
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

Thank you for inquiring about **${structureType || "Protected Cultivation Solutions"}**!

Pujya Agritech was established in 2017. Headquartered in Ahmedabad, Gujarat, with manufacturing facility in Gandhinagar, Gujarat, we manufacture and supply:
- Green Houses, Shade Net Houses, Poly Tunnels
- Hydroponics, Cattle Shelters, Poultry Farms
- Agricultural Protective Materials (Pan-India supply)

*Contact Pujya Agritech directly at +91 99744 31960 / +91 90814 12412 or info@pujyaagritech.com for details.*`
      });
      return;
    }
    const ai = new import_genai.GoogleGenAI({ apiKey });
    const prompt = `You are the AI Assistant for "Pujya Agritech" (Protected Cultivation Technology, Established 2017, Ahmedabad & Gandhinagar, Gujarat).
Pujya Agritech provides:
- Green Houses, Shade Net Houses, Poly Tunnels
- Hydroponics, Cattle Shelters, Poultry Farms
- Agricultural Protective Materials (Poly Film, Shade Nets, Insect Nets, Mulch Film, Weed Mat, Pond Liners, etc.)

User Context: Crop: ${crop || "General"}, Location: ${location || "India"}, Structure: ${structureType || "General"}, Area: ${areaSqM || "N/A"}
Inquiry: "${message}"

Provide a professional response. Recommend contacting Pujya Agritech at +91 99744 31960 / +91 90814 12412 / info@pujyaagritech.com.`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });
    res.json({
      success: true,
      reply: response.text || "Thank you for contacting Pujya Agritech. Please reach out to our team at +91 99744 31960 / +91 90814 12412 or info@pujyaagritech.com."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error processing inquiry.",
      fallback: "Pujya Agritech provides protected cultivation technology and materials. Please contact +91 99744 31960 / +91 90814 12412 or info@pujyaagritech.com."
    });
  }
});
app.post("/api/admin/login", adminLoginLimiter, (req, res) => {
  const username = sanitizeInput(req.body.username);
  const password = typeof req.body.password === "string" ? req.body.password : "";
  if (!username || !password) {
    res.status(400).json({ success: false, error: "Invalid credentials." });
    return;
  }
  const isValidUsername = username === ADMIN_USERNAME;
  const isPasswordCorrect = import_bcryptjs.default.compareSync(password, currentAdminPasswordHash);
  if (!isValidUsername || !isPasswordCorrect) {
    res.status(401).json({ success: false, error: "Invalid username or password." });
    return;
  }
  const sessionToken = import_crypto.default.randomBytes(32).toString("hex");
  activeAdminSessions.set(sessionToken, {
    username: ADMIN_USERNAME,
    createdAt: Date.now(),
    requiresPasswordChange: forcePasswordChange
  });
  res.cookie("pujya_admin_session", sessionToken, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "strict",
    maxAge: 8 * 60 * 60 * 1e3
    // 8 Hours
  });
  res.json({
    success: true,
    message: "Admin authentication successful.",
    requiresPasswordChange: forcePasswordChange
  });
});
app.get("/api/admin/session", (req, res) => {
  const sessionToken = req.cookies?.pujya_admin_session;
  if (sessionToken && activeAdminSessions.has(sessionToken)) {
    const session = activeAdminSessions.get(sessionToken);
    res.json({
      authenticated: true,
      username: session.username,
      requiresPasswordChange: session.requiresPasswordChange
    });
  } else {
    res.json({ authenticated: false });
  }
});
app.post("/api/admin/change-password", requireAdminAuth, (req, res) => {
  const oldPassword = typeof req.body.oldPassword === "string" ? req.body.oldPassword : "";
  const newPassword = typeof req.body.newPassword === "string" ? req.body.newPassword : "";
  if (!import_bcryptjs.default.compareSync(oldPassword, currentAdminPasswordHash)) {
    res.status(400).json({ success: false, error: "Incorrect current password." });
    return;
  }
  if (!newPassword || newPassword.length < 16) {
    res.status(400).json({
      success: false,
      error: "New password must be at least 16 characters long for administrator security."
    });
    return;
  }
  currentAdminPasswordHash = import_bcryptjs.default.hashSync(newPassword, 12);
  forcePasswordChange = false;
  const currentToken = req.cookies?.pujya_admin_session;
  activeAdminSessions.forEach((_val, key) => {
    if (key !== currentToken) activeAdminSessions.delete(key);
  });
  if (currentToken && activeAdminSessions.has(currentToken)) {
    activeAdminSessions.get(currentToken).requiresPasswordChange = false;
  }
  res.json({ success: true, message: "Admin password updated successfully." });
});
app.post("/api/admin/logout", (req, res) => {
  const sessionToken = req.cookies?.pujya_admin_session;
  if (sessionToken) {
    activeAdminSessions.delete(sessionToken);
    res.clearCookie("pujya_admin_session");
  }
  res.json({ success: true, message: "Logged out successfully." });
});
app.get("/api/admin/quotes", requireAdminAuth, (_req, res) => {
  res.json({ success: true, quotes: quoteRequests });
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Pujya Agritech secure server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
