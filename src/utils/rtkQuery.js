const rtkQuery = async (request, credentials = null) => {
  let data = null;
  let errorData = null;

  try {
    const result = credentials ? await request(credentials) : await request();
    data = result.data;
  } catch (error) {
    errorData = error.message;
  }

  return { data, errorData };
};

export default rtkQuery;
