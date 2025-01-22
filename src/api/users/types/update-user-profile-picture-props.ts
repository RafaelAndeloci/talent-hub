type UpdateUserProfilePictureProps = {
  userId: string;
  file: Buffer 
  contentType: 'image/jpeg' | 'image/png';
};

export default UpdateUserProfilePictureProps;
