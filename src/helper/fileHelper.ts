export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.mimetype.includes('image/')) {
    req.fileValidationError = 'Only image files allowed';
    return callback(null, true);
  }

  return callback(null, true);
};
