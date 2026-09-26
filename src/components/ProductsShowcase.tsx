import React, { useState } from 'react';
import { ArrowRight, Sprout } from 'lucide-react';
import { ProductDetailView } from './ProductDetailView';
import { useAdmin } from '../context/AdminContext';

export interface ProductItemData {
  id: string;
  slug: string;
  category: 'turnkey-project' | 'greenhouse-material';
  categoryLabel: string;
  name: string;
  shortDescription: string;
  fullOverview: string;
  imageUrl: string;
  galleryImages?: string[];
  features?: string[];
  specifications?: {
    model?: string;
    standardGrids?: string;
    gutterHeight?: string;
    gutterHeightLabel?: string;
    topHeight?: string;
    topVent?: string;
    sideVent?: string;
    sideCorridors?: string;
    suitableCrops?: string;
    [key: string]: any;
  };
}

export const PRODUCT_CATALOGUE: ProductItemData[] = [
  // ================= 01 — GREEN HOUSE TURNKEY PROJECT =================
  {
    id: 'turnkey-1',
    slug: 'naturally-ventilated-poly-house',
    category: 'turnkey-project',
    categoryLabel: 'Green House Turnkey Project',
    name: 'Naturally Ventilated Poly House',
    shortDescription: 'Designed for sustainable cultivation, naturally ventilated greenhouses reduce energy consumption while maintaining ideal growing conditions.',
    fullOverview: 'Designed for sustainable cultivation, naturally ventilated greenhouses reduce energy consumption while maintaining ideal growing conditions. Natural air circulation continuously expels excess heat and moisture, creating a healthier environment for flowers and sensitive crops. Adaptable to diverse weather conditions, these greenhouses are a reliable solution for growers around the globe.',
    imageUrl: '/products/Naturally Ventilated Poly House.png',
    galleryImages: ['/products/Naturally Ventilated Poly House.png'],
    features: [
      'Hot-dip galvanized structural GI steel tubular framing',
      '200-micron UV-stabilized anti-drip poly film cladding',
      'Continuous top ridge vent and perimeter skirt vents',
      '40-mesh / 50-mesh anti-insect side net curtains',
      'Trellising wire framework for vertical crop support',
    ],
    specifications: {
      model: 'NVPH',
      standardGrids: '8m × 4m',
      gutterHeight: '4m / 4.5m',
      gutterHeightLabel: 'Std. Gutter Height',
      topHeight: '6m / 6.5m',
      topVent: '1m / 1.2m',
      sideVent: '3m / 3.5m',
      sideCorridors: '2m / 2.5m',
      suitableCrops: 'Exotic Vegetables & Flowers etc.',
    },
  },
  {
    id: 'turnkey-2',
    slug: 'fan-and-pad-poly-house',
    category: 'turnkey-project',
    categoryLabel: 'Green House Turnkey Project',
    name: 'Fan & Pad Poly House',
    shortDescription: 'Active evaporative cooling systems engineered for precise micro-climate control in high-temperature regions.',
    fullOverview: 'Engineered for extreme heat environments, Fan & Pad poly houses utilize cellulose evaporative cooling wall pads combined with heavy-duty axial exhaust fans. The system pulls ambient air through moist cooling pads, dropping internal temperatures by 8°C to 12°C while controlling humidity for sensitive crops.',
    imageUrl: '/products/FAN & PAD POLY HOUSE.png',
    galleryImages: ['/products/FAN & PAD POLY HOUSE.png'],
    features: [
      'High-efficiency cellulose evaporative cooling wall pads',
      'Heavy-duty 50-inch axial exhaust fans with louvers',
      'Automated climate controller panel with temp & humidity sensors',
      '200-micron anti-drip multi-layer poly film cladding',
      'Drip irrigation and fogging system compatibility',
    ],
    specifications: {
      model: 'FPPH',
      standardGrids: '8m × 4m',
      gutterHeight: '4m / 4.5m',
      gutterHeightLabel: 'Std. Gutter Height',
      topHeight: '6m / 6.5m',
      topVent: 'Automated Fans',
      sideVent: 'Cooling Pad Wall',
      sideCorridors: '2m / 2.5m',
      suitableCrops: 'Gerbera, Dutch Roses, Strawberries & Tomatoes',
    },
  },
  {
    id: 'turnkey-3',
    slug: 'dome-shape-net-house',
    category: 'turnkey-project',
    categoryLabel: 'Green House Turnkey Project',
    name: 'Dome Shape Net House',
    shortDescription: 'A modern protected cultivation structure with a curved roof design covered by high-quality shade or insect-proof net.',
    fullOverview: 'A modern protected cultivation structure with a curved roof design covered by high-quality shade or insect-proof net. It provides excellent ventilation, protection from insects and adverse weather conditions, and creates an ideal environment for growing vegetables, flowers, nurseries, and high-value crops while reducing cultivation costs.',
    imageUrl: '/products/dome shape net house.jpeg',
    galleryImages: ['/products/dome shape net house.jpeg'],
    features: [
      'Aerodynamic curved dome frame configuration',
      'UV-stabilized HDPE agro shade net cladding',
      'Heavy-duty GI structural post and purlin arrangement',
      'Side curtain mesh for cross-ventilation',
      'Compatible with micro-sprinkler & overhead fogging',
    ],
    specifications: {
      model: 'DSNH',
      standardGrids: '6m × 4m / 6m × 6m',
      gutterHeight: '3.5m / 4m',
      gutterHeightLabel: 'Std. Side Height',
      topHeight: '5.5m / 6m',
      topVent: 'NA',
      sideVent: 'NA',
      sideCorridors: '2m / 2.5m',
      suitableCrops: 'Exotic Vegetables & Nursery Holders etc.',
    },
  },
  {
    id: 'turnkey-4',
    slug: 'flat-type-net-house',
    category: 'turnkey-project',
    categoryLabel: 'Green House Turnkey Project',
    name: 'Flat Type Net House',
    shortDescription: 'Flat Type Net House is a cost-effective protected cultivation structure designed to protect crops from insects, birds, and harsh weather.',
    fullOverview: 'Flat Type Net House is a cost-effective protected cultivation structure designed to protect crops from insects, birds, and harsh weather conditions while improving crop quality and productivity through a controlled growing environment.',
    imageUrl: '/products/FLAT TYPE NET HOUSE.jpeg',
    galleryImages: ['/products/FLAT TYPE NET HOUSE.jpeg'],
    features: [
      'High-tension cable and GI post layout',
      'UV-treated monofilament anti-insect netting',
      'Uniform light diffusion across crop canopy',
      'Economical construction for commercial farming',
    ],
    specifications: {
      model: 'FTNH',
      standardGrids: '6m × 4m / 6m × 6m',
      gutterHeight: '4m / 4.5m / 5m',
      gutterHeightLabel: 'Std. Side Height',
      topHeight: '4m / 4.5m / 5m',
      topVent: 'NA',
      sideVent: 'NA',
      sideCorridors: '2m / 2.5m',
      suitableCrops: 'Exotic Vegetables & Nursery Holders etc.',
    },
  },
  {
    id: 'turnkey-5',
    slug: 'wire-rope-net-house',
    category: 'turnkey-project',
    categoryLabel: 'Green House Turnkey Project',
    name: 'Wire Rope Net House',
    shortDescription: 'An advanced protected cultivation structure designed with high-tensile wire rope support systems and premium-quality nets.',
    fullOverview: 'An advanced protected cultivation structure designed with high-tensile wire rope support systems and premium-quality nets. It provides effective protection against insects, birds, and adverse weather conditions while ensuring excellent ventilation and optimum growing conditions. Ideal for vegetables, flowers, fruits, and nursery crops, it helps farmers achieve higher productivity, better crop quality, and improved profitability.',
    imageUrl: '/products/WIRE ROPE NET HOUSE.png',
    galleryImages: ['/products/WIRE ROPE NET HOUSE.png'],
    features: [
      'High-grade galvanized steel wire rope network',
      'Reinforced perimeter anchoring columns',
      'Multi-season UV-stabilized net cladding',
      'Low structural shadow footprint',
    ],
    specifications: {
      model: 'WRNH',
      standardGrids: '8m × 6m / 8m × 4m',
      gutterHeight: '4m / 5m',
      gutterHeightLabel: 'Std. Side Height',
      topHeight: '4m / 5m',
      topVent: 'NA',
      sideVent: 'NA',
      sideCorridors: '2m / 2.5m',
      suitableCrops: 'Exotic Vegetables, Ornamental Plants, Medicinal Plants, etc.',
    },
  },
  {
    id: 'turnkey-6',
    slug: 'multi-span-tunnel',
    category: 'turnkey-project',
    categoryLabel: 'Green House Turnkey Project',
    name: 'Multi Span Tunnel',
    shortDescription: 'Multi Span Tunnel is a large protected cultivation structure formed by connecting multiple tunnel units.',
    fullOverview: 'Multi Span Tunnel is a large protected cultivation structure formed by connecting multiple tunnel units. It provides an ideal microclimate for vegetables, flowers, and nursery crops, ensuring higher productivity, improved crop quality, and protection from adverse weather conditions.',
    imageUrl: '/products/multi span tunnel house.png',
    galleryImages: ['/products/multi span tunnel house.png'],
    features: [
      'Interconnected GI pipe hoop arches',
      'Clear high-PAR transmission poly film covering',
      'Simple roll-up side ventilation design',
      'Modular bolt-together assembly',
    ],
    specifications: {
      model: 'MST',
      standardGrids: '8m × 2.5m / 9m × 3m',
      gutterHeight: '2m / 2.5m',
      gutterHeightLabel: 'Std. Side Height',
      topHeight: '4.5m / 5m',
      topVent: 'NA',
      sideVent: 'NA',
      sideCorridors: '2m',
      suitableCrops: 'Exotic Vegetables, Exotic Fruit like Blue Berry etc.',
    },
  },

  // ================= 02 — GREEN HOUSE MATERIAL (EXACT 48 BROCHURE PRODUCTS) =================
  {
    id: 'mat-1',
    slug: 'five-way-plates-flat-roof-nethouses',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Five Way Plates for Flat Roof Nethouses',
    shortDescription: 'Five-way structural connector plates designed for joining greenhouse or flat-roof shade-net structural members. Provides a strong and practical connection point for frame assembly.',
    fullOverview: 'Five-way structural connector plates designed for joining greenhouse or flat-roof shade-net structural members. Provides a strong and practical connection point for frame assembly.',
    imageUrl: '/products/materials/Five_Way_Plates_for_Flat_Roof_Nethouses.jpg',
    galleryImages: ['/products/materials/Five_Way_Plates_for_Flat_Roof_Nethouses.jpg'],
    features: ['Five-way structural connector geometry', 'Provides strong connection point for frame assembly', 'Hot-dip galvanized finish'],
    specifications: { category: 'Green House Material', type: 'Structural Connector', application: 'Flat Roof Nethouse / Protected Cultivation' },
  },
  {
    id: 'mat-2',
    slug: '3-u-wire-gripper-clamp',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: '3-U Wire Gripper Clamp',
    shortDescription: 'A wire gripping clamp used for securing greenhouse covering/support wires. Designed for reliable wire retention during protected cultivation structure installation.',
    fullOverview: 'A wire gripping clamp used for securing greenhouse covering/support wires. Designed for reliable wire retention during protected cultivation structure installation.',
    imageUrl: '/products/materials/3_U_Wire_Gripper_Clamp.jpg',
    galleryImages: ['/products/materials/3_U_Wire_Gripper_Clamp.jpg'],
    features: ['High-friction wire gripping jaw design', 'Designed for reliable wire retention', 'Galvanized outdoor construction'],
    specifications: { category: 'Green House Material', type: 'Wire Clamp', application: 'Greenhouse / Shade Net Structure' },
  },
  {
    id: 'mat-3',
    slug: 'shade-net-stitching-pin',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Shade Net Stitching Pin',
    shortDescription: 'A pointed stitching pin used during shade-net installation and fixing. Helps secure and position shade-net material during structural installation.',
    fullOverview: 'A pointed stitching pin used during shade-net installation and fixing. Helps secure and position shade-net material during structural installation.',
    imageUrl: '/products/materials/Shade_Net_Stitching_Pin.jpg',
    galleryImages: ['/products/materials/Shade_Net_Stitching_Pin.jpg'],
    features: ['Pointed pin design for shade-net seams', 'Helps secure and position net material', 'Durable UV-treated polymer'],
    specifications: { category: 'Green House Material', type: 'Shade Net Accessory', application: 'Shade Net House' },
  },
  {
    id: 'mat-4',
    slug: 'shade-net-oval-clip-r-hook',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Shade Net Oval Clip & R Hook',
    shortDescription: 'An oval clip and R-hook assembly designed for fastening shade-net material to greenhouse structures. Useful for quick and secure net attachment.',
    fullOverview: 'An oval clip and R-hook assembly designed for fastening shade-net material to greenhouse structures. Useful for quick and secure net attachment.',
    imageUrl: '/products/materials/Shade_Net_Oval_Clip_and_R_Hook.jpg',
    galleryImages: ['/products/materials/Shade_Net_Oval_Clip_and_R_Hook.jpg'],
    features: ['Oval clamp jaws prevent fabric damage', 'Integrated metal R-hook attachment', 'Quick and secure net fixing'],
    specifications: { category: 'Green House Material', type: 'Shade Net Fastener', application: 'Shade Net House / Greenhouse' },
  },
  {
    id: 'mat-5',
    slug: 'wire-support-clip',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Wire Support Clip',
    shortDescription: 'A compact support clip used to hold and position wire elements within greenhouse structures. Suitable for installation and maintenance of protected cultivation systems.',
    fullOverview: 'A compact support clip used to hold and position wire elements within greenhouse structures. Suitable for installation and maintenance of protected cultivation systems.',
    imageUrl: '/products/materials/Wire_Support_Clip.jpg',
    galleryImages: ['/products/materials/Wire_Support_Clip.jpg'],
    features: ['Holds and positions structural wire elements', 'Protects support cables from friction wear', 'Easy snap-on attachment'],
    specifications: { category: 'Green House Material', type: 'Wire Support Accessory', application: 'Greenhouse Structure' },
  },
  {
    id: 'mat-6',
    slug: 'anchor-rods',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Anchor Rods',
    shortDescription: 'Structural anchoring components used to secure greenhouse structures to the ground. Designed to provide stability and reliable foundation support.',
    fullOverview: 'Structural anchoring components used to secure greenhouse structures to the ground. Designed to provide stability and reliable foundation support.',
    imageUrl: '/products/materials/Anchor_Rods.jpg',
    galleryImages: ['/products/materials/Anchor_Rods.jpg'],
    features: ['High pull-out ground resistance', 'Provides foundation stability and support', 'Galvanized finish against soil corrosion'],
    specifications: { category: 'Green House Material', type: 'Structural Anchor', application: 'Greenhouse Foundation' },
  },
  {
    id: 'mat-7',
    slug: 'steel-wire-rope-accessories',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Steel Wire Rope & Accessories',
    shortDescription: 'Steel wire rope supplied with related accessories for greenhouse structure and screen mechanisms. Used where durable tensioning and support are required.',
    fullOverview: 'Steel wire rope supplied with related accessories for greenhouse structure and screen mechanisms. Used where durable tensioning and support are required.',
    imageUrl: '/products/materials/Steel_Wire_Rope_and_Accessories.jpg',
    galleryImages: ['/products/materials/Steel_Wire_Rope_and_Accessories.jpg'],
    features: ['High-tensile galvanized wire rope strand', 'Includes tensioning thimbles and clamps', 'Essential for screen drive mechanisms'],
    specifications: { category: 'Green House Material', type: 'Wire Rope System', application: 'Greenhouse Structure / Screen System' },
  },
  {
    id: 'mat-8',
    slug: 'ring-hook-stainless-steel',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Ring Hook (Stainless Steel)',
    shortDescription: 'Stainless-steel ring hooks designed for hanging, fastening and supporting greenhouse components. Suitable for applications requiring durable corrosion-resistant hardware.',
    fullOverview: 'Stainless-steel ring hooks designed for hanging, fastening and supporting greenhouse components. Suitable for applications requiring durable corrosion-resistant hardware.',
    imageUrl: '/products/materials/Ring_Hook_Stainless_Steel.jpg',
    galleryImages: ['/products/materials/Ring_Hook_Stainless_Steel.jpg'],
    features: ['Stainless steel construction', 'Durable corrosion-resistant hardware', 'Ideal for humid greenhouse atmospheres'],
    specifications: { category: 'Green House Material', type: 'Hook / Fastener', material: 'Stainless Steel', application: 'Greenhouse Structure' },
  },
  {
    id: 'mat-9',
    slug: 'shade-net-joiner-with-small-pulley',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Shade Net Joiner with Small Pulley',
    shortDescription: 'A shade-net joining and movement component incorporating a small pulley. Designed to assist with practical installation and operation of shade-net systems.',
    fullOverview: 'A shade-net joining and movement component incorporating a small pulley. Designed to assist with practical installation and operation of shade-net systems.',
    imageUrl: '/products/materials/Shade_Net_Joiner_with_Small_Pulley.jpg',
    galleryImages: ['/products/materials/Shade_Net_Joiner_with_Small_Pulley.jpg'],
    features: ['Integrated seam clamp and mini pulley wheel', 'Assists smooth curtain movement', 'UV-resistant construction'],
    specifications: { category: 'Green House Material', type: 'Shade Net Accessory', application: 'Shade Net Structure' },
  },
  {
    id: 'mat-10',
    slug: 'metal-pulley-roller-bearing-inside',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Metal Pulley — Roller Bearing Inside',
    shortDescription: 'Metal pulley with an internal roller bearing for smooth movement of greenhouse screen or related mechanical components. Designed for repeated operational use.',
    fullOverview: 'Metal pulley with an internal roller bearing for smooth movement of greenhouse screen or related mechanical components. Designed for repeated operational use.',
    imageUrl: '/products/materials/Metal_Pulley_Roller_Bearing_Inside.jpg',
    galleryImages: ['/products/materials/Metal_Pulley_Roller_Bearing_Inside.jpg'],
    features: ['Internal sealed roller bearing', 'Smooth low-friction cable movement', 'Heavy-duty steel pulley casing'],
    specifications: { category: 'Green House Material', type: 'Pulley', application: 'Screen / Curtain System' },
  },
  {
    id: 'mat-11',
    slug: 'plastic-pulley-roller-bearing-inside',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Plastic Pulley — Roller Bearing Inside',
    shortDescription: 'Plastic pulley incorporating a roller bearing for smooth movement of greenhouse components. Lightweight and suitable for screen and curtain mechanisms.',
    fullOverview: 'Plastic pulley incorporating a roller bearing for smooth movement of greenhouse components. Lightweight and suitable for screen and curtain mechanisms.',
    imageUrl: '/products/materials/Plastic_Pulley_Roller_Bearing_Inside.jpg',
    galleryImages: ['/products/materials/Plastic_Pulley_Roller_Bearing_Inside.jpg'],
    features: ['Lightweight polymer sheave', 'Internal roller bearing', 'Weatherproof and low noise'],
    specifications: { category: 'Green House Material', type: 'Pulley', application: 'Screen / Curtain System' },
  },
  {
    id: 'mat-12',
    slug: 'uvs-ropes',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'UVS Ropes',
    shortDescription: 'UV-resistant ropes intended for greenhouse and protected cultivation applications. Used for supporting, securing and installing various greenhouse components.',
    fullOverview: 'UV-resistant ropes intended for greenhouse and protected cultivation applications. Used for supporting, securing and installing various greenhouse components.',
    imageUrl: '/products/materials/UVS_Ropes.jpg',
    galleryImages: ['/products/materials/UVS_Ropes.jpg'],
    features: ['UV-treated high tenacity fibers', 'Resists rot and degradation', 'Multi-purpose structural tying'],
    specifications: { category: 'Green House Material', type: 'Rope', application: 'Greenhouse / Trellising' },
  },
  {
    id: 'mat-13',
    slug: 'polyester-wire',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Polyester Wire',
    shortDescription: 'Polyester wire used for greenhouse support and cultivation applications. Suitable for systems requiring lightweight, durable and practical support material.',
    fullOverview: 'Polyester wire used for greenhouse support and cultivation applications. Suitable for systems requiring lightweight, durable and practical support material.',
    imageUrl: '/products/materials/Polyester_Wire.jpg',
    galleryImages: ['/products/materials/Polyester_Wire.jpg'],
    features: ['Lightweight and non-corrosive monofilament', 'High tensile support strength', 'Smooth surface protects plants'],
    specifications: { category: 'Green House Material', type: 'Support Wire', application: 'Greenhouse / Trellising' },
  },
  {
    id: 'mat-14',
    slug: 'greenhouse-film-repair-tape',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Greenhouse Film Repair Tape',
    shortDescription: 'Specialized tape for repairing greenhouse film and covering material. Helps seal minor tears and maintain the integrity of greenhouse cladding.',
    fullOverview: 'Specialized tape for repairing greenhouse film and covering material. Helps seal minor tears and maintain the integrity of greenhouse cladding.',
    imageUrl: '/products/materials/Greenhouse_Film_Repair_Tape.jpg',
    galleryImages: ['/products/materials/Greenhouse_Film_Repair_Tape.jpg'],
    features: ['High-tack UV-stabilized acrylic adhesive', 'Seals minor tears and punctures instantly', 'Transparent clear polyethylene backing'],
    specifications: { category: 'Green House Material', type: 'Repair Accessory', application: 'Greenhouse Film' },
  },
  {
    id: 'mat-15',
    slug: 'nut-bolts-hot-dip-galvanised',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Nut Bolts — Hot-Dip Galvanised',
    shortDescription: 'Hot-dip galvanised nuts and bolts for greenhouse structural assembly. The galvanised finish provides improved protection against corrosion in outdoor conditions.',
    fullOverview: 'Hot-dip galvanised nuts and bolts for greenhouse structural assembly. The galvanised finish provides improved protection against corrosion in outdoor conditions.',
    imageUrl: '/products/materials/Nut_Bolts_Hot_Dip_Galvanised.jpg',
    galleryImages: ['/products/materials/Nut_Bolts_Hot_Dip_Galvanised.jpg'],
    features: ['Hot-dip galvanised finish', 'Protects against outdoor weathering and rust', 'Standard metric structural thread sizes'],
    specifications: { category: 'Green House Material', type: 'Fastener', finish: 'Hot-Dip Galvanised', application: 'Greenhouse Structure' },
  },
  {
    id: 'mat-16',
    slug: 'self-drilling-screws',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Self Drilling Screws',
    shortDescription: 'Self-drilling screws designed for fastening greenhouse structural and accessory components. Suitable for efficient installation without requiring separate pilot drilling in many applications.',
    fullOverview: 'Self-drilling screws designed for fastening greenhouse structural and accessory components. Suitable for efficient installation without requiring separate pilot drilling in many applications.',
    imageUrl: '/products/materials/Self_Drilling_Screws.jpg',
    galleryImages: ['/products/materials/Self_Drilling_Screws.jpg'],
    features: ['Self-drilling point tip', 'Includes EPDM sealing washer', 'Fast installation in steel purlins'],
    specifications: { category: 'Green House Material', type: 'Structural Fastener', application: 'Greenhouse Structure' },
  },
  {
    id: 'mat-17',
    slug: 'shade-screen-system',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Shade Screen System',
    shortDescription: 'A screen system designed for controlled shading and environmental management inside protected cultivation structures. Helps manage light and crop growing conditions.',
    fullOverview: 'A screen system designed for controlled shading and environmental management inside protected cultivation structures. Helps manage light and crop growing conditions.',
    imageUrl: '/products/materials/Shade_Screen_System.jpg',
    galleryImages: ['/products/materials/Shade_Screen_System.jpg'],
    features: ['Regulates light intensity and solar heat', 'Retractable curtain mechanism', 'Helps manage microclimate conditions'],
    specifications: { category: 'Green House Material', type: 'Screen System', application: 'Greenhouse / Protected Cultivation' },
  },
  {
    id: 'mat-18',
    slug: 'gutter-funnel',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Gutter Funnel',
    shortDescription: 'A gutter funnel used as part of greenhouse rainwater drainage systems. Designed to collect and direct water from greenhouse gutters toward the drainage outlet.',
    fullOverview: 'A gutter funnel used as part of greenhouse rainwater drainage systems. Designed to collect and direct water from greenhouse gutters toward the drainage outlet.',
    imageUrl: '/products/materials/Gutter_Funnel.jpg',
    galleryImages: ['/products/materials/Gutter_Funnel.jpg'],
    features: ['Collects and routes rainwater to downspouts', 'Galvanized steel discharge box', 'Prevents gutter overflow at ends'],
    specifications: { category: 'Green House Material', type: 'Drainage Component', application: 'Greenhouse Gutter System' },
  },
  {
    id: 'mat-19',
    slug: 'stem-clip',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Stem Clip',
    shortDescription: 'A greenhouse trellising clip used to support and guide plant stems. Helps maintain organized crop growth within protected cultivation structures.',
    fullOverview: 'A greenhouse trellising clip used to support and guide plant stems. Helps maintain organized crop growth within protected cultivation structures.',
    imageUrl: '/products/materials/Stem_Clip.jpg',
    galleryImages: ['/products/materials/Stem_Clip.jpg'],
    features: ['Supports and guides vertical stems', 'Air-vented ring design', 'Quick snap lock closure'],
    specifications: { category: 'Green House Material', type: 'Trellising Accessory', application: 'Crop Trellising' },
  },
  {
    id: 'mat-20',
    slug: 'twine',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Twine',
    shortDescription: 'Trellising twine used to support climbing and vertically trained greenhouse crops. Suitable for crop training and plant support systems.',
    fullOverview: 'Trellising twine used to support climbing and vertically trained greenhouse crops. Suitable for crop training and plant support systems.',
    imageUrl: '/products/materials/Twine.jpg',
    galleryImages: ['/products/materials/Twine.jpg'],
    features: ['High knot strength polypropylene', 'UV-treated for multi-month crops', 'Soft surface protects vine stems'],
    specifications: { category: 'Green House Material', type: 'Trellising Accessory', application: 'Greenhouse Crop Support' },
  },
  {
    id: 'mat-21',
    slug: 'j-hook',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'J-Hook',
    shortDescription: 'A J-shaped hook used as a component of greenhouse crop trellising systems. Provides a practical hanging/support point for crop training.',
    fullOverview: 'A J-shaped hook used as a component of greenhouse crop trellising systems. Provides a practical hanging/support point for crop training.',
    imageUrl: '/products/materials/J_Hook.jpg',
    galleryImages: ['/products/materials/J_Hook.jpg'],
    features: ['Formed steel J-geometry', 'Provides practical support point for twine', 'Galvanized wire construction'],
    specifications: { category: 'Green House Material', type: 'Trellising Accessory', application: 'Greenhouse Trellising' },
  },
  {
    id: 'mat-22',
    slug: 's-hook',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'S-Hook',
    shortDescription: 'An S-shaped hook used for hanging and supporting trellising components. Suitable for flexible crop support arrangements.',
    fullOverview: 'An S-shaped hook used for hanging and supporting trellising components. Suitable for flexible crop support arrangements.',
    imageUrl: '/products/materials/S_Hook.jpg',
    galleryImages: ['/products/materials/S_Hook.jpg'],
    features: ['Dual-ended S hook design', 'Quick hook-on installation', 'Durable galvanized steel wire'],
    specifications: { category: 'Green House Material', type: 'Trellising Accessory', application: 'Greenhouse Trellising' },
  },
  {
    id: 'mat-23',
    slug: 'w-hook',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'W-Hook',
    shortDescription: 'A W-hook designed for greenhouse trellising and hanging applications. Used to support crop-training and related greenhouse components.',
    fullOverview: 'A W-hook designed for greenhouse trellising and hanging applications. Used to support crop-training and related greenhouse components.',
    imageUrl: '/products/materials/W_Hook.png',
    galleryImages: ['/products/materials/W_Hook.png'],
    features: ['Double notch W shape geometry', 'Secures trellising spools without slip', 'Rust-resistant wire finish'],
    specifications: { category: 'Green House Material', type: 'Trellising Accessory', application: 'Greenhouse Trellising' },
  },
  {
    id: 'mat-24',
    slug: 'roller-hook',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Roller Hook',
    shortDescription: 'A roller hook used within greenhouse trellising systems to assist with crop support and movement. Designed for practical greenhouse cultivation applications.',
    fullOverview: 'A roller hook used within greenhouse trellising systems to assist with crop support and movement. Designed for practical greenhouse cultivation applications.',
    imageUrl: '/products/materials/Roller_Hook.jpg',
    galleryImages: ['/products/materials/Roller_Hook.jpg'],
    features: ['Pre-wound twine spool roller', 'Allows easy crop leaning and lowering', 'Durable steel frame'],
    specifications: { category: 'Green House Material', type: 'Trellising Accessory', application: 'Greenhouse Trellising' },
  },
  {
    id: 'mat-25',
    slug: 'sliding-doors',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Sliding Doors',
    shortDescription: 'Sliding greenhouse doors designed to provide controlled access to protected cultivation structures. Their sliding configuration allows practical operation while conserving space.',
    fullOverview: 'Sliding greenhouse doors designed to provide controlled access to protected cultivation structures. Their sliding configuration allows practical operation while conserving space.',
    imageUrl: '/products/materials/Sliding_Doors.jpg',
    galleryImages: ['/products/materials/Sliding_Doors.jpg'],
    features: ['Smooth top-track sliding movement', 'Conserves internal floor space', 'Galvanized steel frame configuration'],
    specifications: { category: 'Green House Material', type: 'Greenhouse Door', application: 'Greenhouse / Protected Cultivation' },
  },
  {
    id: 'mat-26',
    slug: 'anti-flapping-bands',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Anti Flapping Bands',
    shortDescription: 'Bands designed to help control greenhouse covering movement and reduce flapping caused by wind. Useful for improving the stability of greenhouse film or covering material.',
    fullOverview: 'Bands designed to help control greenhouse covering movement and reduce flapping caused by wind. Useful for improving the stability of greenhouse film or covering material.',
    imageUrl: '/products/materials/Anti_Flapping_Bands.jpg',
    galleryImages: ['/products/materials/Anti_Flapping_Bands.jpg'],
    features: ['High-tenacity woven band strap', 'Controls film movement in strong winds', 'Extends polyfilm service life'],
    specifications: { category: 'Green House Material', type: 'Greenhouse Covering Accessory', application: 'Greenhouse Film / Structure' },
  },
  {
    id: 'mat-27',
    slug: 'clamps-full-and-half',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Clamps — Full & Half',
    shortDescription: 'Full and half clamps designed for connecting structural greenhouse pipes and components. Suitable for creating secure structural joints.',
    fullOverview: 'Full and half clamps designed for connecting structural greenhouse pipes and components. Suitable for creating secure structural joints.',
    imageUrl: '/products/materials/Clamps_Full_and_Half.jpg',
    galleryImages: ['/products/materials/Clamps_Full_and_Half.jpg'],
    features: ['Pressed steel clamps in Full & Half models', 'Connects structural pipes securely', 'Hot-dip galvanized coating'],
    specifications: { category: 'Green House Material', type: 'Structural Clamp', application: 'Structural Pipe Connections' },
  },
  {
    id: 'mat-28',
    slug: 'zig-zag-wire-springs',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Zig Zag Wire Springs',
    shortDescription: 'Zig-zag wire springs used for securing polyfilm or net covering material in greenhouse profiles. Designed for practical and removable covering installation.',
    fullOverview: 'Zig-zag wire springs used for securing polyfilm or net covering material in greenhouse profiles. Designed for practical and removable covering installation.',
    imageUrl: '/products/materials/Zig_Zag_Wire_Springs.jpg',
    galleryImages: ['/products/materials/Zig_Zag_Wire_Springs.jpg'],
    features: ['High-tensile spring steel wire', 'Wedges film securely into profile channels', 'Removable and reusable design'],
    specifications: { category: 'Green House Material', type: 'Covering Fixing Accessory', application: 'Polyfilm / Net Locking' },
  },
  {
    id: 'mat-29',
    slug: 'poly-coated-springs',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Poly Coated Springs',
    shortDescription: 'Poly-coated spring wire components used for securing greenhouse covering materials. The coating provides a practical protective finish for greenhouse applications.',
    fullOverview: 'Poly-coated spring wire components used for securing greenhouse covering materials. The coating provides a practical protective finish for greenhouse applications.',
    imageUrl: '/products/materials/Poly_Coated_Springs.jpg',
    galleryImages: ['/products/materials/Poly_Coated_Springs.jpg'],
    features: ['Smooth plastic protective coating', 'Prevents friction wear on plastic cladding', 'High spring elasticity'],
    specifications: { category: 'Green House Material', type: 'Covering Fixing Accessory', application: 'Polyfilm / Net Locking' },
  },
  {
    id: 'mat-30',
    slug: 'section-profile',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Section / Profile',
    shortDescription: 'Greenhouse profiles designed to receive and secure polyfilm or net covering materials. Used as part of the greenhouse cladding and fixing system.',
    fullOverview: 'Greenhouse profiles designed to receive and secure polyfilm or net covering materials. Used as part of the greenhouse cladding and fixing system.',
    imageUrl: '/products/materials/Section_Profile.jpg',
    galleryImages: ['/products/materials/Section_Profile.jpg'],
    features: ['C-channel spring locking geometry', 'Smooth hemmed edges protect poly film', 'Pre-punched fixing slot holes'],
    specifications: { category: 'Green House Material', type: 'Greenhouse Profile', application: 'Polyfilm / Net Locking' },
  },
  {
    id: 'mat-31',
    slug: 'profile-varieties',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Profile Varieties',
    shortDescription: 'A range of greenhouse profiles available in different profile forms and materials. Used for structural and covering installation requirements.',
    fullOverview: 'A range of greenhouse profiles available in different profile forms and materials. Used for structural and covering installation requirements.',
    imageUrl: '/products/materials/Profile_Varieties.jpg',
    galleryImages: ['/products/materials/Profile_Varieties.jpg'],
    features: ['Available in Aluminium, Galvalume & GP', 'Accurate spring channel dimensions', 'Corrosion-resistant metal options'],
    specifications: { category: 'Green House Material', type: 'Greenhouse Profile', materialsShown: 'Aluminium / Galvalume / GP', application: 'Greenhouse Structure' },
  },
  {
    id: 'mat-32',
    slug: 'gutter-arches-bracket-system',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Gutter / Arches Bracket System',
    shortDescription: 'Bracket system designed for greenhouse gutter and arch connections. Provides structural support for joining and positioning greenhouse members.',
    fullOverview: 'Bracket system designed for greenhouse gutter and arch connections. Provides structural support for joining and positioning greenhouse members.',
    imageUrl: '/products/materials/Gutter_Arches_Bracket_System_5mm_Single_Plate.jpg',
    galleryImages: ['/products/materials/Gutter_Arches_Bracket_System_5mm_Single_Plate.jpg'],
    features: ['5mm thick single plate construction', 'Connects roof arches to main gutter beams', 'Hot-dip galvanized finish'],
    specifications: { category: 'Green House Material', type: 'Structural Bracket', thicknessShown: '5 mm Single Plate', application: 'Greenhouse Gutter / Arch System' },
  },
  {
    id: 'mat-33',
    slug: 'industrial-pressed-gutter',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Industrial Pressed Gutter',
    shortDescription: 'Pressed metal gutters designed for greenhouse rainwater collection and drainage. The brochure specifies thickness options from 1.50 mm to 2.50 mm.',
    fullOverview: 'Pressed metal gutters designed for greenhouse rainwater collection and drainage. The brochure specifies thickness options from 1.50 mm to 2.50 mm.',
    imageUrl: '/products/materials/Industrial_Pressed_Gutter.jpg',
    galleryImages: ['/products/materials/Industrial_Pressed_Gutter.jpg'],
    features: ['High-capacity rainwater drainage channel', 'Available in 1.50mm to 2.50mm thickness', 'Roll-formed galvanized steel'],
    specifications: { category: 'Green House Material', type: 'Gutter', thicknessShown: '1.50 mm to 2.50 mm', application: 'Greenhouse Drainage' },
  },
  {
    id: 'mat-34',
    slug: 'gutter-end-cap',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Gutter End Cap',
    shortDescription: 'End cap component designed to close the end of a greenhouse gutter. Helps create a controlled and finished drainage system.',
    fullOverview: 'End cap component designed to close the end of a greenhouse gutter. Helps create a controlled and finished drainage system.',
    imageUrl: '/products/materials/Gutter_End_Cap.jpg',
    galleryImages: ['/products/materials/Gutter_End_Cap.jpg'],
    features: ['Formed end plate seals gutter run', 'Prevents water overflow at building ends', 'Pre-drilled for easy fastening'],
    specifications: { category: 'Green House Material', type: 'Gutter Accessory', application: 'Greenhouse Drainage' },
  },
  {
    id: 'mat-35',
    slug: 'gutter-spout-down-take',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Gutter Spout / Down Take',
    shortDescription: 'Gutter outlet component designed to direct collected rainwater from the greenhouse gutter into the drainage system.',
    fullOverview: 'Gutter outlet component designed to direct collected rainwater from the greenhouse gutter into the drainage system.',
    imageUrl: '/products/materials/Gutter_Spout_Down_Take.jpg',
    galleryImages: ['/products/materials/Gutter_Spout_Down_Take.jpg'],
    features: ['Rainwater discharge outlet collar', 'Connects gutter runs to down pipes', 'Hot-dip galvanized steel'],
    specifications: { category: 'Green House Material', type: 'Gutter Drainage Component', application: 'Greenhouse Rainwater Drainage' },
  },
  {
    id: 'mat-36',
    slug: 'hvac-exhaust-fans',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'HVAC / Exhaust Fans',
    shortDescription: 'Ventilation fans designed to assist air exchange and environmental control inside protected cultivation structures. Suitable for greenhouse ventilation applications.',
    fullOverview: 'Ventilation fans designed to assist air exchange and environmental control inside protected cultivation structures. Suitable for greenhouse ventilation applications.',
    imageUrl: '/products/materials/HVAC_Exhaust_Fans.jpg',
    galleryImages: ['/products/materials/HVAC_Exhaust_Fans.jpg'],
    features: ['Available in Push Pull and Hammer Drop types', 'High volumetric air turnover rate', 'Durable stainless steel blades'],
    specifications: { category: 'Green House Material', type: 'Ventilation Fan', typesShown: 'Push Pull / Hammer Drop', application: 'Greenhouse Ventilation' },
  },
  {
    id: 'mat-37',
    slug: 'cellulose-evaporative-cooling-pads',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Cellulose Evaporative Cooling Pads',
    shortDescription: 'Cellulose evaporative cooling pads used in greenhouse cooling systems. They support evaporative cooling by providing a large wet surface for air movement.',
    fullOverview: 'Cellulose evaporative cooling pads used in greenhouse cooling systems. They support evaporative cooling by providing a large wet surface for air movement.',
    imageUrl: '/products/materials/Cellulose_Evaporative_Cooling_Pads.jpg',
    galleryImages: ['/products/materials/Cellulose_Evaporative_Cooling_Pads.jpg'],
    features: ['High-efficiency cross-fluted cellulose paper', 'Large wetted surface area for air cooling', 'Anti-rot and anti-fungal treatment'],
    specifications: { category: 'Green House Material', type: 'Cooling Component', application: 'Evaporative Cooling' },
  },
  {
    id: 'mat-38',
    slug: 'evaporative-cooling-pad-frames',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Evaporative Cooling Pad Frames',
    shortDescription: 'Frames designed to hold evaporative cooling pads in greenhouse cooling systems. Provide structural support and organized installation of cooling media.',
    fullOverview: 'Frames designed to hold evaporative cooling pads in greenhouse cooling systems. Provide structural support and organized installation of cooling media.',
    imageUrl: '/products/materials/Evaporative_Cooling_Pad_Frames.jpg',
    galleryImages: ['/products/materials/Evaporative_Cooling_Pad_Frames.jpg'],
    features: ['Aluminum / Stainless steel header frame', 'Includes top water distributor and bottom trough', 'Secure housing for cooling pads'],
    specifications: { category: 'Green House Material', type: 'Cooling System Component', application: 'Evaporative Cooling' },
  },
  {
    id: 'mat-39',
    slug: 'air-circulation-fans',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Air Circulation Fans',
    shortDescription: 'Fans designed to circulate air within greenhouse structures. Helps improve internal air movement and support more uniform growing conditions.',
    fullOverview: 'Fans designed to circulate air within greenhouse structures. Helps improve internal air movement and support more uniform growing conditions.',
    imageUrl: '/products/materials/Air_Circulation_Fans.jpg',
    galleryImages: ['/products/materials/Air_Circulation_Fans.jpg'],
    features: ['Continuous overhead air circulation', 'Eliminates humidity and thermal pockets', 'Quiet energy-efficient motor'],
    specifications: { category: 'Green House Material', type: 'Air Circulation Fan', application: 'Greenhouse Climate Management' },
  },
  {
    id: 'mat-40',
    slug: 'gutter-sealant-tape',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Gutter Sealant Tape',
    shortDescription: 'Sealant tape used for greenhouse gutter-related sealing applications. Helps reduce leakage at joints and connection areas.',
    fullOverview: 'Sealant tape used for greenhouse gutter-related sealing applications. Helps reduce leakage at joints and connection areas.',
    imageUrl: '/products/materials/Gutter_Sealant_Tape.jpg',
    galleryImages: ['/products/materials/Gutter_Sealant_Tape.jpg'],
    features: ['High-tack waterproof butyl tape', 'Provides leak-proof joint seal', 'Durable across weather extremes'],
    specifications: { category: 'Green House Material', type: 'Sealing Accessory', application: 'Greenhouse Gutter System' },
  },
  {
    id: 'mat-41',
    slug: 'side-screen-roof-screen-roll-up-motor',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Side Screen / Roof Screen Roll Up Motor',
    shortDescription: 'Motorized roll-up mechanism designed to operate greenhouse side or roof screens. Enables controlled opening and closing of screen systems.',
    fullOverview: 'Motorized roll-up mechanism designed to operate greenhouse side or roof screens. Enables controlled opening and closing of screen systems.',
    imageUrl: '/products/materials/Side_Screen_Roof_Screen_Roll_Up_Motor.jpg',
    galleryImages: ['/products/materials/Side_Screen_Roof_Screen_Roll_Up_Motor.jpg'],
    features: ['Motorized electric drive winch', 'Internal limit switch control', 'Weatherproof sealed motor housing'],
    specifications: { category: 'Green House Material', type: 'Screen Drive Motor', application: 'Side Screen / Roof Screen' },
  },
  {
    id: 'mat-42',
    slug: 'curtain-roll-up-gear-handle',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Curtain Roll Up Gear Handle',
    shortDescription: 'Manual gear handle used for operating greenhouse curtain roll-up mechanisms. Provides controlled manual adjustment of greenhouse curtains/screens.',
    fullOverview: 'Manual gear handle used for operating greenhouse curtain roll-up mechanisms. Provides controlled manual adjustment of greenhouse curtains/screens.',
    imageUrl: '/products/materials/Curtain_Roll_Up_Gear_Handle.jpg',
    galleryImages: ['/products/materials/Curtain_Roll_Up_Gear_Handle.jpg'],
    features: ['Manual winch with internal gear reduction', 'Self-locking safety mechanism', 'Comfortable operating hand crank'],
    specifications: { category: 'Green House Material', type: 'Curtain Operating Accessory', application: 'Greenhouse Curtain System' },
  },
  {
    id: 'mat-43',
    slug: 'curtain-rollup-unit-chain-pulley',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Curtain Rollup Unit — Chain Pulley',
    shortDescription: 'Chain pulley roll-up unit designed for operating greenhouse curtains or screens. Provides a practical mechanical system for opening and closing curtain sections.',
    fullOverview: 'Chain pulley roll-up unit designed for operating greenhouse curtains or screens. Provides a practical mechanical system for opening and closing curtain sections.',
    imageUrl: '/products/materials/Curtain_Rollup_Unit_Chain_Pulley.jpg',
    galleryImages: ['/products/materials/Curtain_Rollup_Unit_Chain_Pulley.jpg'],
    features: ['Chain pulley drive mechanism', 'Smooth manual roll-up control', 'Heavy steel casing'],
    specifications: { category: 'Green House Material', type: 'Curtain Roll-Up System', application: 'Greenhouse Curtain / Screen' },
  },
  {
    id: 'mat-44',
    slug: 'universal-joint',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Universal Joint',
    shortDescription: 'Universal joint used for connecting greenhouse structural members or mechanical components. The brochure identifies HD Galvanised and solid-bar union construction.',
    fullOverview: 'Universal joint used for connecting greenhouse structural members or mechanical components. The brochure identifies HD Galvanised and solid-bar union construction.',
    imageUrl: '/products/materials/Universal_Joint_HD_Gal_Solid_Bar_Union.jpg',
    galleryImages: ['/products/materials/Universal_Joint_HD_Gal_Solid_Bar_Union.jpg'],
    features: ['HD Galvanised solid bar union construction', 'Swivel angle torque transmission', 'Heavy-duty structural joint'],
    specifications: { category: 'Green House Material', type: 'Structural Joint', materialFinishShown: 'HD Galvanised / Solid Bar Union', application: 'Greenhouse Structure' },
  },
  {
    id: 'mat-45',
    slug: 'foundation-and-extension-joint',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Foundation and Extension Joint',
    shortDescription: 'Joint component used for foundation connections and structural extensions. Designed to support practical assembly and extension of greenhouse framework.',
    fullOverview: 'Joint component used for foundation connections and structural extensions. Designed to support practical assembly and extension of greenhouse framework.',
    imageUrl: '/products/materials/Foundation_and_Extension_Joint.jpg',
    galleryImages: ['/products/materials/Foundation_and_Extension_Joint.jpg'],
    features: ['Sleeve joint for column extensions', 'Hot-dip galvanized steel pipe', 'Provides secure framework alignment'],
    specifications: { category: 'Green House Material', type: 'Structural Joint', application: 'Greenhouse Foundation / Structure' },
  },
  {
    id: 'mat-46',
    slug: 'i-bolt',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'I-Bolt',
    shortDescription: 'I-bolts used as fastening and connection hardware within greenhouse structural systems. Suitable for securing structural components and accessories.',
    fullOverview: 'I-bolts used as fastening and connection hardware within greenhouse structural systems. Suitable for securing structural components and accessories.',
    imageUrl: '/products/materials/I_Bolt.jpg',
    galleryImages: ['/products/materials/I_Bolt.jpg'],
    features: ['Forged steel eye bolt loop', 'Galvanized thread protection', 'Secures cables and guy wires'],
    specifications: { category: 'Green House Material', type: 'Structural Fastener', application: 'Greenhouse Structure' },
  },
  {
    id: 'mat-47',
    slug: 'curtain-clamp-steel',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Curtain Clamp — Steel',
    shortDescription: 'Steel curtain clamps used to secure greenhouse curtain/screen materials to their supporting structure. Designed for reliable curtain fixing.',
    fullOverview: 'Steel curtain clamps used to secure greenhouse curtain/screen materials to their supporting structure. Designed for reliable curtain fixing.',
    imageUrl: '/products/materials/Curtain_Clamp_Steel.jpg',
    galleryImages: ['/products/materials/Curtain_Clamp_Steel.jpg'],
    features: ['Pressed steel clamp construction', 'Firm non-slip grip on curtain pipes', 'Galvanized finish'],
    specifications: { category: 'Green House Material', type: 'Curtain Clamp', material: 'Steel', application: 'Greenhouse Curtain System' },
  },
  {
    id: 'mat-48',
    slug: 'curtain-clamp-uvs-plastic',
    category: 'greenhouse-material',
    categoryLabel: 'Green House Material',
    name: 'Curtain Clamp — UVS Plastic',
    shortDescription: 'UV-resistant plastic curtain clamps designed for securing greenhouse curtains or screen materials. Suitable for outdoor protected-cultivation applications.',
    fullOverview: 'UV-resistant plastic curtain clamps designed for securing greenhouse curtains or screen materials. Suitable for outdoor protected-cultivation applications.',
    imageUrl: '/products/materials/Curtain_Clamp_UVS_Plastic.jpg',
    galleryImages: ['/products/materials/Curtain_Clamp_UVS_Plastic.jpg'],
    features: ['UV-stabilized engineering polymer', 'Snap-fit attachment to curtain pipes', 'Prevents film tearing'],
    specifications: { category: 'Green House Material', type: 'Curtain Clamp', material: 'UVS Plastic', application: 'Greenhouse Curtain System' },
  },
];

interface ProductsShowcaseProps {
  onOpenQuote: (productName?: string) => void;
  selectedSlug?: string | null;
  onClearSlug?: () => void;
}

export const ProductsShowcase: React.FC<ProductsShowcaseProps> = ({
  onOpenQuote,
  selectedSlug,
  onClearSlug,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'turnkey-project' | 'greenhouse-material'>('turnkey-project');
  const [activeProductSlug, setActiveProductSlug] = useState<string | null>(selectedSlug || null);

  const turnkeyCount = PRODUCT_CATALOGUE.filter((p) => p.category === 'turnkey-project').length;
  const materialCount = PRODUCT_CATALOGUE.filter((p) => p.category === 'greenhouse-material').length;

  React.useEffect(() => {
    setActiveProductSlug(selectedSlug || null);
  }, [selectedSlug]);

  // If activeProductSlug is set, render ProductDetailView
  const currentProduct = PRODUCT_CATALOGUE.find(
    (p) => p.slug === activeProductSlug || p.id === activeProductSlug
  );

  if (currentProduct) {
    return (
      <ProductDetailView
        product={currentProduct}
        onBack={() => {
          setActiveProductSlug(null);
          if (onClearSlug) onClearSlug();
        }}
        onOpenConsultationModal={onOpenQuote}
        onSelectProduct={(slug) => setActiveProductSlug(slug)}
      />
    );
  }

  // Filter products by selected main category
  const displayedProducts = selectedCategory === 'all'
    ? PRODUCT_CATALOGUE
    : PRODUCT_CATALOGUE.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-white text-[#10232B] font-sans min-h-screen py-12 md:py-16">
      <div className="max-w-[1280px] w-[94%] mx-auto space-y-12 md:space-y-16">
        
        {/* ================= 1. PRODUCTS PAGE HERO ================= */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#006B8F]/20 bg-[#F8FAF8] shadow-2xs">
            <Sprout className="w-4 h-4 text-[#006B8F]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#006B8F]">
              INFRASTRUCTURE CATALOGUE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#10232B] uppercase">
            OUR PRODUCTS
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed font-normal">
            Explore our greenhouse structures and materials for protected cultivation.
          </p>
        </div>

        {/* ================= 2. SUB-PRODUCTS CATALOGUE GRID ================= */}
        <div className="space-y-8" id="catalogue-grid">
          {/* Category Selector Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 bg-gray-50 p-2.5 sm:p-3.5 rounded-xl border border-gray-200/60">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('turnkey-project')}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all uppercase cursor-pointer ${
                  selectedCategory === 'turnkey-project'
                    ? 'bg-[#006B8F] text-white shadow-2xs'
                    : 'bg-white text-gray-700 hover:text-[#10232B] hover:bg-gray-100 border border-gray-200/60'
                }`}
              >
                Turnkey Projects ({turnkeyCount})
              </button>

              <button
                onClick={() => setSelectedCategory('greenhouse-material')}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all uppercase cursor-pointer ${
                  selectedCategory === 'greenhouse-material'
                    ? 'bg-[#006B8F] text-white shadow-2xs'
                    : 'bg-white text-gray-700 hover:text-[#10232B] hover:bg-gray-100 border border-gray-200/60'
                }`}
              >
                Materials ({materialCount})
              </button>

              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all uppercase cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#006B8F] text-white shadow-2xs'
                    : 'bg-white text-gray-700 hover:text-[#10232B] hover:bg-gray-100 border border-gray-200/60'
                }`}
              >
                All ({PRODUCT_CATALOGUE.length})
              </button>
            </div>

            <span className="text-xs sm:text-sm text-gray-500 font-mono font-medium px-1">
              Showing {displayedProducts.length} Product{displayedProducts.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Sub-Products Catalogue Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => setActiveProductSlug(prod.slug)}
                className="group cursor-pointer rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Large Real Product Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 border-b border-gray-100">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded text-xs font-mono font-bold text-[#006B8F] border border-gray-200/60">
                    {prod.categoryLabel}
                  </div>
                </div>

                {/* Card Title & Description */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="text-[20px] lg:text-[21px] font-bold text-[#006B8F] group-hover:text-[#004F6A] transition-colors leading-snug">
                      {prod.name}
                    </h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed line-clamp-3 font-normal">
                      {prod.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#006B8F] group-hover:text-[#004F6A] transition-colors uppercase tracking-wider">
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductsShowcase;
