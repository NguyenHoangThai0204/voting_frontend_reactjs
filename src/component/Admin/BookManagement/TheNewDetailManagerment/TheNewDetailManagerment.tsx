import React from 'react'
import './TheNewDetailManagerment.css';
import { TheNew  } from '../../../../typeObject';
// import ReactHtmlParser from 'react-html-parser';
import { format } from 'date-fns';
import {getTheNewById, deleteTheNewById} from '../../../../api/CallApi'
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { FormUpdate } from '../FormUpdateThenew/FormUpdate';
import io from 'socket.io-client';
const socket = io("https://api-1.pollweb.io.vn", { transports: ['websocket'] });
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

interface TheNewId {
    id: string;
    onDeleted?: (id: string) => void; // Thêm callback
  }
  
  export const TheNewDetailManagerment: React.FC<TheNewId> = ({ id, onDeleted }) => {
    const [theNew, setTheNew] = React.useState<TheNew>();
    const [open, setOpenUpdate] = React.useState(false);

    const handleAddClick = () => setOpenUpdate(true);
    const handleClose = () => setOpenUpdate(false);
    React.useEffect(() => {
      const fetchTheNew = async () => {
        const response = await getTheNewById(id);
        setTheNew(response.data);
      };
      fetchTheNew();
      if(socket){
        socket.on('updateThenew', () => {
          fetchTheNew();
        });
      }
    }, [id]);
  
    const formatTime = theNew?.thoiGianViet
      ? format(new Date(theNew.thoiGianViet), 'dd/MM/yyyy')
      : '';
  
    const handleClickDelete = async () => {
      try {
        const confirmDelete = confirm("Bạn có muốn xoá bài viết này không?");
        if (confirmDelete) {
          await deleteTheNewById(id);
          alert("Xoá thành công");
          if (onDeleted) onDeleted(id); // Gọi callback để cập nhật danh sách
        }
      } catch (error) {
        console.log("Lỗi quá trình xoá: ", error);
      }
    };
  
    return (
      <div className="body_detailthenewmanagement">
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <h2>CHI TIẾT BÀI VIẾT</h2>
          </div>
          <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "end" }}>
            <button onClick={handleClickDelete}
            style={{
              width:"25%",
              padding: "12px",  // Điều chỉnh padding cho phù hợp
              marginRight: "10px",  // Cách lề phải thêm chút để không bị sát nhau
              border: "none",
              borderRadius: "5px",  // Bo góc cho button
              display: "flex",  // Sử dụng flexbox để căn chỉnh icon và chữ
              alignItems: "center",  // Căn giữa icon và text
              gap: "5px",  // Khoảng cách giữa icon và chữ
              backgroundColor: "#dc3545",  // Màu đỏ cho nút Xoá bình chọn
              color: "white"  // Màu chữ trắng để nổi bật trên nền đỏ
     // Màu hover cho nút Xoá bình chọn
          }}
            ><DeleteOutlineIcon />Xoá bài viết</button>

            <button
              style={{width:"25%",
                padding: "12px", marginRight: "8px", border: "none", fontSize: "18px", fontWeight: 700, display: "flex",  // Sử dụng flexbox để căn chỉnh icon và chữ
                alignItems: "center",  // Căn giữa icon và text
                gap: "5px",
                color: "white",
                backgroundColor: "#007bff"
            }}
              onClick={handleAddClick}
            ><LibraryBooksIcon />Sửa bài viết</button>
          </div>
        </div>
        <h2>{theNew?.tenBaiViet}</h2>
        <div className="row">
          <div className='item'>
            <p>Chủ đề: </p>
            <p>{theNew?.chuDeBaiViet}</p>
          </div>
          <div className='item'>
            <p>Ngày đăng: </p>
            <p>{formatTime}</p>
          </div>
        </div>
        <div className="row">
          <div style={{ width: "31%" }}>
            <img src={theNew?.hinhAnhBaiViet} alt="upload" />
          </div>
          <div style={{ width: "68%", textAlign: "justify" }}>
            <p dangerouslySetInnerHTML={{ __html: theNew?.noiDungBaiViet || '' }}></p>
          </div>
        </div>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogContent>
          <FormUpdate id={id} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  };
  
