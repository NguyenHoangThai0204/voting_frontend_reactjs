import { Link } from "react-router-dom";
import "./FormMenuSetting.css"
import { useContext } from "react";
import { AuthContext } from "../../../../../contextapi/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

export function FormMenuSetting() {

  const authContext = useContext(AuthContext);


  const handleListMenuSetting = (index: number) => {
    if (index === 3) {
      authContext?.logout();
    }
  }

  const listItemMenuSetting = [
    {
      icon: <CurrencyBitcoinIcon sx={{ fontSize: 18 }} />,
      name: "Connect wallet",
      link: "/"
    },
    {
      icon: <AccountCircleIcon sx={{ fontSize: 18 }} />,
      name: "Personal page",
      link: "/personal-page"
    },
    {
      icon: <SettingsIcon sx={{ fontSize: 18 }} />,
      name: "Setting",
      link: "/setting"
    },
    {
      icon: <LogoutIcon sx={{ fontSize: 18 }} />,
      name: "Log out",
      link: "/"
    }
  ];


  return (
    <div className="menu_layout_setting">
      <ul className="menu_content">
        {
          listItemMenuSetting.map((item, index) => (
            <Link to={item.link} key={index} onClick={() => handleListMenuSetting(index)} >
              <li className="menu_item">
                <div className="icon">
                  {item.icon}
                </div>
                <div className="name_setting">
                {item.name}
                </div>
              </li>
            </Link>
          ))

        }
      </ul>
    </div>
  );
}
