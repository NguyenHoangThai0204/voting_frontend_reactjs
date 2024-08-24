import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import './MenuLayout.css';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
  export function MenuLayout() {

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
      }
    ];
    return (
      <div className="wrapper_menu">
        <div className="menu">
          {itemMenu.map((item, index) => (
            <Link to={item.link} key={index}>
              <div className={`icon_menu `}>
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
