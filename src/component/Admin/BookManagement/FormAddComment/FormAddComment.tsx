import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheNew } from '../../../../api/CallApi';
import { useNavigate } from 'react-router-dom';

export const FormAddComment = () => {
    const [tenBaiViet, setTenBaiViet] = useState<string | null>(null);
    const [noiDungBaiViet, setNoiDungBaiViet] = useState<string | null>(null);
    const [chuDe, setChuDe] = useState<string | null>(null);
    const [nguoiViet] = useState('admin');
    const [hinhAnh, setHinhAnh] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [newContent, setNewContent] = useState<string>(""); // Trạng thái cho nội dung mới
    const navigate = useNavigate();

    const handleCreateTheNew = async () => {
        if (!tenBaiViet || !noiDungBaiViet || !chuDe) {
            alert("Vui lòng nhập đầy đủ thông tin bài viết");
            return;
        }

        const theNewData = {
            tenBaiViet: tenBaiViet,
            chuDeBaiViet: chuDe,
            hinhAnhBaiViet: hinhAnh || '',
            noiDungBaiViet: noiDungBaiViet,
            nguoiViet: nguoiViet,
            thoiGianViet: new Date().toISOString()
        }

        try {
            console.log(theNewData);
            await createTheNew(theNewData);
            alert("Tạo bài viết thành công");
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        setChuDe(event.target.value as string);
    };

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(event.target.value);
        setHinhAnh(event.target.value); // Cập nhật hình ảnh với URL mới
    };

    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setHinhAnh(imageUrl);
        }
    }

    // Hàm xử lý thêm nội dung vào giữa
    const handleAddContent = () => {
        if (newContent.trim()) {
            setNoiDungBaiViet(prevContent => {
                return prevContent ? `${prevContent}<p>${newContent}</p>` : `<p>${newContent}</p>`;
            });
            setNewContent(""); // Reset lại nội dung nhập vào sau khi thêm
        }
    };

    // Hàm xử lý khi nhấn Enter
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Ngăn ngừa hành động mặc định của Enter
            handleAddContent();
        }
    }

    return (
        <div className="wrapper_voteform">
            <h1>Tạo bài viết mới</h1>
            <form>
                <div className="header_content_form">
                    <div className="header_content_form_right">
                        <label htmlFor="upload_image_vote" className="upload_area">
                            <input
                                type="file"
                                id="upload_image_vote"
                                onChange={handleChangeImage}
                                style={{ display: 'none' }}
                            />
                            {hinhAnh ? (
                                <img src={hinhAnh} alt="vote_image" />
                            ) : (
                                <Button
                                    variant="contained"
                                    className="upload_button"
                                    component="span"
                                >
                                    Upload image
                                </Button>
                            )}
                        </label>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter image URL"
                                value={imageUrl || ''}
                                onChange={handleUrlChange}
                            />
                        </div>
                    </div>
                    <div className="header_content_form_left">
                        <div className="label">Tên bài viết:</div>
                        <TextField
                            className="text_namevote"
                            onChange={(e) => setTenBaiViet(e.target.value)}
                            variant="outlined"
                        />
                        <div className="label">Chủ đề:</div>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label"></InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="chuDe"
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'No label' }}
                                >
                                    <MenuItem value={"Khoa học"}>Khoa học</MenuItem>
                                    <MenuItem value={"Tạp chí"}>Tạp chí</MenuItem>
                                    <MenuItem value={"Công nghệ"}>Công nghệ</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <div className="label">Nhập nội dung theo đoạn và sau đó Enter:</div>
                        <TextField
                            className="text_namevote"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            onKeyDown={handleKeyDown}
                            variant="outlined"
                            placeholder="Nhập nội dung theo đoạn và sau đó Enter:"
                            multiline
                            rows={2}
                        />
                        <div className="label">Nội dung bài viết: </div>
                        <TextField
                            className="text_namevote"
                            value={noiDungBaiViet || ''}
                            onChange={(e) => setNoiDungBaiViet(e.target.value)}
                            multiline rows={4} variant="outlined"
                        />
                    </div>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateTheNew}
                >
                    Create
                </Button>
            </form>
        </div>
    )
}
