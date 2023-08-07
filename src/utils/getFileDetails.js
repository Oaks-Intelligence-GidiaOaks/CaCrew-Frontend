import { excel, docpng, pdf, pic } from "assets/images";

function getFileDetails(downloadUrl) {
  const fileNameAndTypeRegex = /\/([^/]+\/[^/]+\.\w+)(?=\?|$)/;
  const match = downloadUrl ? downloadUrl.match(fileNameAndTypeRegex) : [];

  let image;
  let name;
  // If there's a match, return an object containing the file name and file type
  if (match && match.length >= 2) {
    const fileNameWithSpaces = match[1].replace(/%20/g, " "); // Replace %20 with spaces
    const lastSlashIndex = fileNameWithSpaces.lastIndexOf("/");
    const fileName = fileNameWithSpaces.slice(lastSlashIndex + 1);
    const fileType = fileName.split(".").pop();

    if (fileType === "pdf") {
      image = pdf;
      name = fileName;
    } else if (fileType === "png" || fileType === "jpeg" || fileType === "jpg") {
      image = pic;
      name = fileName;
    } else if (fileType === "xlsx" || fileType === "xls") {
      image = excel;
      name = fileName;
    } else if (fileType === "docx") {
      image = docpng;
      name = fileName;
    }
  } else {
    image = null;
    name = null;
  }

  return { image, name };
}

export default getFileDetails;
