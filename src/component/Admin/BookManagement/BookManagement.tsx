import React from 'react'
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import './BookManagement.css';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { FormAddComment } from './FormAddComment/FormAddComment';
import { TheNew } from '../../../typeObject';
import AddIcon from '@mui/icons-material/Add';
import { getAllTheNews } from '../../../api/CallApi';
import { TheNewDetailManagerment } from './TheNewDetailManagerment/TheNewDetailManagerment';

export const BookManagement = () => {
  const [open, setOpen] = React.useState(false);
  const [listTheNew, setListTheNew] = React.useState<TheNew[]>([]);
  const [id, setId] = React.useState('');

  const handleAddClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchTheNew = async () => {
    try {
      const response = await getAllTheNews();
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setListTheNew(data);

      // Tự động đặt `id` là ID của bài viết đầu tiên (nếu có)
      if (data.length > 0) {
        setId(data[0]._id || '');
      }
    } catch (error) {
      console.log('Error fetching the news data ', error);
    }
  };

  React.useEffect(() => {
    fetchTheNew();
  }, []);

  const handleDelete = (deletedId: string) => {
    setListTheNew((prevList) => prevList.filter((item) => item._id !== deletedId));
    if (id === deletedId) setId('');
  };

  return (
    <div className="bookManagement">
      <div className="userManaLeft">
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", width: "50%" }}>
            <h3>Tìm kiếm: </h3>
          </div>
          <div>
            <AddIcon
              style={{ fontSize: "45px", color: "black", marginRight: "2px" }}
              onClick={handleAddClick}
            />
            <MenuTwoToneIcon style={{ fontSize: "45px", color: "black" }} />
          </div>
        </div>
        <table className="table table-striped" style={{ width: '100%', marginTop: "5px" }} border={1}>
          <thead>
            <tr>
              <th scope="col">Tên bài viết</th>
              <th scope="col">Chủ đề</th>
              <th scope="col">Hình ảnh</th>
            </tr>
          </thead>
          <tbody>
            {listTheNew.map((theNew) => (
              <tr
                key={theNew._id}
                className='trrow'
                onClick={() => theNew._id && setId(theNew._id)}
              >
                <td style={{ width: "40%" }}>{theNew?.tenBaiViet}</td>
                <td style={{ width: "15%" }}>{theNew.chuDeBaiViet}</td>
                <td style={{ width: "15%" }}>
                  <img
                    src={theNew?.hinhAnhBaiViet}
                    alt="avatar"
                    style={{ width: '60px', height: '60px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="userManaRight">
        {id && <TheNewDetailManagerment id={id} onDeleted={handleDelete} />}
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">
        <DialogContent>
          <FormAddComment />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
