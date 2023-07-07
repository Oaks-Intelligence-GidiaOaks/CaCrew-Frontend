import { fileImg, docpng, pdf, pic } from "assets/images";
async function getFileDetails(downloadUrl) {
  try {
    const response = await fetch(downloadUrl);
    const headers = response.headers;

    // Extract file size
    const contentLength = headers.get('content-length');
    const fileSize = contentLength ? parseInt(contentLength, 10) : 0;

    // Extract file name from the URL
    const urlParts = downloadUrl.split('/');
    const fileName = urlParts[urlParts.length - 1].split('?')[0];

    // Determine the file type based on the file extension
    const fileExtension = fileName.split('.').pop().toLowerCase();

    let image;
    if (fileExtension === 'pdf') {
      image = pdf;
    } else if (fileExtension === 'png' || fileExtension === 'jpeg') {
      image = pic;
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      image = fileImg;
    } else if (fileExtension === 'docx') {
      image = docpng;
    } else {
      // Unknown file type
      image = 'unknown';
    }

    return { fileSize, fileName, image };
  } catch (error) {
    console.error('Error retrieving file details:', error);
    throw error;
  }
}

export default getFileDetails