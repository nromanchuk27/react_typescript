import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { History, LocationState } from 'history';
import { getStatus, getUserProfile, savePhoto, saveProfile, updateStatus } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';

type OwnPropsType = {
  history: History<LocationState>;
  match: {
    params: {
      userId: number;
    };
  };
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;
/*   
  type StateType = {
    editMode: boolean;
    status: string;
  }; */

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId && this.props.authorizedUserId) {
    } else {
      this.props.history.push('/login');
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
      />
    );
  }
}

type MapStatePropsType = {
  status: string;
  authorizedUserId: number | null;
  isAuth: boolean;
  profile: ProfileType;
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  //console.log('mapStateToProps PROFILE')
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
  };
};

type MapDispatchPropsType = {
  savePhoto: (file: any) => void;
  updateStatus: (sting: string) => void;
  getStatus: (userId: number) => void;
  getUserProfile: (userId: number) => void;
  saveProfile: (formData: any) => void;
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile
  }),
  withRouter
)(ProfileContainer);
