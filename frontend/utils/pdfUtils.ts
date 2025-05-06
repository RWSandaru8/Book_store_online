import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePdf = async (element: HTMLElement, fileName: string = 'invoice.pdf'): Promise<void> => {
  try {
    if (!element) {
      throw new Error('No element provided for PDF generation');
    }

    // Create a clone of the element to manipulate for PDF generation
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Apply styles to ensure dark theme throughout
    clone.style.backgroundColor = '#1a1a2e'; // dark-800 color
    clone.style.color = '#e2e2e2'; // light text color
    clone.style.padding = '30px';
    clone.style.borderRadius = '0'; // Remove border radius for PDF
    clone.style.minHeight = '100%';
    clone.style.width = '210mm'; // A4 width
    
    // Temporarily append to body for rendering
    document.body.appendChild(clone);
    
    // Create a canvas from the HTML element with extended options
    // Type cast to avoid TypeScript errors with extended options
    const html2canvasOptions: any = {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      logging: false, // Disable logs
      backgroundColor: '#1a1a2e', // Dark background matching our theme
      onclone: (cloneDoc: Document) => {
        const invoiceElement = cloneDoc.querySelector('#invoice-content') as HTMLElement;
        if (invoiceElement) {
          invoiceElement.style.minHeight = '100%';
        }
      }
    };
    
    const canvas = await html2canvas(clone, html2canvasOptions);
    
    // Remove the clone from DOM
    document.body.removeChild(clone);

    // Calculate dimensions to fit on A4 paper
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Add a dark background to the entire PDF page (using the internal API)
    const pdfObject = pdf as any; // Type cast to avoid TypeScript errors
    pdfObject.setFillColor(26, 26, 46); // #1a1a2e RGB value
    pdfObject.rect(0, 0, 210, 297, 'F'); // fill the entire A4 page
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Rethrow the error so the caller can handle it
    throw error;
  }
}; 