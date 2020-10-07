import React, { useState, ChangeEvent } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png';
import ProfileDataForm from './ProfileDataForm';
import { ProfileType } from '../../../types/types';

type ProfileInfoOwnPropsType = {
  savePhoto: (file: any) => void;
  updateStatus: (sting: string) => void;
  isOwner: boolean;
  profile: ProfileType;
  status: string;
  saveProfile: (formData: any) => any;
};

const ProfileInfo: React.FC<ProfileInfoOwnPropsType> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
  let [editMode, setEditMode] = useState(false as boolean);

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData: FormDataEntryValue) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={profile.photo.large || userPhoto} className={s.mainPhoto} />
        {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}

        {editMode ? (
          <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
        ) : (
          <ProfileData
            goToEditMode={() => {
              setEditMode(true);
            }}
            profile={profile}
            isOwner={isOwner}
          />
        )}

        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

type ProfileDataOwnPropsType = {
  profile: ProfileType;
  isOwner: boolean;
  goToEditMode: () => void;
};
const ProfileData: React.FC<ProfileDataOwnPropsType> = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>edit</button>
        </div>
      )}
      <div>
        <b>Full name</b>: {profile.fullName}
      </div>
      <div>
        <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
      )}

      <div>
        <b>About me</b>: {profile.aboutMe}
      </div>
      <div>
        <b>Contacts</b>:
        {Object.entries(profile.contacts).map((key, i) => {
          return <Contact key={i} contactTitle={key[0]} contactValue={key[1]} />;
        })}
      </div>
    </div>
  );
};

type ContactOwnPropsType = {
  contactTitle: string;
  contactValue: string;
};
const Contact: React.FC<ContactOwnPropsType> = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

export default ProfileInfo;
