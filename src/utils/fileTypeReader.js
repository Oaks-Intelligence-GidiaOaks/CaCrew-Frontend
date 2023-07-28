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
      console.error("Unsupported file type");
  }
};

export default fileTypeReader;

export const createFileFromData = (data, fileName, mimeType) => {
  const arr = data.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch && mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const blob = new Blob([u8arr], { type: mime });

  // const lastModified = new Date();
  const fileOptions = { type: mimeType };
  const file = new File([blob], fileName, fileOptions);

  return file;
};
