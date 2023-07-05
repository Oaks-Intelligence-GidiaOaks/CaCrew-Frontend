const fileTypeReader = (file, reader) => {
  switch (file.type) {
    case "image/jpeg":
    case "image/png":
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
