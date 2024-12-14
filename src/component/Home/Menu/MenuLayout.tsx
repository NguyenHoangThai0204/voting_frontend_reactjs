import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import './MenuLayout.css';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { AuthContext } from '../../../contextapi/AuthContext';
import React from 'react';

export function MenuLayout() {
  const authContext = React.useContext(AuthContext);

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

  // Kiểm tra nếu người dùng chưa đăng nhập
  const filteredMenu = authContext?.user !== null
    ? itemMenu // Nếu chưa đăng nhập, hiển thị tất cả menu
    : itemMenu.filter(item => item.name !== 'Bình chọn'); // Nếu đã đăng nhập, ẩn mục 'Bình chọn'

  return (
    <div className="wrapper_menu">
      <div className="menu">
        {filteredMenu.map((item, index) => (
          <Link to={item.link} key={index}>
            <div className="icon_menu">
              <div className="icon">
                {item.icon}
              </div>
              <div className="name">
                {item.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
