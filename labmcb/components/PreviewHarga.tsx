import React from 'react';
import { RentalEquipment } from '@prisma/client';
import { calculateRentalPrice } from '@/utils/priceCalculator';

interface PricePreviewProps {
    orders: Array<{
        equipmentType: RentalEquipment;
        quantity: number;
    }>;
    startDate: string;
    endDate: string;
}

const PricePreview: React.FC<PricePreviewProps> = ({ orders, startDate, endDate }) => {
    const { itemizedPrices, totalPrice } = calculateRentalPrice(orders, startDate, endDate);

    if (itemizedPrices.length === 0) return null;

    return (
        <div style={{
            width: '713px',
            margin: '15px auto 15px 0px',  
            padding: '15px',
            borderRadius: '10px',
            border: '1px solid #C6C6C6',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
            fontFamily: 'Lato, sans-serif'
        }}>

            <h3 style={{
                fontSize: '18px',
                marginBottom: '8px',
                fontWeight: 'bold'
            }}>
                Perkiraan Biaya Sewa Awal
                <span style={{
                    fontSize: '12px',
                    fontWeight: 'normal',
                    marginLeft: '6px',
                    color: '#666'
                }}>
                    (Belum Termasuk Biaya Lain-Lain)
                </span>
            </h3>

            {itemizedPrices.map((item, index) => (
                <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                    fontSize: '14px'
                }}>
                    <span>
                        {item.equipment} (x{item.quantity}) - {item.days} hari
                    </span>
                    <span>
                        Rp{item.price.toLocaleString('id-ID')},00
                    </span>
                </div>
            ))}

            <div style={{
                borderTop: '1px solid #C6C6C6',
                marginTop: '8px',
                paddingTop: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '14px',
                fontWeight: 'bold'
            }}>
                <span>Total</span>
                <span>Rp{totalPrice.toLocaleString('id-ID')},00</span>
            </div>
        </div>
    );
};

export default PricePreview;