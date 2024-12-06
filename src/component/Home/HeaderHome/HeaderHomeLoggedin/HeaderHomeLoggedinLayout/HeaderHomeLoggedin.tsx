import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./HeaderHomeLoggedin.css";
import { useState, useRef } from 'react';
import { FormMenuSetting } from '../FormMenuSetting/FormMenuSetting';
import { useContext } from 'react';
import { AuthContext } from '../../../../../contextapi/AuthContext';
import React from 'react';
import { useEffect } from 'react';

export const HeaderHomeLoggedin = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const [showMenu, setShowMenu] = useState(false);
  const [isOnline, setIsOnline] = useState(true); // Trạng thái online mặc định là true
  const menuRef = useRef<HTMLDivElement>(null);

  // Hàm xử lý trạng thái online (giả sử từ API hoặc context)
  useEffect(() => {
    // Giả sử lấy trạng thái online từ server hoặc context
    setIsOnline(true); // Hoặc logic thực tế của bạn
  }, []);

  const handleMouseEnter = () => {
    setShowMenu(true);
  };

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
        <div className="header__home_name">{user?.fullName}</div>
        <div className="header__home_icon">
          {user?.avatar ? (
            <img src={user?.avatar} alt="User Avatar" />
          ) : (
            <AccountCircleIcon sx={{ fontSize: 40 }} />
          )}
          {isOnline && <span className="status-indicator"></span>} {/* Chỉ hiển thị khi online */}
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
