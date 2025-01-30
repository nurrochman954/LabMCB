import { SampleTestFormData } from '@/lib/validations/sample-test';

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function createSampleTestForm(
  userId: string, 
  formData: SampleTestFormData
): Promise<ApiResponse> {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const response = await fetch('/api/sample-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        ...formData,
        sampleQuantity: Number(formData.sampleQuantity),
        analysisTypes: Array.isArray(formData.analysisTypes) ? formData.analysisTypes : []
      }),
    });

    // Check if response is empty
    const responseText = await response.text();
    if (!responseText) {
      console.error('Empty response from server');
      throw new Error('Server returned an empty response');
    }

    // Try to parse the response text
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

    // Return successful response
    return {
      success: true,
      data: result.data
    };

  } catch (error) {
    console.error('Error in createSampleTestForm:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}