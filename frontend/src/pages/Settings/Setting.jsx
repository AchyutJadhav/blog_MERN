import "./Setting.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext } from "react";
import { Context } from "../../context/Context";

// "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"

export default function Setting() {
  const {user} = useContext(Context);
  return (
    <div className="setting">
      <div className="settingWrapper">
        <div className="settingTitle">
          <span className="settingUpdateTitle">Update Your Account</span>
          <span className="settingDeleteTitle">Delete Account</span>
        </div>
        <form className="settingForm">
          <lable>Profile Picture</lable>
          <div className="settingPP">
            <img
              className="settingImg"
              src= {user.profilePic}
              alt=""
            />

            <label htmlFor="fileInput">
              <i className="settingPPIcon far fa-user-circle"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingPPInput"
            />
          </div>

          <lable>Username</lable>
          <input type='text' placeholder="Username"></input>
          <lable>Email</lable>
          <input type='email' placeholder="Email"></input>
          <lable>Username</lable>
          <input type='password'></input>
          <button className="settingSubmit" >Submit</button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
