import React, { useState, useEffect } from 'react';
import './DetailUserManagement.css';
import { User, Poll } from '../../../typeObject';
import { changeStatusUser, changeStatusUserActive, deletePoll } from '../../../api/CallApi';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { PropDetailPollAdmin } from './PropDetailPollAdmin';
import Swal from "sweetalert2";
import { format, formatDistanceToNow } from 'date-fns';
import StatisticsDialog from "../../Screens/StatisticsDialog/StatisticsDialog";


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
        try {
            const confirmDelete = confirm('Bạn có muốn ngừng hoạt động của người này không?');
            if (confirmDelete) {
                await changeStatusUser(id);
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

                refreshUserList();  // Gọi lại hàm để cập nhật danh sách người dùng
            }
        } catch (error) {
            console.error("Error deleting user data:", error);
        }
    };

    const handleActive = async (id: string) => {
        try {
            const confirmActive = confirm('Are you sure you want to activate this user?');
            if (confirmActive) {
                await changeStatusUserActive(id);
                alert('Activate user successfully');
                refreshUserList();  // Gọi lại hàm để cập nhật danh sách người dùng
            }
        } catch (error) {
            console.error("Error activating user data:", error);
        }
    };



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
        try {
            const confirmDelete = confirm('Are you sure you want to delete this poll?');
            if (confirmDelete) {
                await deletePoll(pollId);
                alert('Delete poll successfully');
                refreshUserList();  // Gọi lại hàm để cập nhật danh sách người dùng
            }
        } catch (error) {
            console.error("Error deleting poll data:", error);
        }
    };

    return (
        <div className="body_detailusermanagement">
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
                                    <label>UserId: </label>
                                    <span>{userItem ? userItem._id : 'N/A'}</span>
                                </td>
                                <td>
                                    <label>Full name: </label>
                                    <span>{userItem?.fullName}</span>
                                </td>
                            </tr>
                            <tr className="row">
                                <td>
                                    <label>Email: </label>
                                    <span>{userItem?.email}</span>
                                </td>
                                <td>
                                    <label>Phone number: </label>
                                    <span>{userItem?.phone}</span>
                                </td>
                            </tr>
                            <tr className="row">
                                <td>
                                    <label>Gender: </label>
                                    <span>{userItem?.gender}</span>
                                </td>
                                <td>
                                    <label>Birthdate: </label>
                                    <span>{formattedTimeEnd}</span>
                                </td>
                            </tr>
                            <tr className="row">
                                <td>
                                    <label>Address: </label>
                                    <span>{`${userItem?.street}, ${userItem?.ward}, ${userItem?.province}`}</span>
                                </td>
                            </tr>
                            <tr className="row">
                                <td>
                                    <label>Role: </label>
                                    <span>{userItem?.role}</span>
                                </td>
                                <td>
                                    <label>Status: </label>
                                    <span>{userItem?.status}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='button' style={{ display: "flex", justifyContent: "end", alignContent: "center" }}>
                        <button className="btn btn-primary" style={{ padding: "10px", marginRight: "8px", border: "none", fontSize: "18px", fontWeight: 500 }}>Edit user</button>
                        {userItem?.status === 'active' ? (
                            <button className="btn btn-danger" style={{ padding: "10px", border: "none", fontSize: "18px", fontWeight: 500 }} onClick={() => userItem?._id && handleDelete(userItem._id)}>Delete user</button>
                        ) : (
                            <button className="btn btn-success" style={{ padding: "10px", border: "none", fontSize: "18px", fontWeight: 500 }} onClick={() => userItem?._id && handleActive(userItem._id)}>Activate user</button>
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
                            <th scope="col">Thời gian hoạt động</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(pollItem ?? []).length === 0 ? (
                            <tr>
                                <td colSpan={7}>No data</td>
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
                                                'The end' : // Nếu thời gian kết thúc đã qua
                                                formatDistanceToNow(new Date(poll.timeEnd), { addSuffix: true }) // Nếu chưa hết thời gian
                                            : 'N/A' // Nếu không có timeEnd
                                        }
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            style={{ padding: "15px", marginRight: "5px", border: "none" }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeletePoll(poll._id);
                                            }}
                                        >Xoá</button>
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
    );
};
