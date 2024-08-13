import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import './MenuLayout.css';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../../contextapi/AuthContext';

  export function MenuLayout() {
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);

    const authContext = useContext(AuthContext);

    const handleClickMenu = (index: number) => {
      setClickedIndex(index);
      
      if(itemMenu[index].name === 'Logout') {
        authContext?.logout();
      }
    }

    const itemMenu = [
      {
        icon: <HomeIcon sx={{ fontSize: 20 }} />,
        name: 'Home',
        link: '/home'
      },
      {
        icon: <SettingsIcon sx={{ fontSize: 20 }} />,
        name: 'Settings',
        link: '/settings'
      },
      {
        icon: <LogoutIcon sx={{ fontSize: 20 }} />,
        name: 'Logout',
        link: '/logout'
      }
    ];

    return (
      <div className="wrapper">
        <div className="menu">
          {itemMenu.map((item, index) => (
            <Link to={item.link} key={index} onClick={() => handleClickMenu(index)}>
              <div className={`icon_menu ${clickedIndex === index ? 'menuClick' : ''}`}>
                <div className="icon">
                  {item.icon}
                </div>
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
