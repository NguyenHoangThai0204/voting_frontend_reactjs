import React from 'react'
import './TheNewDetailManagerment.css';
import { TheNew  } from '../../../../typeObject';
// import ReactHtmlParser from 'react-html-parser';
import { format } from 'date-fns';
import {getTheNewById, deleteTheNewById} from '../../../../api/CallApi'

interface TheNewId {
    id: string;
    onDeleted?: (id: string) => void; // Thêm callback
  }
  
  export const TheNewDetailManagerment: React.FC<TheNewId> = ({ id, onDeleted }) => {
    const [theNew, setTheNew] = React.useState<TheNew>();
  
    React.useEffect(() => {
      const fetchTheNew = async () => {
        const response = await getTheNewById(id);
        setTheNew(response.data);
      };
      fetchTheNew();
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
            <button onClick={handleClickDelete}>Delete</button>
            <button>Edit</button>
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
      </div>
    );
  };
  
