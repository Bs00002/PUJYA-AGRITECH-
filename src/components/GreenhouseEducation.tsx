import React from 'react';
import { motion } from 'motion/react';
import { 
  Thermometer, 
  Droplets, 
  Sun, 
  Wind, 
  Waves, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  Sparkles,
  Sprout
} from 'lucide-react';

export const GREENHOUSE_CONTROLS = [
  {
    icon: Thermometer,
    name: 'Temperature Control',
    detail: 'Prevents extreme heat & frost damage through automated ridge vents, thermal shading & cooling pads.',
    badge: 'Thermal Balance'
  },
  {
    icon: Droplets,
    name: 'Humidity Control',
    detail: 'Maintains optimal Vapor Pressure Deficit (VPD) using high-pressure foggers and evaporative cooling.',
    badge: 'Moisture Stability'
  },
  {
    icon: Sun,
    name: 'Light Intensity Control',
    detail: 'Filters harsh solar radiation with UV-stabilized poly film and light-diffusing shade networks.',
    badge: 'Photosynthesis'
  },
  {
    icon: Wind,
    name: 'Air Ventilation',
    detail: 'Ensures continuous air exchange to regulate interior CO2 levels and reduce foliar disease pressure.',
    badge: 'Airflow Dynamics'
  },
  {
    icon: Waves,
    name: 'Precision Irrigation',
    detail: 'Delivers water and essential soluble nutrients directly to the plant root zone via drip emitters.',
    badge: 'Root Zone Health'
  }
];

export const KEY_BENEFITS = [
  'Year-round crop production independent of seasonal weather conditions',
  'Higher crop yield and superior, uniform produce quality',
  'Protection from heavy rain, wind velocity, hail storms and temperature extremes',
  'Drastically reduced pest infestation and fungal disease incidence',
  'Highly efficient, targeted use of irrigation water and soluble fertilizers',
  'Precise control over crop maturity timing and harvest scheduling',
  'Increased commercial profitability and higher return on investment (ROI)',
  'Ideal environment for high-value vegetables, flowers, herbs and seedling nurseries'
];

export const GreenhouseEducation: React.FC = () => {
  return (
    <section id="greenhouse" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Greenhouse - The Future of Agriculture Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
              <Sprout className="w-3.5 h-3.5 text-emerald-600" />
              <span>Scientific Agriculture</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">Greenhouse Infrastructure</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                The Future of Sustainable Agriculture
              </h2>
            </div>

            <p className="text-slate-600 text-base leading-relaxed font-normal">
              A greenhouse is a scientifically engineered protected cultivation structure designed to create an ideal environment for plant growth. By shielding crops from unpredictable weather extremes, growers achieve predictable yields and premium quality.
            </p>

            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <h4 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Microclimate Management</span>
              </h4>
              <p className="text-xs text-emerald-950 leading-relaxed">
                In open field farming, environmental variables are uncontrolled. In a Pujya protected greenhouse, five crucial growth parameters are continuously regulated to maximize plant metabolic efficiency.
              </p>
            </div>
          </div>

          {/* Controlled Parameters Grid */}
          <div className="lg:col-span-6">
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4 shadow-xs">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Precision Environmental Variables Controlled:
              </h3>

              <div className="space-y-3">
                {GREENHOUSE_CONTROLS.map((ctrl, idx) => {
                  const Icon = ctrl.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3.5 hover:border-emerald-300 transition-colors"
                    >
                      <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 flex-shrink-0 mt-0.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-sm">{ctrl.name}</span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                            {ctrl.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{ctrl.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Key Benefits Grid */}
        <div className="space-y-8 pt-8 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Proven Advantages</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Key Benefits of Protected Cultivation
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Verified benefits observed across protected farming projects in India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {KEY_BENEFITS.map((benefit, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                  {benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
