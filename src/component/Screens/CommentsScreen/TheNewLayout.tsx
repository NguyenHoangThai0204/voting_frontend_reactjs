import React, { useState, useEffect } from 'react';
import './CommentLayout.css';
import { ItemComent } from './ItemComment/ItemComent';
import { TheNew } from '../../../typeObject';
import { getAllTheNews } from '../../../api/CallApi';

export const TheNewLayout = () => {
  const itemsPerPage = 2; // Số lượng item trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [listNew, setListNew] = useState<TheNew[]>([]);

  // Tính toán các item được hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listNew.slice(indexOfFirstItem, indexOfLastItem);

  // Hàm chuyển trang
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Tạo các nút chuyển trang
  const totalPages = Math.ceil(listNew.length / itemsPerPage);
  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchTheNew = async () => {
      try {
        const response = await getAllTheNews();
        setListNew(Array.isArray(response.data) ? response.data : [response.data]);
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching the news data', error);
      }
    };
    fetchTheNew();
  }, []);

  return (
    <div className="comemtlayout">
      {/* Left Layout */}
      <div className="commentLayoutLeft">
        {/* Hiển thị các item hiện tại */}
        {currentItems.map((item, index) => (
          <ItemComent key={index} theNew={item}/>
        ))}

        {/* Phần phân trang */}
        <div className="pagination">
          {paginationButtons.map((page) => (
            <button
              key={page}
              className={page === currentPage ? 'active' : ''}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* Right Layout */}
      <div className="commentLayoutRight">
        <p>Right Content</p>
      </div>
    </div>
  );
};
