// import * as XLSX from "xlsx";
// import * as docx from "docx";

const fileTypeReader = (file, reader) => {
  switch (file.type) {
    case "image/jpeg":
    case "image/png":
    case "image/jpg":
    case "application/pdf":
      reader.readAsDataURL(file);
      break;
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      reader.readAsBinaryString(file);
      break;
    default:
      alert("Unsupported file type");
  }
};

export default fileTypeReader;

export const stringTypeToFile = (str, type, name) => {
  if (!str) {
    return;
  }
  if (str) {
    const uint8Array = Uint8Array.from(str, (char) => char.charCodeAt(0));
    var blob = new Blob([uint8Array], { type: type });
    let file = new File([blob], name, { type: blob.type });
    console.log(file, "file")
    return file;
  }
};

// case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
//     case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
//       //  str is a FileReader object that has read a file as binary string
//       var binaryString = str; // The binary string to convert
//       var fileType = type; // The file type
//       if (
//         fileType ===
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//       ) {
//         // Excel file
//         var workbook = XLSX.read(binaryString, { type: "binary" }); // The workbook object
//         var sheetName = name; // The first sheet name
//         var sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]); // The sheet data as JSON array
//         var blob = new Blob([JSON.stringify(sheetData)], {
//           type: "application/json",
//         }); // The blob object
//         file = new File([blob], sheetName, { type: type }); // The file object
//       } else if (
//         fileType ===
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//       ) {
//         // Word file
//         var doc = new docx.Document(); // The docx document object
//         doc.load(binaryString); // Load the binary string
//         var paragraphs = doc.getParagraphs(); // Get the paragraphs as array
//         var text = ""; // The text content of the document
//         for (var i = 0; i < paragraphs.length; i++) {
//           text += paragraphs[i].getText() + "\n"; // Append each paragraph text with a newline
//         }
//         var blobs = new Blob([text], { type: "text/plain" }); // The blob object
//         file = new File([blobs], name, { type: type }); // The file object
//       } else {
//         // Unsupported file type
//         console.error("Unsupported file type: " + fileType);
//       }
//       // The blob object
