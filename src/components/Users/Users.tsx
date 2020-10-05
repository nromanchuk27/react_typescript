import React from "react";
import {UserType} from "../../types/types";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type PropsType = {
  currentPage: number;
  totalUsersCount: number;
  pageSize: number;
  onPageChanged: (page: number) => void;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  unFollow: (userId: number) => void;
  follow: (userId: number) => void;
};

let Users: React.FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
  return (
    <div>
      <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />
      <div>
        {users.map(u => (
          <User
            user={u}
            followingInProgress={props.followingInProgress}
            key={u.id}
            unFollow={props.unFollow}
            follow={props.follow}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
