export interface ExportConfig {
  title: string
  clientName: string
  amount?: number
  items: any[]
}

export async function generateDocumentPreview(config: ExportConfig): Promise<{ success: boolean; downloadUrl: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        downloadUrl: `#download-simulation-${Date.now()}`
      });
    }, 1200);
  });
}

