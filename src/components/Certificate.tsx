import React from 'react';
import { Download, Share2, Award, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CertificateProps {
  userName: string;
  challengeName: string;
  date: string;
  rank: string;
}

export const Certificate: React.FC<CertificateProps> = ({ userName, challengeName, date, rank }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Your Achievement</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
            <Share2 size={16} />
            Share
          </button>
          <button
            onClick={async () => {
              const el = document.getElementById('certificate');
              if (!el) return;
              try {
                const canvas = await html2canvas(el as HTMLElement, { scale: 2, useCORS: true });
                const imgData = canvas.toDataURL('image/png');
                // create PDF with same pixel dimensions
                const pdf = new jsPDF({ unit: 'px', format: [canvas.width, canvas.height] });
                pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
                const filename = `${(userName || 'certificate').replace(/\s+/g, '_')}.pdf`;
                pdf.save(filename);
              } catch (err) {
                console.error('PDF generation failed', err);
                // Fallback: generate a simple text-based PDF using jsPDF directly
                try {
                  const filename = `${(userName || 'certificate').replace(/\s+/g, '_')}.pdf`;
                  const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
                  const w = pdf.internal.pageSize.getWidth();
                  pdf.setFillColor(243, 244, 246);
                  pdf.rect(0, 0, w, pdf.internal.pageSize.getHeight(), 'F');
                  pdf.setFontSize(28);
                  pdf.setTextColor(20, 20, 20);
                  pdf.text('Certificate of Excellence', w / 2, 120, { align: 'center' });
                  pdf.setFontSize(14);
                  pdf.text('This is to certify that', w / 2, 170, { align: 'center' });
                  pdf.setFontSize(26);
                  pdf.text(userName || '', w / 2, 220, { align: 'center' });
                  pdf.setFontSize(12);
                  pdf.text(`has successfully completed the ${challengeName} coding challenge with a distinguished rank of ${rank}.`, w / 2, 270, { align: 'center', maxWidth: w - 120 });
                  pdf.setFontSize(10);
                  pdf.text(date || '', w - 120, pdf.internal.pageSize.getHeight() - 80);
                  pdf.save(filename);
                } catch (err2) {
                  console.error('Fallback PDF failed', err2);
                  window.print();
                }
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Certificate Design */}
      <div className="relative bg-white p-12 rounded-3xl shadow-2xl border-[16px] border-indigo-900 text-center overflow-hidden" id="certificate">
        {/* Background patterns */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-100 rounded-full translate-x-1/2 translate-y-1/2 opacity-50"></div>
        
        <div className="relative z-10 space-y-8">
          <div className="flex justify-center">
            <div className="p-4 bg-indigo-50 rounded-full">
              <Award size={64} className="text-indigo-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-5xl font-serif font-bold text-slate-900 uppercase tracking-widest">Certificate</h2>
            <p className="text-indigo-600 font-medium text-xl">of Excellence</p>
          </div>

          <div className="py-8">
            <p className="text-slate-500 italic text-lg mb-4">This is to certify that</p>
            <h3 className="text-4xl font-bold text-slate-900 border-b-2 border-slate-200 inline-block px-8 pb-2">
              {userName}
            </h3>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-slate-600 text-lg leading-relaxed">
              has successfully completed the <span className="font-bold text-slate-900">{challengeName}</span> 
              coding challenge with a distinguished rank of <span className="font-bold text-indigo-600">{rank}</span>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 pt-12">
            <div className="text-center">
              <div className="border-b border-slate-300 w-48 mx-auto mb-2"></div>
              <p className="text-sm font-bold text-slate-900">Dr. Alan Turing</p>
              <p className="text-xs text-slate-500">Program Director</p>
            </div>
            <div className="text-center">
              <div className="border-b border-slate-300 w-48 mx-auto mb-2"></div>
              <p className="text-sm font-bold text-slate-900">{date}</p>
              <p className="text-xs text-slate-500">Date of Issue</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
        >
          <RotateCcw size={18} />
          Print Certificate
        </button>
      </div>
    </div>
  );
};
