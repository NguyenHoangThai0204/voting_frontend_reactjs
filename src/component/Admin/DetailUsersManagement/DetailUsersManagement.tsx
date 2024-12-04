import React, { useState, useEffect } from 'react';
import './DetailUserManagement.css';
import { User, Poll } from '../../../typeObject';
import { changeStatusUser, changeStatusUserActive, deletePoll, updateUser,uploadImage } from '../../../api/CallApi';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { PropDetailPollAdmin } from './PropDetailPollAdmin';
import Swal from "sweetalert2";
import { format, formatDistanceToNow } from 'date-fns';
import StatisticsDialog from "../../Screens/StatisticsDialog/StatisticsDialog";

import CircularProgress from '@mui/material/CircularProgress';
interface Props {
    userItem: User | undefined;
    pollItem: Poll[] | undefined;
    refreshUserList: () => void;  // Hàm callback để cập nhật lại danh sách người dùng
}

export const DetailUsersManagement: React.FC<Props> = ({ userItem, pollItem, refreshUserList }) => {
    const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
    const [open, setOpen] = useState(false);
    // const [remainingTime, setRemainingTime] = useState<string | null>(null);
    const [isStatisticsDialog, setIsStatisticsDialog] = useState(false);
    useEffect(() => {
        console.log("Current pollItem:", pollItem);
    }, [pollItem]);

    const formattedTimeEnd = userItem?.dateOfBirth ? format(new Date(userItem.dateOfBirth), 'dd/MM/yyyy') : '';

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            Swal.fire({
                title: 'Xác nhận',
                text: 'Bạn có muốn ngừng hoạt động của người này không?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý',
                cancelButtonText: 'Hủy',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await changeStatusUser(id); // Gọi hàm thay đổi trạng thái người dùng

                    Swal.fire({
                        icon: 'success',
                        title: 'Ngừng hoạt động người dùng thành công',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        showClass: {
                            popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
                        },
                        hideClass: {
                            popup: "", // Tắt hiệu ứng biến mất
                        },
                    });

                    refreshUserList(); // Gọi lại hàm để cập nhật danh sách người dùng
                }
            });

        } catch (error) {
            console.error("Error deleting user data:", error);
        }
        setLoading(false);
    };

    const handleActive = async (id: string) => {
        setLoading(true);
        try {
            Swal.fire({
                title: 'Xác nhận',
                text: 'Bạn có muốn cho người này hoạt động lại không?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý',
                cancelButtonText: 'Hủy',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await changeStatusUserActive(id); // Gọi hàm thay đổi trạng thái người dùng

                    Swal.fire({
                        icon: 'success',
                        title: 'Cập nhật trạng thái người dùng thành công',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        showClass: {
                            popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
                        },
                        hideClass: {
                            popup: "", // Tắt hiệu ứng biến mất
                        },
                    });

                    refreshUserList(); // Gọi lại hàm để cập nhật danh sách người dùng
                }
            });

        } catch (error) {
            console.error("Error activating user data:", error);
        }
        setLoading(false);
    };

    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setSelectedPoll(null);
        setIsStatisticsDialog(false);
    };
    const handleClickOpen = (poll: Poll) => {
        // Kiểm tra thời gian kết thúc
        if (poll?.timeEnd && new Date(poll.timeEnd) < new Date()) {
            // Mở StatisticsDialog nếu cuộc bình chọn đã kết thúc
            setSelectedPoll(poll);
            setIsStatisticsDialog(true);
        } else {
            // Mở PropDetailPollAdmin nếu cuộc bình chọn chưa kết thúc
            setSelectedPoll(poll);
            setIsStatisticsDialog(false);
            setOpen(true);
        }
    };

    const handleDeletePoll = async (pollId: string) => {
        setLoading(true);
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: 'Bạn có muốn xoá cuộc bình chọn này không.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deletePoll(pollId); // Gọi hàm xóa bình chọn

                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Xoá thành công.',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    });

                    refreshUserList(); // Cập nhật danh sách người dùng
                }
            });

        } catch (error) {
            console.error("Error deleting poll data:", error);
        }
        setLoading(false);
    };
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleEditOpen = () => {
        setIsEditDialogOpen(true);
    };

    const handleEditClose = () => {
        setIsEditDialogOpen(false);
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
    
            // Làm mới danh sách người dùng
            refreshUserList();
    
            // Đóng dialog
            handleEditClose();
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin người dùng:', error);
            Swal.fire('Thất bại', 'Cập nhật thông tin không thành công!', 'error');
        }
    };
    const [avatar, setAvatar] = useState<string | null>(null);
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

    return (
        <>
            <div className={`body_detailusermanagement ${loading ? "loading-active" : ""}`}>
                {loading ? (
                    <div className="loading-container">
                        <CircularProgress />
                        <p>Đang tải...</p>
                    </div>
                ) : (
                    <div className="form-container">

                    </div>
                )}
                {/* <div className="body_detailusermanagement"> */}
                <Dialog
  open={isEditDialogOpen}
  onClose={handleEditClose}
  maxWidth="sm"
  fullWidth
  style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}
>
  <DialogContent>
    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
      Sửa Thông Tin Người Dùng
    </h3>
    <form id="editUserForm">
      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Họ và Tên</label>
        <input
          type="text"
          className="form-control"
          defaultValue={userItem?.fullName}
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
          defaultValue={userItem?.email}
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
          defaultValue={userItem?.phone}
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
          defaultValue={`${userItem?.street}, ${userItem?.ward}, ${userItem?.province}`}
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
      onClick={() => handleEditSubmit(userItem?._id || '')}
      color="primary"
      style={{ padding: '10px 20px', fontSize: '1rem', borderRadius: '4px' }}
    >
      Lưu
    </Button>
  </DialogActions>
</Dialog>


                <h2>THÔNG TIN NGƯỜI DÙNG</h2>
                <div className="container">
                    <div className="containLeft">
                        <div className="containLeftBottom">
                            <img src={userItem?.avatar} alt="avatar" style={{ height: '250px', width: '250px' }} className="avatar" />
                        </div>
                    </div>
                    <div className="containRight">
                        <table style={{ width: "100%", height: "100%", textAlign: "start" }}>
                            <tbody>
                                <tr className="row">
                                    <td>
                                        <label>Mã người dùng: </label>
                                        <span>{userItem ? userItem._id : 'N/A'}</span>
                                    </td>
                                    <td>
                                        <label>Họ và tên: </label>
                                        <span>{userItem?.fullName}</span>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <td>
                                        <label>Email: </label>
                                        <span>{userItem?.email}</span>
                                    </td>
                                    <td>
                                        <label>Số điện thoại: </label>
                                        <span>{userItem?.phone}</span>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <td>
                                        <label>Giới tính: </label>
                                        <span>{userItem?.gender}</span>
                                    </td>
                                    <td>
                                        <label>Ngày sinh: </label>
                                        <span>{formattedTimeEnd}</span>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <td>
                                        <label>Địa chỉ: </label>
                                        <span>{`${userItem?.street}, ${userItem?.ward}, ${userItem?.province}`}</span>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <td>
                                        <label>Quyền: </label>
                                        <span>{userItem?.role}</span>
                                    </td>
                                    <td>
                                        <label>Trạng thái: </label>
                                        <span>{
                                            userItem?.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'
                                            }</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='button' style={{ display: "flex", justifyContent: "end", alignContent: "center" }}>
                            <button
                                className="btn btn-primary"
                                style={{ padding: "10px", marginRight: "8px", border: "none", fontSize: "18px", fontWeight: 500 }}
                                onClick={handleEditOpen}
                            >
                                Sửa thông tin
                            </button>
                            {userItem?.status === 'active' ? (
                                <button className="btn btn-danger" style={{ padding: "10px", border: "none", fontSize: "18px", fontWeight: 500 }} onClick={() => userItem?._id && handleDelete(userItem._id)}>Dừng hoạt động</button>
                            ) : (
                                <button className="btn btn-success" style={{ padding: "10px", border: "none", fontSize: "18px", fontWeight: 500 }} onClick={() => userItem?._id && handleActive(userItem._id)}>Cho hoạt động</button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="listPoll">
                    <h2>Danh sách cuộc bình chọn</h2>
                    <table className="table table-striped" style={{ width: '100%', marginTop: "5px" }} border={1}>
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Miêu tả</th>
                                <th scope="col">Bắt đầu</th>
                                <th scope="col">Kết thúc</th>
                                <th scope="col">Hoạt động</th>
                                <th scope="col">Loại</th>
                                <th scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(pollItem ?? []).length === 0 ? (
                                <tr>
                                    <td colSpan={8}>No data</td>
                                </tr>
                            ) : (
                                (pollItem ?? []).map((poll, index) => (
                                    <tr key={poll?._id || index} onClick={() => handleClickOpen(poll)}>
                                        <td style={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}>{index + 1}</td>
                                        <td style={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}>
                                            {poll?.title || 'N/A'}</td>
                                        <td style={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}>
                                            {poll?.description || 'N/A'}
                                        </td>
                                        <td style={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}>
                                            {poll?.timeStart ? format(new Date(poll.timeStart), 'dd/MM/yyyy HH:mm:ss') : 'N/A'}
                                        </td>
                                        <td style={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}>
                                            {poll?.timeEnd ? format(new Date(poll.timeEnd), 'dd/MM/yyyy HH:mm:ss') : 'N/A'}
                                        </td>
                                        <td style={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}>
                                            {poll?.timeEnd ?
                                                // Kiểm tra nếu thời gian kết thúc đã qua
                                                new Date(poll.timeEnd) < new Date() ?
                                                    'Kết thúc' : // Nếu thời gian kết thúc đã qua
                                                    formatDistanceToNow(new Date(poll.timeEnd), { addSuffix: true }) // Nếu chưa hết thời gian
                                                : 'N/A' // Nếu không có timeEnd
                                            }
                                        </td>
                                        <td>
                                            {poll.typeContent}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                style={{ padding: "15px", marginRight: "5px", border: "none" }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeletePoll(poll._id);
                                                }}
                                            >Xoá bình chọn</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
                {isStatisticsDialog && selectedPoll ? (
                    <StatisticsDialog open={true} handleClose={handleClose} pollId={selectedPoll._id} />
                ) : (
                    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
                        <DialogContent>
                            {selectedPoll && <PropDetailPollAdmin poll={selectedPoll} />}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Close</Button>
                        </DialogActions>
                    </Dialog>
                )}
            </div>
        </>
    );
};
