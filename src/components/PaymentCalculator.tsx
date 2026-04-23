"use client";

import { useState, useMemo } from "react";

export function PaymentCalculator() {
  const [price, setPrice] = useState(30000);
  const [downPayment, setDownPayment] = useState(0);
  const [rate, setRate] = useState(7.9);
  const [term, setTerm] = useState(72);
  const [hasStatusCard, setHasStatusCard] = useState(true);

  const result = useMemo(() => {
    const principal = price - downPayment;
    const taxSavings = hasStatusCard ? Math.round(price * 0.13) : 0;
    const effectivePrice = principal - (hasStatusCard ? taxSavings : 0);
    const monthlyRate = rate / 100 / 12;
    const numPayments = term;

    let monthly: number;
    if (monthlyRate === 0) {
      monthly = effectivePrice / numPayments;
    } else {
      monthly = (effectivePrice * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    const biWeekly = monthly / 2.17;

    return {
      monthly: Math.round(monthly),
      biWeekly: Math.round(biWeekly),
      taxSavings,
      totalCost: Math.round(monthly * numPayments),
    };
  }, [price, downPayment, rate, term, hasStatusCard]);

  const sliderClass =
    "w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-earth-gold";

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
      <div className="space-y-6">
        {/* Vehicle Price */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-white/70">Vehicle Price</label>
            <span className="text-sm font-bold text-earth-gold">${price.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={10000}
            max={80000}
            step={1000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={sliderClass}
          />
          <div className="flex justify-between text-[10px] text-white/30 mt-1">
            <span>$10,000</span>
            <span>$80,000</span>
          </div>
        </div>

        {/* Down Payment */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-white/70">Down Payment</label>
            <span className="text-sm font-bold text-earth-gold">${downPayment.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={0}
            max={20000}
            step={500}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className={sliderClass}
          />
          <div className="flex justify-between text-[10px] text-white/30 mt-1">
            <span>$0</span>
            <span>$20,000</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-white/70">Interest Rate</label>
            <span className="text-sm font-bold text-earth-gold">{rate}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={29.9}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className={sliderClass}
          />
          <div className="flex justify-between text-[10px] text-white/30 mt-1">
            <span>0%</span>
            <span>29.9%</span>
          </div>
        </div>

        {/* Term */}
        <div>
          <label className="text-sm text-white/70 block mb-2">Loan Term</label>
          <div className="grid grid-cols-4 gap-2">
            {[48, 60, 72, 84].map((t) => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className={`py-2.5 rounded-xl text-xs font-bold transition ${
                  term === t
                    ? "bg-earth-gold text-earth-dark"
                    : "bg-white/5 border border-white/10 text-white/50 hover:text-white"
                }`}
              >
                {t} mo
              </button>
            ))}
          </div>
        </div>

        {/* Status Card Toggle */}
        <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer">
          <input
            type="checkbox"
            checked={hasStatusCard}
            onChange={(e) => setHasStatusCard(e.target.checked)}
            className="w-4 h-4 accent-earth-gold"
          />
          <div>
            <span className="text-sm text-white">I have a Status Card</span>
            <p className="text-xs text-white/40">Save 100% HST on your vehicle</p>
          </div>
        </label>
      </div>

      {/* Results */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-earth-gold/10 border border-earth-gold/30 rounded-xl p-5 text-center">
          <p className="text-xs text-earth-gold font-bold tracking-wider uppercase mb-1">Monthly</p>
          <p className="text-3xl font-bold text-earth-gold">${result.monthly}</p>
          <p className="text-[10px] text-white/40 mt-1">/month</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
          <p className="text-xs text-white/50 font-bold tracking-wider uppercase mb-1">Bi-Weekly</p>
          <p className="text-3xl font-bold text-white">${result.biWeekly}</p>
          <p className="text-[10px] text-white/40 mt-1">/every 2 weeks</p>
        </div>
      </div>

      {hasStatusCard && result.taxSavings > 0 && (
        <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
          <p className="text-sm text-green-400">
            <span className="font-bold">You save ${result.taxSavings.toLocaleString()}</span> in tax with your Status Card
          </p>
        </div>
      )}

      <div className="mt-6 text-center">
        <a
          href="#apply"
          className="inline-block bg-earth-red hover:bg-red-700 text-white px-10 py-4 rounded-lg font-bold uppercase tracking-wide transition"
        >
          Get Your Real Rate — Apply Now
        </a>
        <p className="text-[10px] text-white/30 mt-3">
          Estimates only. Your actual rate depends on credit, income, and lender approval.
        </p>
      </div>
    </div>
  );
}
