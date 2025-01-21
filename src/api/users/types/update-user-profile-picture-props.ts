type UpdateUserProfilePictureProps = {
  userId: string;
  fileStream: NodeJS.ReadableStream;
  contentType: 'image/jpeg' | 'image/png';
};

export default UpdateUserProfilePictureProps;
