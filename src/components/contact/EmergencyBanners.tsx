import React from 'react';

export function EmergencyBanners() {
  return (
    <div className="bg-stone-900 text-stone-100 rounded-xl p-6 space-y-3">
      <h2 className="text-base font-bold text-accent font-display">
        24/7 Emergency Dispatch Numbers
      </h2>
      <div className="space-y-2 text-xs font-mono-tabular">
        <div className="flex justify-between py-2 border-b border-stone-800">
          <span>CDRRMO Command Center:</span>
          <a href="tel:0633520117" className="font-bold text-white hover:text-accent">
            (063) 352-0117
          </a>
        </div>
        <div className="flex justify-between py-2 border-b border-stone-800">
          <span>City Fire Station (BFP Marawi):</span>
          <a href="tel:09178429910" className="font-bold text-white hover:text-accent">
            0917-842-9910
          </a>
        </div>
        <div className="flex justify-between py-2 border-b border-stone-800">
          <span>City Police Station (PNP Marawi):</span>
          <a href="tel:09985986678" className="font-bold text-white hover:text-accent">
            0998-598-6678
          </a>
        </div>
        <div className="flex justify-between py-2">
          <span>City Health Office / APMC ER:</span>
          <a href="tel:0632212536" className="font-bold text-white hover:text-accent">
            (063) 221-2536
          </a>
        </div>
      </div>
    </div>
  );
}

