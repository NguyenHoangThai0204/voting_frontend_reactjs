import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./HeaderHomeLoggedin.css";
import { useState, useRef } from 'react';
import { FormMenuSetting } from '../FormMenuSetting/FormMenuSetting';
import { useContext } from 'react';
import { AuthContext } from '../../../../../contextapi/AuthContext';
export const HeaderHomeLoggedin = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
        <div className="header__home_name">
          {user?.fullName}
        </div>
        <div className="header__home_icon">
          <AccountCircleIcon sx={{ fontSize: 40 }} />
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
