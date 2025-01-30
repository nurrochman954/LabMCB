// types.ts
import { TestStatus } from '@prisma/client';
export interface SampleTest {
    id: number;
    testName: string;
    sampleRequestNumber: string;
    status: string;
  }
  
  export interface TestTimelineData {
    id: number;
    testStatus: TestStatus;
    testTimelineCreatedAt: Date;
  }
  
  export interface TrackingStatus {
    [key: number]: {
      isAdminReceived: boolean;
      isSupervisorProcessing: boolean;
      isSupervisorApproved: boolean;
      isSupervisorRejected: boolean;
      isLaboranTesting: boolean;
      isPaymentNeeded: boolean;
      isFileUploaded: boolean;
    }
  }
  
  export interface CloudinaryUploadWidgetInfo {
    url: string;
    resource_type: string;
    format: string;
    secure_url: string;
    public_id: string;
    original_filename: string;
  }
  
  export interface UploadedFile {
    url: string;
    downloadUrl: string;
    type: 'image' | 'pdf';
    filename?: string;
    format: string;
    public_id: string;
  }