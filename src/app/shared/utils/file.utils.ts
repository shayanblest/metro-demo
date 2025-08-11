export function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };

    reader.onerror = error => reject(error);

    reader.readAsDataURL(file);
  });
}

export function isImage(file: File): boolean {
  return file.type.startsWith('image/');
}

export async function getFileFromUrl(url: string, filename: string): Promise<File> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch file from URL: ${response.statusText}`);
  }

  const blob = await response.blob();
  const fileType = blob.type || 'application/octet-stream';
  return new File([blob], filename, { type: fileType });
}
