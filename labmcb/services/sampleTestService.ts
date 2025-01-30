// services/sampleTestService.ts
export async function getSampleTestDetail(id: number) {
    try {
      const response = await fetch(`/api/sample-test/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch sample test details');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error fetching sample test details:', error);
      throw error;
    }
  }