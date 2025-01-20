import { SampleTestFormData } from '@/lib/validations/sample-test';

export async function createSampleTestForm(userId: string, formData: SampleTestFormData) {
  try {
    console.log('Sending data:', { userId, formData });
    
    const response = await fetch('/api/sample-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        sampleQuantity: Number(formData.sampleQuantity),
      }),
    });

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    if (!responseText) {
      throw new Error('Empty response from server');
    }

    const result = JSON.parse(responseText);

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create sample test');
    }

    return result;
  } catch (error) {
    console.error('Error in createSampleTestForm:', error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}