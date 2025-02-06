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

// types.ts
export interface BaseTrackingStatus {
  isAdminReceived: boolean;
  isSupervisorProcessing: boolean;
  isSupervisorApproved: boolean;
  isSupervisorRejected: boolean;
  isLaboranTested: boolean;
  isPaymentPaid: boolean;
  isFileUploaded: boolean;
}

interface TrackingStatus {

  createdAt?: Date;
}

export interface AdminTrackingStatus {
  [key: number]: BaseTrackingStatus;
}

export interface UserTrackingStatus {
  [key: number]: BaseTrackingStatus & {
    createdAt: Date;
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