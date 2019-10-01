import React from "react";
import DefaultProfileImg from "../images/default-profile-image.jpg";

const UserAside = ({profileImgUrl, username}) => (
    <aside className="col-sm-2">
        <div className="panel panel-default">
            <div className="panel-body">
                <img src={profileImgUrl || DefaultProfileImg} alt={username} className="img-thumbnail" width="200" height="200"></img>
    
            </div>
        </div>
    </aside>
)

export default UserAside;
   
