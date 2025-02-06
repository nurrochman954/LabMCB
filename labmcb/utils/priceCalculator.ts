import { RentalEquipment } from '@prisma/client';

export const EQUIPMENT_PRICES = {
    XRF_HANDHELD: 700000,
    MICRODRILL_DRMS: 500000,
    ULTRASONIC_HARDNESS_TESTER: 100000,
    UPV: 250000,
    THERMAL_CAMERA: 200000,
    SCHMIDT_HAMMER: 200000
  } as const;
  
export const calculateRentalPrice = (orders: Array<{
    equipmentType: RentalEquipment;
    quantity: number;
  }>, startDate: string, endDate: string): {
    itemizedPrices: Array<{
      equipment: string;
      quantity: number;
      days: number;
      price: number;
    }>;
    totalPrice: number;
  } => {
    if (!startDate || !endDate) return { itemizedPrices: [], totalPrice: 0 };
  
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  
    if (days <= 0) return { itemizedPrices: [], totalPrice: 0 };
  
    const itemizedPrices = orders.map(order => {
      const pricePerDay = EQUIPMENT_PRICES[order.equipmentType];
      const price = pricePerDay * order.quantity * days;
      return {
        equipment: order.equipmentType.replace(/_/g, ' '),
        quantity: order.quantity,
        days,
        price
      };
    });
  
    const totalPrice = itemizedPrices.reduce((sum, item) => sum + item.price, 0);
  
    return { itemizedPrices, totalPrice };
  };