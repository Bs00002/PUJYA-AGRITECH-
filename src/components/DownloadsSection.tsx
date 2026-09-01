import React, { useState } from 'react';
import { CATALOG_DOCS } from '../data/products';
import { Download, FileText, Award, Layers, Droplets, CheckCircle, ArrowDownToLine, Sparkles } from 'lucide-react';

export const DownloadsSection: React.FC = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const handleDownload = (docId: string, docTitle: string, downloadUrl?: string) => {
    setDownloadingId(docId);
    
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccessMessage(`Success! Opening "${docTitle}". Check your browser downloads.`);
      
      const link = document.createElement('a');
      link.href = downloadUrl && downloadUrl !== '#' ? downloadUrl : '/brochure.pdf';
      link.target = '_blank';
      link.download = 'Pujya-Agritech-Company-Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => setDownloadSuccessMessage(null), 5000);
    }, 600);
  };


  const getIcon = (type: string) => {
    switch (type) {
      case 'Award': return <Award className="w-6 h-6 text-amber-600" />;
      case 'Layers': return <Layers className="w-6 h-6 text-blue-600" />;
      case 'Droplets': return <Droplets className="w-6 h-6 text-emerald-600" />;
      default: return <FileText className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <section className="py-14 bg-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Resource Download Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Technical Catalogs & CAD Blueprints
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Download product e-brochures, National Horticulture Board (NHB) 50% subsidy guidelines, bank project report formats, and structural steel CAD blueprints.
          </p>
        </div>

        {downloadSuccessMessage && (
          <div className="mb-6 max-w-xl mx-auto bg-emerald-800 text-white p-4 rounded-xl text-xs font-bold flex items-center gap-3 shadow-lg animate-fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0" />
            <span>{downloadSuccessMessage}</span>
          </div>
        )}

        {/* Downloads Grid */}
        <div className={`grid grid-cols-1 ${CATALOG_DOCS.length > 1 ? 'md:grid-cols-2 max-w-5xl' : 'max-w-2xl'} gap-6 mx-auto`}>
          {CATALOG_DOCS.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                  {getIcon(doc.iconType)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200 uppercase">
                      {doc.category}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">{doc.fileSize}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-sans leading-snug">{doc.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">{doc.description}</p>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500">Official Specification Document</span>
                <button
                  onClick={() => handleDownload(doc.id, doc.title, doc.downloadUrl)}
                  disabled={downloadingId === doc.id}
                  className="px-4 py-2 rounded-xl bg-[#004b93] hover:bg-[#003870] disabled:bg-slate-300 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                >
                  {downloadingId === doc.id ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating PDF...</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownToLine className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
