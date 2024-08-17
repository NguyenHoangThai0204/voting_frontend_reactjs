import { useState, useEffect } from 'react';
import { ItemVote } from '../ItemVote/ItemVote';
import './ListStype.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const ListVoted = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Giới hạn số mục trên mỗi trang

  const list = [
    { title: 'xin chao', description: 'sản phẩm 1' },
    { title: 'xin chao 2', description: 'sản phẩm 2' },
    { title: 'xin chao 3', description: 'sản phẩm 3' },
    { title: 'xin chao 4', description: 'sản phẩm 4' },
    { title: 'xin chao 5', description: 'sản phẩm 5' }
  ];

  // Tính toán mục hiện tại dựa trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (direction: string) => {
    if (direction === 'next' && indexOfLastItem < list.length) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === 'prev' && indexOfFirstItem > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Theo dõi kích thước màn hình và thay đổi số lượng mục trên mỗi trang
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    // Thiết lập kích thước ban đầu
    handleResize();

    // Thay đổi số lượng mục khi kích thước màn hình thay đổi
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'block', padding: '10px' }}>
      <div className='wrapper_list_vote'>
        {currentItems.map((item, index) => (
          <ItemVote key={index} item={item} />
        ))}
      </div>
      <div className='pagination'>
        <button
          onClick={() => handleClick('prev')}
          disabled={currentPage === 1}
          className='arrow-button'
        >
          <ArrowBackIosIcon />
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => handleClick('next')}
          disabled={indexOfLastItem >= list.length}
          className='arrow-button'
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};
