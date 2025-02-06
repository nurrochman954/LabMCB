// services/rentalService.ts
export async function getRentalDetail(id: number) {
    try {
      const response = await fetch(`/api/equipment-rental/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch rental details');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching rental details:', error);
      throw error;
    }
  }
  
  export async function updateRentalTimeline(id: number, status: string) {
    try {
      const response = await fetch(`/api/equipment-rental/${id}/timeline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update rental timeline');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error updating rental timeline:', error);
      throw error;
    }
  }
  
  export async function updateRentalFiles(
    id: number, 
    files: {
      invoiceFile?: string | null;
      paymentProof?: string | null;
    }
  ) {
    try {
      const response = await fetch(`/api/equipment-rental/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(files),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update rental files');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error updating rental files:', error);
      throw error;
    }
  }