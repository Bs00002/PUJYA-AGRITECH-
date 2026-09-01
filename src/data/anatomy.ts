import { ComponentAnatomy } from '../types';

export const ANATOMY_COMPONENTS: ComponentAnatomy[] = [
  {
    id: 'gi_steel',
    name: 'Hot-Dip Galvanized (GI) Steel Framing',
    category: 'Structure',
    shortDesc: 'IS-1239 Grade heavy zinc coated tubular steel skeleton engineered for 120 km/h wind loads.',
    fullDesc: 'The backbone of Pujya Agritech polyhouses. Constructed using heavy-duty circular and rectangular GI tubes with a minimum 275 g/m² hot-dip zinc coating to prevent rust and corrosion in high-humidity greenhouse environments.',
    specs: {
      'Steel Standards': 'IS 1239 / IS 1161 YST 210/240',
      'Zinc Coating': '275 g/m² Hot-Dip Galvanized',
      'Main Columns': '76mm OD x 2.9mm Thickness',
      'Arch Pipes': '60mm / 48mm OD x 2.0mm Thickness',
      'Design Life': 'Galvanized Steel Framework'
    },
    iconName: 'ShieldCheck',
    imageFallbackUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'uv_polyfilm',
    name: '200 Micron 5-Layer UV Stabilized Polyfilm',
    category: 'Cladding',
    shortDesc: 'Multi-layer diffuse film with anti-drip, anti-fog, and thermal IR blocking additives.',
    fullDesc: 'Imported high-grade polyethylene cladding engineered to maximize PAR (Photosynthetically Active Radiation) while scattering direct sunlight to eliminate harsh shadow spots and leaf burns inside the greenhouse.',
    specs: {
      'Thickness': '200 Micron (800 Gauge)',
      'Light Transmission': '88% PAR Spectrum',
      'Diffusion Ratio': '60-65% Soft Light Scattering',
      'Additives': 'UV Inhibitors, Anti-Drip, Anti-Dust, Anti-Sulfur',
      'Warranty': '3 Years Pro-rated UV Warranty'
    },
    iconName: 'Sun',
    imageFallbackUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fan_pad',
    name: 'Evaporative Cooling Pad & Axial Exhaust Fan System',
    category: 'Climate Control',
    shortDesc: 'Cross-fluted cellulose cooling pads paired with 52" stainless steel exhaust fans.',
    fullDesc: 'Designed for region-specific temperature reduction. Water recirculates through 100mm cross-fluted cellulose pads on one end, while high-capacity belt-driven exhaust fans draw ambient air through, dropping temperature by 8°C to 12°C.',
    specs: {
      'Pad Material': 'Cellulose Paper with Anti-Rot Resins',
      'Pad Thickness': '100mm / 150mm Cross-Fluted',
      'Fan Specs': '52 Inch Blade, 1.1 kW 3-Phase Motor',
      'Air Flow Rate': '44,000 m³/hour per fan',
      'Shutters': 'Galvanized Auto-Gravity Shutters'
    },
    iconName: 'Fan',
    imageFallbackUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'farm_pond',
    name: 'HDPE Geo-Membrane Lined Farm Pond / Rainwater Reservoir',
    category: 'Water & Irrigation',
    shortDesc: '500-micron UV stabilized geo-membrane lined water storage pond for round-the-year farming.',
    fullDesc: 'Pujya Agritech integrates custom rainwater harvest reservoirs directly adjacent to polyhouses. Collects roof runoff through underground PVC manifold piping into a zero-seepage HDPE lined pond.',
    specs: {
      'Liner Material': 'HDPE 500 Micron (100% Virgin Polymer)',
      'Seaming Tech': 'Double Wedge Hot-Air Welded Joints',
      'Storage Capacity': '500 KL to 5,000 KL (Customized)',
      'Life Expectancy': '15+ Years UV Exposed',
      'Water Saving': '100% Rain Harvesting Efficiency'
    },
    iconName: 'Droplets',
    imageFallbackUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'insect_net',
    name: '50-Mesh High-Density Anti-Insect Netting',
    category: 'Cladding',
    shortDesc: 'Micro-aperture monofilament netting preventing thrips, whiteflies, and aphids entry.',
    fullDesc: 'Fitted on continuous ridge vents and perimeter roll-up skirts. Allows max passive airflow while physically blocking vector pests, eliminating up to 80% chemical pesticide requirements.',
    specs: {
      'Mesh Size': '50 Mesh (30 x 10 holes/cm²)',
      'Yarn Type': 'HDPE Monofilament UV Stabilized',
      'Pest Blockade': 'Whiteflies, Thrips, Leaf Miners, Aphids',
      'Air Permeability': '45% Free Ventilation Area'
    },
    iconName: 'ShieldAlert',
    imageFallbackUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'thermal_screen',
    name: 'Motorized Aluminized Retractable Thermal Screen',
    category: 'Climate Control',
    shortDesc: 'Dual-action energy saving shade screen reflecting excess solar heat and retaining night warmth.',
    fullDesc: 'Suspended beneath the roof arches, driven by rack-and-pinion torque shafts. Reflects infrared heat rays during intense summer middays and retains internal greenhouse warmth during cold winter nights.',
    specs: {
      'Shading Factor': '50% / 70% Aluminized Mesh',
      'Energy Saving': '25-35% Thermal Retention',
      'Drive Mechanism': 'Gearbox Motor with Pinion Shafts',
      'Control Mode': 'Automatic Lux Sensor / Timer Controlled'
    },
    iconName: 'Sliders',
    imageFallbackUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=800&q=80'
  }
];
