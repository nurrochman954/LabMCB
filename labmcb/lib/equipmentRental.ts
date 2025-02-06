// lib/equipmentRental.ts
import { EquipmentRentalFormData } from '@/lib/validations/equipment-rental';
import { RentalEquipment } from '@prisma/client';

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

interface EquipmentOrder {
  equipmentType: RentalEquipment;
  quantity: number;
}

export async function createEquipmentRental(
  userId: string, 
  formData: EquipmentRentalFormData
): Promise<ApiResponse> {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Transform data to match API expectations
    const requestData = {
      rentalName: formData.rentalName,
      rentalEmail: formData.rentalEmail,
      rentalPhone: formData.rentalPhone,
      rentalAddress: formData.rentalAddress,
      rentalInstance: formData.rentalInstance,
      startDate: formData.startDate,
      endDate: formData.endDate,
      agreementFile: formData.agreementFile,
      equipmentOrders: formData.equipmentOrders.map((order): EquipmentOrder => ({
        equipmentType: order.equipmentType,
        quantity: Number(order.quantity)
      }))
    };

    const response = await fetch('/api/equipment-rental', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(requestData),
    });

    // Handle empty response
    const responseText = await response.text();
    if (!responseText) {
      console.error('Empty response from server');
      throw new Error('Server returned an empty response');
    }

    // Parse response
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response:', responseText);
      throw new Error('Invalid JSON response from server');
    }

    // Handle non-200 responses
    if (!response.ok) {
      throw new Error(result.error || `Server error: ${response.status}`);
    }

    return {
      success: true,
      data: result.data
    };

  } catch (error) {
    console.error('Error in createEquipmentRental:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}