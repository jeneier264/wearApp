import { useState } from "react";
import React from "react";
import logo from "../assets/logo.svg";
import menu from "../assets/menu-outline.svg";
import close from "../assets/close-outline.svg";
import account from "../assets/person-outline.svg";
import { navLinks } from "../constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../style";

const Navbar = ({isCreatePage = false}) => {
  const [toggle, setToggle] = useState(false);
  const [login, setLogin] = useState(false);
  const isAuth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      <div className={isCreatePage ? `${styles.navbar2}` : `${styles.navbar1}`}>
        <div className="flex flex-row w-[100px]">
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="wearApp"
            className="cursor-pointer object-contain"
          />
        </div>
        <div className="flex flex-row">
          {navLinks.map((nav) => (
            <p
              className={`font-reenie font-normal cursor-pointer text-[27px] mx-6`}
              onClick={() => navigate(`/${nav.id}`)}
            >
              {nav.title}
            </p>
          ))}
        </div>
        <div className="sm:flex flex-row justify-end w-[100px] hidden ">
        {isAuth ? (
            <img
              onClick={() => navigate(`/profile/${user._id}`)
                      // window.location.reload(false);
              }
              src={`${user.profilePicture}`}
              alt="log in"
              className={styles.navProfilePic}
            />
          ) : (
            <img
              onClick={() => navigate("/login")}
              src={account}
              alt="log in"
              className={styles.navProfileIcon}
            />
          )}
        </div>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => {
              setToggle((prev) => !prev), setLogin((prev) => !prev);
            }}
          />
          <div
            className={`${toggle && login ? "flex" : "hidden"}
            p-6 bg-gradient-to-r from-pink-50 to-rose-200 absolute top-20
            right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            <ul className="list-none flex flex-col justify-center items-center flex-1">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-normal cursor-pointer text-[14px] ${
                    index === navLinks.length - 1 ? "mr-0" : "mb-4"
                  }`}
                >
                  <p onClick={() => navigate(`/${nav.id}`)}>{nav.title}</p>
                </li>
              ))}
              <li className="font-poppins font-normal cursor-pointer text-[14px] pt-4">
                <p onClick={() => navigate(`/login`)}>log in</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Navbar;
