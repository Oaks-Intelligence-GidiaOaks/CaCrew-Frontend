import { fileImg, docpng, pdf, pic } from "assets/images";
function getFileDetails(downloadUrl) {
  const regex = /\/([^/]+)\?alt=media/;
  const match = regex.exec(downloadUrl);

  let image;
  let type

  if (match && match.length >= 2) {
    const fileName = match[1];
    console.log(fileName);
    if (fileName === "pdf") {
      image = pdf;
      type = "pdf"
    } else if (fileName === "png" || fileName === "jpeg") {
      image = pic;
      type = "png"
    } else if (fileName === "xlsx" || fileName === "xls") {
      image = fileImg;
      type = "xlsx"
    } else if (fileName === "docx") {
      image = docpng;
      type = "docx"
    } else {
      // Unknown file type
      image = "unknown";
    }
  } else {
    console.log("No file name found in the URL.");
  }
  return {type, image };
}

export default getFileDetails;
