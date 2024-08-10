import { BrowserRouter as Router,  Link } from 'react-router-dom';
import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import './MenuLayout.css';

export function MenuLayout() {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleClickMenu = (index: number) => {
    setClickedIndex(index);
  }

  const itemMenu = [
    {
      icon: <HomeIcon sx={{ fontSize: 40 }} />,
      name: 'Home',
      link: '/home'
    },
    {
      icon: <SettingsIcon sx={{ fontSize: 40 }} />,
      name: 'Settings',
      link: '/settings'
    }
  ];

  return (
    <Router>
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
    </Router>
  );
}

