import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contextapi/AuthContext';
import './ContentInformation.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Swal from "sweetalert2";
import { updateUser, uploadImage } from '../../../api/CallApi';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';


// 
const ContenInformation = () => {
  const authContext = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  if (!authContext) {
    return <p>Loading...</p>;
  }

  const { user, isLogged } = authContext;

  if (!isLogged) {
    return <p>Please log in to see user information.</p>;
  }

  const handleChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Gọi hàm uploadImage để upload file
      const formData = new FormData();
      formData.append('file', file);
      const uploadedImageUrl = await uploadImage(formData);

      if (uploadedImageUrl) {
        setAvatar(uploadedImageUrl);
      } else {
        console.error('Upload ảnh không thành công');
      }
    }
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };
  const handleEditSubmit = async (userId: string) => {
    try {
      // Lấy giá trị từ các trường nhập liệu
      const fullName = (document.getElementById('fullName') as HTMLInputElement).value;
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const phone = (document.getElementById('phone') as HTMLInputElement).value;
      const address = (document.getElementById('address') as HTMLInputElement).value;

      // Kiểm tra dữ liệu đầu vào (nếu cần)
      if (!fullName || !email || !phone || !address) {
        Swal.fire('Lỗi', 'Vui lòng điền đầy đủ thông tin!', 'error');
        return;
      }

      // Tách địa chỉ thành các phần
      const addressParts = address.split(',').map((item) => item.trim());
      if (addressParts.length !== 3) {
        Swal.fire('Lỗi', 'Địa chỉ không hợp lệ. Vui lòng nhập theo định dạng: Đường, Phường, Tỉnh!', 'error');
        return;
      }
      const [street, ward, province] = addressParts;

      // Chuẩn bị đối tượng gửi API
      const updatedUser = {
        _id: userId,
        fullName: fullName,
        email: email,
        phone: phone,
        street: street,
        ward: ward,
        province: province,
        avatar: avatar || undefined,
      };

      console.log('Data chuẩn bị gửi:', updatedUser);

      // Gửi API cập nhật
      await updateUser(updatedUser);


      // Thông báo thành công
      Swal.fire('Thành công', 'Cập nhật thông tin người dùng thành công!', 'success');

      // Đóng dialog
      handleEditClose();
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin người dùng:', error);
      Swal.fire('Thất bại', 'Cập nhật thông tin không thành công!', 'error');
    }
  };

  return (
    <div>
      {isEditing &&
        <Dialog
          open={isEditing}
          maxWidth="lg"
          fullWidth
          style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}
        >
          <DialogContent>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
              Sửa Thông Tin
            </h3>
            <form id="editUserForm_infor" style={{margin:0, width:'100%', padding:'5px'}}>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Họ và Tên</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={user?.fullName}
                  id="fullName"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Email</label>
                <input
                  type="email"
                  className="form-control"
                  defaultValue={user?.email}
                  id="email"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={user?.phone}
                  id="phone"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Địa chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={`${user?.street}, ${user?.ward}, ${user?.province}`}
                  id="address"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                />
              </div>
              {/* Thêm trường ảnh đại diện */}
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Ảnh Đại Diện</label>
                <input
                  type="file"
                  className="form-control"
                  id="avatar"
                  accept="image/*"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                  onChange={handleChangeImage}
                />
              </div>
            </form>
          </DialogContent>
          <DialogActions style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button onClick={handleEditClose} color="secondary" style={{ padding: '10px 20px', fontSize: '1rem', borderRadius: '4px' }}>
              Hủy
            </Button>
            <Button
              onClick={() => handleEditSubmit(user?._id || '')}
              color="primary"
              style={{ padding: '10px 20px', fontSize: '1rem', borderRadius: '4px' }}
            >
              Lưu
            </Button>
          </DialogActions>
        </Dialog>}
      
      <h1 style={{marginTop: '20px', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold'
      }}> Thông tin người dùng</h1>
      {user ? (
        <div className='contentinformation'>
          <div className="header_content_form_right">
            <label htmlFor="upload_image_vote" className="upload_area">
              <input type="file"
                id="upload_image_vote"
                onChange={handleChangeImage}
                style={{ display: "none" }}
              />
              {
                user?.avatar || avatar ?
                  (
                    <img src={user?.avatar} alt="avatar" className="avatar" />
                  ) : (
                    <Button
                      variant="contained"
                      className="upload_button"
                      component="span"
                    > Upload image</Button>
                  )
              }
            </label>
          </div>
          <div className='infor'>
            <table style={{ width: "100%", height: "100%", textAlign: "start" }}>
              <tbody>
                <tr className="row">
                  <td>
                    <label>Mã người dùng: </label>
                    <span>{user ? user._id : 'N/A'}</span>
                  </td>
                </tr>
                <tr className="row">
                  <td>
                    <label>Họ và tên: </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                      />
                    ) : (
                      <span>{user?.fullName}</span>
                    )}
                  </td>
                </tr>
                <tr className="row">
                  <td>
                    <label>Email: </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="email"
                      />
                    ) : (
                      <span>{user?.email}</span>
                    )}
                  </td>
                </tr>
                <tr className="row">
                  <td>
                    <label>Số điện thoại: </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                      />
                    ) : (
                      <span>{user?.phone}</span>
                    )}
                  </td>
                </tr>
                <tr className="row">
                  <td>
                    <label>Địa chỉ: </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                      />
                    ) : (
                      <span>{`${user?.street}, ${user?.ward}, ${user?.province}`}</span>
                    )}
                  </td>
                </tr>
                <tr className="row">
                  <td>
                    <label>Role: </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="role"
                      />
                    ) : (
                      <span>{user?.role}</span>
                    )}
                  </td>
                </tr>
                <tr className="row">
                  <td>
                    <label>Trạng thái: </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="status"
                      />
                    ) : (
                      <span>{user?.status === 'active' ? "Đang hoạt động" : "Đã bị khoá"}</span>
                    )}
                  </td>
                </tr>
              </tbody>
              <div className='button'>
                <>
                  <button className="btn btn-primary"
                    onClick={() => setIsEditing(true)}
                    style={{
                      padding: "10px", marginRight: "8px", border: "none", fontSize: "18px", fontWeight: 500, display: "flex",  // Sử dụng flexbox để căn chỉnh icon và chữ
                      alignItems: "center",  // Căn giữa icon và text
                      gap: "5px",
                      color: "white",
                      backgroundColor: "#007bff"
                  }}
                  ><LibraryBooksIcon />Sửa thông tin</button>

                </>

              </div>
            </table>
          </div>
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default ContenInformation;