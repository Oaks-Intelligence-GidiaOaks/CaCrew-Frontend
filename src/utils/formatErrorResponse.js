export const formatErrorResponse = (error) => {
  const message = error?.data?.message ?? error?.error;
  return message;
};
