import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import './MenuLayout.css';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuBookIcon from '@mui/icons-material/MenuBook';
  export function MenuLayout() {

    const itemMenu = [
      {
        icon: <HomeIcon sx={{ fontSize: 18 }} />,
        name: 'Trang chủ',
        link: '/home'
      },
      {
        icon: <HowToVoteIcon sx={{ fontSize: 18 }} />,
        name: 'Bình chọn',
        link: '/poll'
      },
      {
        icon: <MenuBookIcon sx={{ fontSize: 18 }} />,
        name: 'Hướng dẫn',
        link: '/instruction'
      },
      {
        icon: <LibraryBooksIcon sx={{ fontSize: 18 }} />,
        name: 'Bài viết',
        link: '/thenew'
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
