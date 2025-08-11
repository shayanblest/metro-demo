export interface UploadProgress {
  progress: number;
  completed: boolean;
}

export interface UploadResponse<T = any> {
  response?: T;
}

export interface UploadError {
  error?: any;
}

export type FileUploadResponse<T = any> = UploadProgress & UploadResponse<T> & UploadError;

export interface UploadResult {
  fileName: string;
}
