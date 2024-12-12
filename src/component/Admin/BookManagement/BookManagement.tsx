// import React from 'react'
// import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
// import './BookManagement.css';
// import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
// import { FormAddComment } from './FormAddComment/FormAddComment';
// import { TheNew } from '../../../typeObject';
// import AddIcon from '@mui/icons-material/Add';
// import { getAllTheNews } from '../../../api/CallApi';
// import { TheNewDetailManagerment } from './TheNewDetailManagerment/TheNewDetailManagerment';

// export const BookManagement = () => {
//   const [open, setOpen] = React.useState(false);
//   const [listTheNew, setListTheNew] = React.useState<TheNew[]>([]);
//   const [id, setId] = React.useState('');

//   const handleAddClick = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const fetchTheNew = async () => {
//     try {
//       const response = await getAllTheNews();
//       const data = Array.isArray(response.data) ? response.data : [response.data];
//       setListTheNew(data);

//       // Tự động đặt `id` là ID của bài viết đầu tiên (nếu có)
//       if (data.length > 0) {
//         setId(data[0]._id || '');
//       }
//     } catch (error) {
//       console.log('Error fetching the news data ', error);
//     }
//   };

//   React.useEffect(() => {
//     fetchTheNew();
//   }, []);

//   const handleDelete = (deletedId: string) => {
//     setListTheNew((prevList) => prevList.filter((item) => item._id !== deletedId));
//     if (id === deletedId) setId('');
//   };

//   return (
//     <div className="bookManagement">
//       <div className="userManaLeft">
//         <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
//           <div style={{ display: "flex", alignItems: "center", width: "50%" }}>
//             <h3>Tìm kiếm: </h3>
//           </div>
//           <div>
//             <AddIcon
//               style={{ fontSize: "45px", color: "black", marginRight: "2px" }}
//               onClick={handleAddClick}
//             />
//             <MenuTwoToneIcon style={{ fontSize: "45px", color: "black" }} />
//           </div>
//         </div>
//         <table className="table table-striped" style={{ width: '100%', marginTop: "5px" }} border={1}>
//           <thead>
//             <tr>
//               <th scope="col">Tên bài viết</th>
//               <th scope="col">Chủ đề</th>
//               <th scope="col">Hình ảnh</th>
//             </tr>
//           </thead>
//           <tbody>
//             {listTheNew.map((theNew) => (
//               <tr
//                 key={theNew._id}
//                 className='trrow'
//                 onClick={() => theNew._id && setId(theNew._id)}
//               >
//                 <td style={{ width: "40%" }}>{theNew?.tenBaiViet}</td>
//                 <td style={{ width: "15%" }}>{theNew.chuDeBaiViet}</td>
//                 <td style={{ width: "15%" }}>
//                   <img
//                     src={theNew?.hinhAnhBaiViet}
//                     alt="avatar"
//                     style={{ width: '60px', height: '60px' }}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="userManaRight">
//         {id && <TheNewDetailManagerment id={id} onDeleted={handleDelete} />}
//       </div>
//       <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">
//         <DialogContent>
//           <FormAddComment />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">Close</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };



import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import './BookManagement.css';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { FormAddComment } from './FormAddComment/FormAddComment';
import { TheNew } from '../../../typeObject';
import { getAllTheNews } from '../../../api/CallApi';
import { TheNewDetailManagerment } from './TheNewDetailManagerment/TheNewDetailManagerment';

export const BookManagement = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [listTheNew, setListTheNew] = useState<TheNew[]>([]); // Lưu danh sách bài viết
  const [id, setId] = useState<string>(''); // Lưu id bài viết được chọn
  const [theNewItem, setTheNewItem] = useState<TheNew | undefined>(); // Lưu thông tin chi tiết bài viết

  // Thiết lập id từ `location` nếu có
  useEffect(() => {
    if (location.state && location.state.id) {
      setId(location.state.id);
    }
  }, [location.state]);

  // Lấy danh sách bài viết ban đầu
  useEffect(() => {
    const fetchTheNew = async () => {
      try {
        const response = await getAllTheNews();
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setListTheNew(data);

        // Nếu không có `id` từ `location`, tự động chọn bài viết đầu tiên
        if (!id && data.length > 0) {
          const firstNew = data[0];
          setId(firstNew._id || '');
          setTheNewItem(firstNew);
        }
      } catch (error) {
        console.error('Error fetching the news data:', error);
      }
    };
    fetchTheNew();
  }); // Chạy một lần khi component mount

  // Gọi API để lấy thông tin chi tiết bài viết khi `id` thay đổi
  useEffect(() => {
    if (id) {
      const fetchNewDetail = async () => {
        try {
          const selectedNew = listTheNew.find((item) => item._id === id);
          setTheNewItem(selectedNew);
        } catch (error) {
          console.error('Error fetching the news detail:', error);
        }
      };
      fetchNewDetail();
    }
  }, [id, listTheNew]); // Chạy lại khi `id` hoặc danh sách thay đổi

  const handleAddClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = (deletedId: string) => {
    setListTheNew((prevList) => prevList.filter((item) => item._id !== deletedId));
    if (id === deletedId) {
      setId('');
      setTheNewItem(undefined);
    }
  };

  return (
    <div className="bookManagement">
      <div className="userManaLeft">
        <div style={{ display: 'flex', width: '100%', justifyContent: 'start', fontSize:'25px', fontWeight:'700'
          ,alignItems:'center' }}>
            <AddIcon
              style={{ fontSize: '40px', color: 'black', marginLeft: '5px' }}
              onClick={handleAddClick}
            />
          Tạo bài viết
        </div>
      </div>
      <div className="userManaRight">
        {id && theNewItem && (
          <TheNewDetailManagerment id={id} onDeleted={handleDelete} />
        )}
      </div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogContent>
          <FormAddComment />
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
