import React from 'react';

const Tracking = () => {
  const steps = [
    {
      title: 'Admin Laboratorium telah menerima surat pengantar dan sampel',
      completed: true,
    },
    {
      title: 'Sedang diproses oleh Supervisor',
      completed: true,
    },
    {
      title: 'Supervisor menyetujui analisis sampel',
      completed: true,
    },
    {
      title: 'Customer perlu membayar',
      completed: false,
      actions: [
        { label: 'Invoice', download: true },
        { label: 'Unggah Bukti Pembayaran', upload: true },
      ],
    },
    {
      title: 'Pengiriman sedang dalam proses',
      completed: false,
    },
    {
      title: 'Hasil uji sampel',
      completed: false,
      actions: [{ label: 'File Uji Sampel', download: true }],
    },
  ];

  return (
    <div className="p-4 ml-8">
      <div className="bg-amber-50 p-6 rounded-lg max-w-2xl">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Nomor Permohonan</h2>
        <p className="text-sm text-gray-600">Tanggal Permohonan: 23 Januari 2025</p>
      </div>

      <div className="relative">
        {steps.map((step, index) => (
          <div key={index} className="mb-4 relative">
            {/* Vertical line */}
            {index < steps.length - 1 && (
              <div className="absolute left-1.5 top-3 w-0.5 h-[calc(100%+0.5rem)] bg-black" />
            )}

            {/* Step content */}
            <div className="flex items-start">
              {/* Status circle */}
              <div className={`w-3 h-3 rounded-full mt-1.5 z-10 ${
                step.completed ? 'bg-green-500' : 'bg-gray-300'
              }`} />

              {/* Step details */}
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium mb-2">{step.title}</p>
                
                {/* Action buttons */}
                {step.actions && (
                  <div className="flex gap-2 mt-2">
                    {step.actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        className={`px-2 py-1 text-sm rounded-md flex items-center gap-2 shadow-sm
                          ${action.upload 
                            ? 'bg-[#50BCB8] hover:bg-[#45a7a3] text-white' 
                            : 'bg-white hover:bg-gray-50 border-2 border-[#50BCB8] text-black'}`}
                      >
                        {action.download && (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        )}
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-right">
        <button className="text-blue-600 text-sm hover:underline">
          Ajukan Pengaduan
        </button>
      </div>
    </div>
    </div>
  );
};

export default Tracking;