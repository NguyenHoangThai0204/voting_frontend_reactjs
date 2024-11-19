import React, { useState } from 'react';
import './CommentLayout.css';
import { ItemComent } from './ItemComment/ItemComent';

export const CommentLayout = () => {
  // Danh sách các comment giả lập
  const comments = Array.from({ length: 6 }, (_, i) => i + 1); // 25 comments
  const itemsPerPage = 4; // Số item trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

  // Tính toán các item được hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentComments = comments.slice(indexOfFirstItem, indexOfLastItem);

  // Hàm chuyển trang
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Tạo các nút chuyển trang
  const totalPages = Math.ceil(comments.length / itemsPerPage);
  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="comemtlayout">
      {/* Left Layout */}
      <div className="commentLayoutLeft">
        {currentComments.map((comment, index) => (
          <ItemComent key={index}  />
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
