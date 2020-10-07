import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';

type PropsType = {
  savePhoto: (file: any) => void;
  updateStatus: (sting: string) => void;
  getStatus: (userId: number) => void;
  getUserProfile: (userId: number) => void;
  isOwner: boolean;
  profile: ProfileType;
  status: string;
  saveProfile: (formData: any) => void;
};

const Profile: React.FC<PropsType> = props => {
  return (
    <div>
      <ProfileInfo
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        saveProfile={props.saveProfile}
        updateStatus={props.updateStatus}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
