import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./HeaderHomeLoggedin.css";
import { useState, useRef } from 'react';
import { FormMenuSetting } from '../FormMenuSetting/FormMenuSetting';
import { useContext } from 'react';
import { AuthContext } from '../../../../../contextapi/AuthContext';
import React from 'react';

export const HeaderHomeLoggedin = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Hàm xử lý khi hover vào phần tử
  const handleMouseEnter = () => {
    setShowMenu(true);
  };

  // Hàm xử lý khi rời khỏi phần tử
  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  return (
    <>
      <div
        className="wrapper_form_login"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={menuRef}

      >
        <div className="header__home_name" >
          {user?.fullName}
        </div>
        <div className="header__home_icon">
  <div>
    {user?.avatar ? (
      <img src={user?.avatar} alt="avatar" style={{ width: "50px", height: "50px", borderRadius: "50%" , marginLeft:"15px"}} />
    ) : (
      <AccountCircleIcon sx={{ fontSize: 40 }} />
    )}
  </div>
</div>

        {showMenu && (
          <div className="overlay">
            <div className="menu_layout_logged">
              <FormMenuSetting />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
