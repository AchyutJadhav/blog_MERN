import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>

        <img
          src="https://thumbs.dreamstime.com/b/aster-flowers-art-design-26968847.jpg"
          alt="image"
        ></img>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((cat) => (
            <li key={cat._id} className="sidebarListItem">
              <Link className="link" to={'/?cat='+cat.name}>{cat.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">Follow US</span>
        <ul className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-twitter"></i>
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        </ul>
      </div>
    </div>
  );
}
