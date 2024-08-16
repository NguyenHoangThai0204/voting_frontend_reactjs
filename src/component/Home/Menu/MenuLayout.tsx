import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import './MenuLayout.css';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../../contextapi/AuthContext';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
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
        icon: <HomeIcon sx={{ fontSize: 18 }} />,
        name: 'Home',
        link: '/home'
      },
      {
        icon: <HowToVoteIcon sx={{ fontSize: 18 }} />,
        name: 'Vote',
        link: '/vote'
      },
      {
        icon: <LibraryBooksIcon sx={{ fontSize: 18 }} />,
        name: 'Comment',
        link: '/comment'
      },
      {
        icon: <LogoutIcon sx={{ fontSize: 18 }} />,
        name: 'Logout',
        link: '/'
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
