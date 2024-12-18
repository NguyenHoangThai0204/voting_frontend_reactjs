import React, { useState } from 'react'
import './ContentCreateNewRound.css'
import { Poll } from '../../../typeObject'
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from "@mui/material";
interface ContentDetailPollProps {
    newPoll: Poll;
    onCloseDialog: () => void; // Thêm prop onCloseDialog
}
// import emailjs from '@emailjs/browser';
import { createPollWithOptions } from '../../../service/contractService';
import Swal from 'sweetalert2';
import Button from "@mui/material/Button";
import DescriptionIcon from "@mui/icons-material/Description";
import { formatISO } from 'date-fns';
import { AuthContext } from '../../../contextapi/AuthContext';
// import { createPoll, createRound, countRound, checkRound } from '../../../api/CallApi';
import { createUpdatePoll } from '../../../api/CallApi';

import { useNavigate } from "react-router-dom";
interface ContentDetailPollProps {
    newPoll: Poll;
    onCloseDialog: () => void; // Thêm prop onCloseDialog
}
export const ContentUpdatePoll = ({ newPoll, onCloseDialog }: ContentDetailPollProps) => {
    const navigate = useNavigate();
    const authContext = React.useContext(AuthContext);
    const addRessWallet = authContext?.walletAddress;
    const [showDescriptions, setShowDescriptions] = React.useState<boolean[]>([false]);

    const toggleDescriptionInput = (index: number) => {
        const newShowDescriptions = [...showDescriptions];
        newShowDescriptions[index] = !newShowDescriptions[index];
        setShowDescriptions(newShowDescriptions);
    };
    const [startDate, setStartDate] = React.useState<string | null>(null);
    const [endDate, setEndDate] = React.useState<string | null>(null);

    const handleCreateVote = async () => {
        // setLoading(true); // Bắt đầu quá trình tải


        if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
            onCloseDialog();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu!",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'swal2-popup-custom', // Tùy chỉnh class
                },
            });
            return;
        }
        if (!startDate || !endDate) {
            onCloseDialog();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng nhập đầy đủ thông tin trước khi tạo!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                showClass: {
                    popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
                },
                hideClass: {
                    popup: "", // Tắt hiệu ứng biến mất
                },
            })
            return;
        }
        const formattedStartDate = startDate ? formatISO(new Date(startDate)) : '';
        const formattedEndDate = endDate ? formatISO(new Date(endDate)) : '';

        const voteData: Poll = {
            _id: newPoll._id || '',
            authorId: newPoll.authorId,
            title: nameVote,
            description: descriptionVote,
            options: options.map(option => ({
                _id: option._id,
                contentOption: option.contentOption,
                additonalContentOption: option.additonalContentOption ?? '',
                descriptionContentOption: option.descriptionContentOption ?? '',
                avatarContentOption: option.avatarContentOption ?? '',
                votes: [], // Ensure votes is an empty array to match the expected type
            })),
            avatar: newPoll.avatar ?? '',
            typeContent: newPoll.typeContent,
            timeStart: formattedStartDate,
            timeEnd: formattedEndDate,
            timeCreate: new Date().toISOString(),
            pollIdSm: null,
            listEmailVote: newPoll.listEmailVote,
        };

        try {
            if (voteData.typeContent === "privatesmc") {
                if (!addRessWallet) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Vui lòng kết nối ví trước khi tạo!',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        showClass: {
                            popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
                        },
                        hideClass: {
                            popup: "", // Tắt hiệu ứng biến mất
                        },
                    })
                    return;
                }

                try {
                    // Tạo poll với các tùy chọn
                    const response = await createPollWithOptions(
                        nameVote,
                        options.map((choice) => ({ contentOption: choice.contentOption }))
                    );

                    if (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Tạo bình chọn thành công!',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                            showClass: {
                                popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
                            },
                            hideClass: {
                                popup: "", // Tắt hiệu ứng biến mất
                            },
                        })

                        // Tiến hành xử lý thêm thông tin vào backend sau khi poll được tạo thành công
                        if (response) {
                            voteData.pollIdSm = response.toString();
                        }
                        await createUpdatePoll(voteData);
                        navigate("/poll");
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Tạo bình chọn thất bại hoặc đã bị huỷ!',
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
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Tạo bình chọn thất bại',
                        text: 'Có lỗi xảy ra trong quá trình tạo bình chọn.',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    });
                }
            }


            else {

                await createUpdatePoll(voteData);
                navigate("/poll");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const [nameVote, setNameVote] = useState(newPoll?.title || "");
    const [descriptionVote, setDescriptionVote] = useState(newPoll?.description || "");
    const [options, setOptions] = useState(newPoll?.options || []);
    return (
        <div className="wrapper_detail_newpoll">
            <h1>Chỉnh sửa cuộc bình chọn</h1>
            <form>
                <div className="header_content_form">
                    <div className="header_content_detail_right">
                        <div className="avatar_poll">
                            <img src={newPoll?.avatar ?? undefined} alt="upload" />
                        </div>
                    </div>
                    <div className="header_content_detail_left">
                        <div style={{ display: "flex" }}>
                            <div style={{ width: "90%" }}>
                                <div className="label">Tên cuộc bình chọn:</div>
                                <TextField
                                    className="text_namevote"
                                    value={nameVote}
                                    onChange={(e) => {
                                        setNameVote(e.target.value);
                                    }}
                                    variant="outlined"
                                />
                            </div>
                        </div>
                        <div className="label">Miêu tả:</div>
                        <TextField
                            className="text_namevote"
                            value={descriptionVote}
                            multiline
                            rows={4}
                            onChange={(e) => {
                                setDescriptionVote(e.target.value);
                            }}
                            variant="outlined"
                        />
                        <div className="label">Tác giả:</div>
                    </div>
                </div>
                <div className="label">Lựa chọn:</div>
                {options.map((select, index) => (
                    <div key={index} className="choice-wrapper">
                        <TextField
                            style={{ width: "100%", marginBottom: "10px" }}
                            className="text_namechoice"
                            variant="outlined"
                            placeholder={`Choice ${index + 1}`}
                            value={select.contentOption || ""}
                            onChange={(e) => {
                                const newOptions = [...options];
                                newOptions[index].contentOption = e.target.value;
                                setOptions(newOptions);
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            aria-label="add description"
                                            onClick={(e) => {
                                                toggleDescriptionInput(index);
                                                e.stopPropagation();
                                            }}
                                        >
                                            <DescriptionIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {showDescriptions[index] && (
                            <div className="text_description">
                                <div className="avatar-wrapper-description">
                                    <img
                                        src={select.avatarContentOption || "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-19.jpg"}
                                        alt="avatar"
                                        className="choice-avatar"
                                    />
                                </div>
                                <TextField
                                    className="text_description_field"
                                    variant="outlined"
                                    multiline
                                    style={{ width: "100%", marginBottom: "10px" }}
                                    value={select?.descriptionContentOption || ""}
                                    onChange={(e) => {
                                        const newOptions = [...options];
                                        newOptions[index].descriptionContentOption = e.target.value;
                                        setOptions(newOptions);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                ))}


                <div className="form_date">
                    <div className="date">
                        <div className="label">Ngày bắt đầu:</div>
                        <TextField
                            type="datetime-local"
                            className="labelField"
                            onChange={(e) => { setStartDate(e.target.value) }}
                            variant="outlined"
                        />
                    </div>
                    <div className="date">
                        <div className="label">Ngày kết thúc:</div>
                        <TextField
                            type="datetime-local"
                            className="labelField"
                            onChange={(e) => { setEndDate(e.target.value) }}
                            variant="outlined"
                        />
                    </div>
                    <div className="date">
                        <div className="label">Kiểu bình chọn:</div>
                        <TextField
                            type="text"
                            className="labelField"
                            value={newPoll?.typeContent === "public" ? "Công khai" : newPoll?.typeContent === "private" ? "Riêng tư" : "Nâng cao"}
                            variant="outlined"
                        />
                    </div>
                </div>
            </form>
            <div style={{ display: "flex", justifyContent: "end" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateVote}
                    sx={{ textTransform: 'none', margin: "15px" }}
                >
                    Cập nhật
                </Button>
            </div>

        </div>
    )
}
