import React, { useState, useMemo } from 'react';
import { QuoteFormData, CostBreakdown } from '../types';
import { Calculator, ShieldCheck, IndianRupee, Droplets, TrendingUp, Download, CheckCircle2, Send, HelpCircle, ArrowRight } from 'lucide-react';

interface CostCalculatorProps {
  initialAreaSqm?: number;
  initialStructureType?: 'nvph' | 'fan_pad' | 'shade_net' | 'hydroponic';
  onSubmitQuoteSuccess: (message: string) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({
  initialAreaSqm = 2000,
  initialStructureType = 'nvph',
  onSubmitQuoteSuccess
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    phone: '',
    email: '',
    state: 'Gujarat',
    city: '',
    landArea: initialAreaSqm,
    unit: 'sqm',
    structureType: initialStructureType,
    includeFarmPond: true,
    pondCapacityKL: 1000,
    includeAutomation: true,
    cropIntended: 'Colored Capsicum (Red & Yellow)',
    additionalNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  // Calculate Costs & Subsidy Breakdown in Real-time
  const calculation: CostBreakdown = useMemo(() => {
    let sqmArea = formData.landArea;
    if (formData.unit === 'acre') {
      sqmArea = Math.round(formData.landArea * 4046.86);
    } else if (formData.unit === 'sqft') {
      sqmArea = Math.round(formData.landArea / 10.7639);
    }

    if (sqmArea < 500) sqmArea = 500;

    // Base rates per sq.meter based on structure type
    let baseRatePerSqm = 980; // NVPH default
    if (formData.structureType === 'fan_pad') baseRatePerSqm = 1550;
    if (formData.structureType === 'shade_net') baseRatePerSqm = 520;
    if (formData.structureType === 'hydroponic') baseRatePerSqm = 1350;

    // Economy of scale discount for larger areas (>4000 sqm)
    if (sqmArea >= 4000) baseRatePerSqm *= 0.92;

    const structureCost = Math.round(sqmArea * baseRatePerSqm);

    // Farm Pond cost calculation based on capacity (HDPE 500 micron lined)
    let farmPondCost = 0;
    if (formData.includeFarmPond) {
      if (formData.pondCapacityKL <= 500) farmPondCost = 250000;
      else if (formData.pondCapacityKL <= 1000) farmPondCost = 420000;
      else if (formData.pondCapacityKL <= 2000) farmPondCost = 750000;
      else farmPondCost = 1400000;
    }

    // Drip & Automation Cost
    const dripSystemCost = Math.round(sqmArea * 85);
    const automationCost = formData.includeAutomation ? Math.round(sqmArea * 110 + 120000) : 0;

    const totalProjectCost = structureCost + farmPondCost + dripSystemCost + automationCost;

    // Subsidy: NHB (National Horticulture Board) / MIDH provides up to 50% subsidy
    // Max subsidy capping per guidelines (e.g. 50% of cost capped at NHB norm ceiling)
    const subsidyPercentage = 50;
    const estimatedSubsidy = Math.round(totalProjectCost * 0.50);
    const netCostToFarmer = totalProjectCost - estimatedSubsidy;

    // Agronomy & Yield Projections based on crop
    let yieldPerSqmKg = 12; // Capsicum avg 12-15 kg/sqm
    let pricePerKgINR = 65; // Capsicum avg wholesale

    if (formData.cropIntended.includes('Cucumber')) {
      yieldPerSqmKg = 25;
      pricePerKgINR = 30;
    } else if (formData.cropIntended.includes('Tomato')) {
      yieldPerSqmKg = 20;
      pricePerKgINR = 35;
    } else if (formData.cropIntended.includes('Flowers')) {
      yieldPerSqmKg = 18;
      pricePerKgINR = 55;
    } else if (formData.cropIntended.includes('Greens')) {
      yieldPerSqmKg = 15;
      pricePerKgINR = 80;
    }

    const expectedAnnualYieldKg = Math.round(sqmArea * yieldPerSqmKg);
    const expectedAnnualRevenueINR = Math.round(expectedAnnualYieldKg * pricePerKgINR);

    // Operating expenses ~35% of revenue (seeds, fertilizers, labor, electricity)
    const annualNetIncomeINR = expectedAnnualRevenueINR * 0.65;
    const paybackPeriodYears = Math.max(1.2, Number((netCostToFarmer / Math.max(annualNetIncomeINR, 1)).toFixed(1)));

    return {
      totalAreaSqm: sqmArea,
      structureCost,
      farmPondCost,
      automationCost,
      dripSystemCost,
      totalProjectCost,
      subsidyPercentage,
      estimatedSubsidy,
      netCostToFarmer,
      expectedAnnualYieldKg,
      expectedAnnualRevenueINR,
      paybackPeriodYears
    };
  }, [formData]);

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your Name and Phone Number.');
      return;
    }

    setIsSubmitting(true);
    setSubmittedMessage(null);

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          location: `${formData.city ? formData.city + ', ' : ''}${formData.state}`,
          structureType: formData.structureType.toUpperCase(),
          areaSqM: calculation.totalAreaSqm,
          estimatedCostINR: calculation.totalProjectCost,
          estimatedSubsidyINR: calculation.estimatedSubsidy,
          cropInterest: formData.cropIntended,
          notes: `Farm Pond: ${formData.includeFarmPond ? formData.pondCapacityKL + ' KL' : 'No'}. Automation: ${formData.includeAutomation ? 'Yes' : 'No'}. Notes: ${formData.additionalNotes}`
        })
      });

      const data = await response.json();
      if (data.success) {
        setSubmittedMessage(`Thank you ${formData.name}! Your quote request (ID: ${data.quote.id}) and Detailed DPR Calculation have been submitted. A Pujya Agritech project manager will contact you within 24 hours.`);
        onSubmitQuoteSuccess(data.quote.id);
      } else {
        alert(data.error || 'Failed to submit quote request.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to Pujya Agritech servers. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="calculator-section" className="py-12 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Financial Estimator</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Commercial Greenhouse Investment & Subsidy Estimator
          </h2>
          <p className="text-slate-600 text-sm">
            Calculate estimated capital investment, indicative government subsidy assistance under applicable horticulture scheme guidelines, projected yields, and payback estimations for your project land.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Inputs Column */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center justify-between">
              <span>1. Project Parameters & Land Dimensions</span>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-100 px-2.5 py-0.5 rounded">
                NHB Norms 2024-25
              </span>
            </h3>

            {/* Land Area Slider & Inputs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Proposed Land Area:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="500"
                    max="50000"
                    value={formData.landArea}
                    onChange={(e) => setFormData({ ...formData, landArea: Number(e.target.value) || 500 })}
                    className="w-28 px-3 py-1.5 text-right font-black text-slate-900 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value as any })}
                    className="px-2.5 py-1.5 text-xs font-bold text-slate-700 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="sqm">Sq. Meters</option>
                    <option value="acre">Acres</option>
                    <option value="sqft">Sq. Feet</option>
                  </select>
                </div>
              </div>

              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={formData.unit === 'sqm' ? formData.landArea : calculation.totalAreaSqm}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    unit: 'sqm',
                    landArea: Number(e.target.value)
                  });
                }}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />

              <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                <span>500 Sq.M (~0.12 Acre)</span>
                <span>4,000 Sq.M (1 Acre)</span>
                <span>10,000 Sq.M (2.5 Acres)</span>
              </div>
            </div>

            {/* Structure Type Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Select Polyhouse Technology:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                <div
                  onClick={() => setFormData({ ...formData, structureType: 'nvph' })}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.structureType === 'nvph'
                      ? 'bg-emerald-50/80 border-emerald-600 ring-1 ring-emerald-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Naturally Ventilated Polyhouse</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Popular</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Dual ridge vent, 200m UV film, 50-mesh insect net. Rate: ~₹980/sqm</p>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, structureType: 'fan_pad' })}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.structureType === 'fan_pad'
                      ? 'bg-emerald-50/80 border-emerald-600 ring-1 ring-emerald-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Climate Controlled Fan & Pad</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Hi-Tech</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Cellulose evaporative pads + 52" axial exhaust fans. Rate: ~₹1,550/sqm</p>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, structureType: 'shade_net' })}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.structureType === 'shade_net'
                      ? 'bg-emerald-50/80 border-emerald-600 ring-1 ring-emerald-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="font-bold text-xs text-slate-900">Shade Net House (50% Mesh)</span>
                  <p className="text-[11px] text-slate-500 mt-1">Flat/domed roof for nursery & foliage plants. Rate: ~₹520/sqm</p>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, structureType: 'hydroponic' })}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.structureType === 'hydroponic'
                      ? 'bg-emerald-50/80 border-emerald-600 ring-1 ring-emerald-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="font-bold text-xs text-slate-900">Hydroponic Poly Tunnel</span>
                  <p className="text-[11px] text-slate-500 mt-1">NFT/Cocopeat substrate troughs with NFT dosing. Rate: ~₹1,350/sqm</p>
                </div>

              </div>
            </div>

            {/* Farm Pond & Automation Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              {/* HDPE Farm Pond */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-cyan-600" />
                    HDPE Lined Farm Pond
                  </span>
                  <input
                    type="checkbox"
                    checked={formData.includeFarmPond}
                    onChange={(e) => setFormData({ ...formData, includeFarmPond: e.target.checked })}
                    className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                  />
                </div>
                {formData.includeFarmPond && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600">Pond Storage Capacity:</label>
                    <select
                      value={formData.pondCapacityKL}
                      onChange={(e) => setFormData({ ...formData, pondCapacityKL: Number(e.target.value) })}
                      className="w-full text-xs font-bold text-slate-800 p-2 border border-slate-300 rounded-lg bg-slate-50"
                    >
                      <option value={500}>500 KL (5 Lakh Litres)</option>
                      <option value={1000}>1,000 KL (10 Lakh Litres)</option>
                      <option value={2000}>2,000 KL (20 Lakh Litres)</option>
                      <option value={5000}>5,000 KL (50 Lakh Litres)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Drip Automation */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    Auto Fertigation Skid
                  </span>
                  <input
                    type="checkbox"
                    checked={formData.includeAutomation}
                    onChange={(e) => setFormData({ ...formData, includeAutomation: e.target.checked })}
                    className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Venturi fertilizer injectors, sand/disc filters, and automated EC/pH dosing controller.
                </p>
              </div>

            </div>

            {/* Target Crop Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Planned Cultivation Crop:
              </label>
              <select
                value={formData.cropIntended}
                onChange={(e) => setFormData({ ...formData, cropIntended: e.target.value })}
                className="w-full text-xs font-bold text-slate-800 p-3 border border-slate-300 rounded-xl bg-white"
              >
                <option value="Colored Capsicum (Red & Yellow)">Colored Capsicum (Red & Yellow Bell Peppers)</option>
                <option value="Dutch Seedless Cucumber">Dutch Seedless Cucumber</option>
                <option value="Indeterminate Cherry Tomato">Indeterminate Cherry Tomato</option>
                <option value="Cut Flowers (Gerbera & Rose)">Cut Flowers (Gerbera, Rose & Carnation)</option>
                <option value="Exotic Hydroponic Greens">Exotic Salad Greens (Lettuce, Rocket, Basil)</option>
              </select>
            </div>

            {/* Contact Form Section */}
            <form onSubmit={handleSubmitQuote} className="pt-4 border-t border-slate-200 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                2. Request Official Bank DPR & Free Site Survey
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600">State / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Gujarat, Maharashtra, Karnataka"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="farmer@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs text-white bg-slate-900 hover:bg-emerald-800 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Generating Official DPR Quote...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-emerald-400" />
                    <span>Submit Request for Site Inspection & Subsidy Approval</span>
                  </>
                )}
              </button>

              {submittedMessage && (
                <div className="p-4 bg-emerald-100 text-emerald-900 rounded-xl border border-emerald-300 text-xs font-semibold flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span>{submittedMessage}</span>
                </div>
              )}
            </form>

          </div>

          {/* Right Calculations Results Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 sticky top-28">
            <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Calculated Estimate</p>
                <h3 className="text-xl font-black text-white">Financial Breakdown</h3>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                {calculation.totalAreaSqm.toLocaleString()} Sq.M (~{(calculation.totalAreaSqm / 4046.86).toFixed(2)} Acre)
              </span>
            </div>

            {/* Price Table */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Structure Fabrication & Polyfilm:</span>
                <span className="font-bold text-white">₹{calculation.structureCost.toLocaleString('en-IN')}</span>
              </div>

              {calculation.farmPondCost > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>HDPE Lined Farm Pond ({formData.pondCapacityKL} KL):</span>
                  <span className="font-bold text-cyan-300">₹{calculation.farmPondCost.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-300">
                <span>Micro-Drip & Fertigation System:</span>
                <span className="font-bold text-white">₹{calculation.dripSystemCost.toLocaleString('en-IN')}</span>
              </div>

              {calculation.automationCost > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>Automated EC/pH Dosing Unit:</span>
                  <span className="font-bold text-white">₹{calculation.automationCost.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-bold">
                <span className="text-slate-200">Total Project Turnkey Cost:</span>
                <span className="text-white">₹{calculation.totalProjectCost.toLocaleString('en-IN')}</span>
              </div>

              {/* Subsidy Highlight */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-300 uppercase flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    Indicative Govt Subsidy Assistance:
                  </span>
                  <span className="text-base font-black text-blue-200">
                    - ₹{calculation.estimatedSubsidy.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Government subsidy assistance may be available subject to applicable scheme guidelines, eligibility criteria, and official approval.
                </p>
              </div>

              {/* Net Payable by Farmer */}
              <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Net Cost to Farmer / Investor:</p>
                  <p className="text-2xl font-black text-white">
                    ₹{calculation.netCostToFarmer.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-emerald-400 font-bold">Bank Loan Eligible</p>
                  <p className="text-[11px] text-slate-300 font-medium">Up to 85% Financing</p>
                </div>
              </div>

            </div>

            {/* Yield & ROI Forecast */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Agronomy Revenue Projections</p>
              
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <p className="text-[10px] text-slate-400 font-medium">Est. Annual Production</p>
                  <p className="text-lg font-black text-emerald-400">
                    {(calculation.expectedAnnualYieldKg / 1000).toFixed(1)} MT
                  </p>
                  <p className="text-[10px] text-slate-400">{formData.cropIntended.split(' ')[0]}</p>
                </div>

                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <p className="text-[10px] text-slate-400 font-medium">Expected Payback Period</p>
                  <p className="text-lg font-black text-amber-400">
                    {calculation.paybackPeriodYears} Years
                  </p>
                  <p className="text-[10px] text-slate-400">ROI Cycle</p>
                </div>
              </div>

              <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50 flex items-center gap-2 text-[11px] text-slate-300">
                <HelpCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Pujya Agritech provides complete DPR preparation for State Bank of India, NABARD, and private agriculture loans.</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
