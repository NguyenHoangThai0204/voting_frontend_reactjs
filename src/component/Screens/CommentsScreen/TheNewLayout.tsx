import React, { useState, useEffect } from 'react';
import './TheNewLayout.css';
import { ItemComent } from './ItemComment/ItemComent';
import { TheNew } from '../../../typeObject';
import { getAllTheNews, getTheNewById } from '../../../api/CallApi';
import { Dialog, DialogContent, CircularProgress } from '@mui/material';
// import { Dialog, DialogTitle, DialogContent, CircularProgress } from '@mui/material';
import './TheNewPage.css';

export const TheNewLayout = () => {
  const itemsPerPage = 5; // Số lượng item trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [listNew, setListNew] = useState<TheNew[]>([]);
  const [selectedNew, setSelectedNew] = useState<TheNew | null>(null); // Bài viết được chọn
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Trạng thái Dialog
  const [isLoading, setIsLoading] = useState(false); // Trạng thái Loading

  // Tính toán các item được hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listNew.slice(indexOfFirstItem, indexOfLastItem);

  // Hàm chuyển trang
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchTheNew = async () => {
      try {
        const response = await getAllTheNews();
        setListNew(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (error) {
        console.log('Error fetching the news data', error);
      }
    };
    fetchTheNew();
  }, []);

  // Hàm mở Dialog và lấy chi tiết bài viết
  const handleOpenDialog = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await getTheNewById(id);
      setSelectedNew(response.data);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error fetching news by ID:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm đóng Dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedNew(null);
  };

  return (
    <div className="comemtlayout">
      {/* Left Layout */}
      <div className="commentLayoutLeft">
        {/* Hiển thị các item hiện tại */}
        {currentItems.map((item) => (
          <div
            key={item._id}
            onClick={() => item._id && handleOpenDialog(item._id)}
            style={{ cursor: 'pointer' }}
          >
            <ItemComent theNew={item} />
          </div>
        ))}

        {/* Phần phân trang */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(listNew.length / itemsPerPage) }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                className={page === currentPage ? 'active' : ''}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>
      </div>

      {/* Right Layout */}
      <div className="commentLayoutRight">
        <p>Right Content</p>
      </div>

      {/* Dialog hiển thị chi tiết bài viết */}
      <Dialog
  open={isDialogOpen}
  onClose={handleCloseDialog}
  maxWidth={false} // Thay đổi maxWidth để tăng kích thước
  fullWidth
  PaperProps={{
    style: {
      maxWidth: '1200px', // Tùy chỉnh chiều rộng tối đa
      width: '90%', // Đảm bảo dialog chiếm 90% chiều ngang màn hình
      margin:'10px'
    },
  }}
>
  {isLoading ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    <>
      {/* <DialogTitle>Chi Tiết Bài Viết</DialogTitle> */}
      <DialogContent
        sx={{padding: '10px'}}
      >
        {selectedNew && (
          <div className="the_new_page">
            <h2>{selectedNew.tenBaiViet}</h2>
            <div className="row">
              <div className="item">
                <p>Chủ đề: {selectedNew.chuDeBaiViet}</p>
              </div>
              <div className="item">
                <p>
                  Ngày đăng:{' '}
                  {selectedNew.thoiGianViet
                    ? new Date(selectedNew.thoiGianViet).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </div>
            <div className="row">
              <div className='left'>
                <img
                  src={selectedNew.hinhAnhBaiViet}
                  alt="Hình ảnh bài viết"
                />
              </div>
              <div className='right'>
                <p
                  dangerouslySetInnerHTML={{
                    __html: selectedNew.noiDungBaiViet || '',
                  }}
                ></p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </>
  )}
</Dialog>

    </div>
  );
};
