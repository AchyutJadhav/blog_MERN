import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

import "./SinglePost.css";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState();

  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const authorName = post && post.username;

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/api/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (e) {}
  };

  const handleUpdate = async () =>{
    try{
      await axios.put("http://localhost:5000/api/posts/" + path,{
        username:user.username, title, desc
      });
    }catch(e){
      console.log(e);
    }

    window.location.reload();
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post && post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="image" />
        )}

        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post && post.title}

            {post?.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-solid fa-pen-to-square"
                  onClick={() => {
                    setUpdateMode(true);
                  }}
                ></i>
                <i
                  className="singlePostIcon fa-solid fa-trash"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:{" "}
            <b>
              <Link className="link" to={"/?user=" + authorName}>
                {authorName}
              </Link>
            </b>
          </span>
          <span className="singlePostDate">1 Hour ago</span>
        
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        ) : (
          <p className="singlePostDesc">{post && post.desc}</p>
        )}
        {updateMode && <button className="singlePostButton" onClick={handleUpdate}>Update</button>}
      
      </div>
      </div>
    </div>
  );
}
