export type PostType = {
  id: number;
  message: string;
  likesCount: number;
};
export type ContactsType = {
  vk: string;
  github: string;
  instagram: string;
  facebook: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};
export type PhotoType = {
  small: string | null;
  large: string | null;
};
export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photo: PhotoType;
};

export type UserType = {
  id: number;
  name: string;
  status: string;
  photos: PhotoType;
  followed: boolean;
};
