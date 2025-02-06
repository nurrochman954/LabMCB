import React, { useState } from 'react';
import ButtonDU from "@/components/TombolDU";

interface FilterProps {
    onClose: () => void;
    onSearch: (results: Record<string, number>) => void;
}

const Filter: React.FC<FilterProps> = ({ onClose, onSearch }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [formType, setFormType] = useState<'sample-test' | 'equipment-rental' | ''>('');
    const [results, setResults] = useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setIsLoading(true);
        setError('');

        try {
            const params = new URLSearchParams({
                startDate,
                endDate,
                formType: formType || ''
            });
      
            const response = await fetch(`/api/search?${params}`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("Response was not JSON");
            }
      
            const data = await response.json();
            
            if (data.success) {
                setResults(data.data);
                onSearch(data.data);
            } else {
                setError(data.message || 'Terjadi kesalahan saat mencari data');
            }
        } catch (error) {
            console.error('Search error:', error);
            setError('Gagal memuat data. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };    

    const formatEquipmentName = (name: string) => {
        return name
            .split('_')
            .map(word => word.toUpperCase())
            .join(' ');
     };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[800px]">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Filter</h2>
                    <ButtonDU 
                        text={isLoading ? "Mencari..." : "Cari"} 
                        variant="primary" 
                        onClick={isLoading ? undefined : handleSearch} 
                        showIcon={false}
                    />
                </div>

                <hr className="border-t border-gray-300 my-4" />
                
                <div className="mb-6">
                    <label className="block text-gray-700">Tanggal Pencarian</label>
                    <div className="flex items-center space-x-2 mt-1">
                        <input
                            type="date"
                            className="border rounded-md px-2 py-1 w-full"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            disabled={isLoading}
                        />
                        <span>s.d.</span>
                        <input
                            type="date"
                            className="border rounded-md px-2 py-1 w-full"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700">Tipe Layanan</label>
                    <div className="flex items-center space-x-4 mt-1">
                        <label>
                            <input 
                                type="radio" 
                                name="tipeLayanan" 
                                value="sample-test"
                                checked={formType === 'sample-test'}
                                onChange={(e) => setFormType(e.target.value as 'sample-test')}
                                disabled={isLoading}
                            />
                            <span className="ml-2">Uji Sampel</span>
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="tipeLayanan" 
                                value="equipment-rental"
                                checked={formType === 'equipment-rental'}
                                onChange={(e) => setFormType(e.target.value as 'equipment-rental')}
                                disabled={isLoading}
                            />
                            <span className="ml-2">Peminjaman Alat</span>
                        </label>
                    </div>
                </div>

                <hr className="border-t border-gray-300 my-4" />

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Pencarian ditemukan:</h3>
                    <div className="grid grid-cols-1 gap-y-2 ml-10 mt-2">
                        {Object.entries(results).map(([key, value]) => (
                            <div key={key} className="flex space-x-2">
                                <div className="w-1/4 text-left">{formatEquipmentName(key)}</div>
                                <div className="w-1/60 text-center">:</div>
                                <div className="w-1/8 text-right">{value}</div>
                            </div>
                        ))}
                        {!isLoading && Object.keys(results).length === 0 && (
                            <p className="text-gray-500">Tidak ada data</p>
                        )}
                        {isLoading && (
                            <p className="text-gray-500">Memuat data...</p>
                        )}
                    </div>
                </div>

                <ButtonDU 
                    text="Tutup" 
                    variant="secondary" 
                    onClick={isLoading ? undefined : onClose} 
                    showIcon={false}
                />
            </div>
        </div>
    );
};

export default Filter;