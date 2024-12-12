import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { updateTheNew, getTheNewById } from '../../../../api/CallApi';
import { useNavigate } from 'react-router-dom';
// import { TheNew } from '../../../../typeObject';

interface TheNewId {
  id: string;
}

export const FormUpdate: React.FC<TheNewId> = ({ id }) => {
  const [tenBaiViet, setTenBaiViet] = useState<string>('');
  const [noiDungBaiViet, setNoiDungBaiViet] = useState<string>('');
  const [chuDe, setChuDe] = useState<string>('');
  const [nguoiViet] = useState('admin');
  const [hinhAnh, setHinhAnh] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTheNew = async () => {
      try {
        const response = await getTheNewById(id);
        const data = response.data;
        setTenBaiViet(data.tenBaiViet || '');
        setNoiDungBaiViet(data.noiDungBaiViet || '');
        setChuDe(data.chuDeBaiViet || '');
        setHinhAnh(data.hinhAnhBaiViet || '');
        setImageUrl(data.hinhAnhBaiViet || '');
      } catch (error) {
        console.error('Error fetching the new:', error);
      }
    };

    fetchTheNew();


  }, [id]);

  const handleUpdateTheNew = async () => {
    if (!tenBaiViet || !noiDungBaiViet || !chuDe) {
      alert('Vui lòng nhập đầy đủ thông tin bài viết');
      return;
    }

    const theNewData = {
      tenBaiViet,
      chuDeBaiViet: chuDe,
      hinhAnhBaiViet: hinhAnh,
      noiDungBaiViet,
      nguoiViet,
      thoiGianViet: new Date().toISOString(),
    };

    try {
      await updateTheNew(id, theNewData);
      alert('Cập nhật bài viết thành công');
      navigate('/');
    } catch (error) {
      console.error('Error updating the new:', error);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setChuDe(event.target.value);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setImageUrl(url);
    setHinhAnh(url); // Cập nhật hình ảnh với URL mới
  };

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setHinhAnh(imageUrl);
    }
  };

  return (
    <div className="wrapper_voteform">
      <h1>Cập nhật bài viết</h1>
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
                value={imageUrl}
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
              value={tenBaiViet}
            />

            <div className="label">Chủ đề:</div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={chuDe}
                  onChange={handleChange}
                >
                  <MenuItem value="Khoa học">Khoa học</MenuItem>
                  <MenuItem value="Tạp chí">Tạp chí</MenuItem>
                  <MenuItem value="Công nghệ">Công nghệ</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <div className="label">Nội dung bài viết: </div>
            <TextField
              className="text_namevote"
              value={noiDungBaiViet}
              onChange={(e) => setNoiDungBaiViet(e.target.value)}
              multiline
              rows={7}
              variant="outlined"
            />
          </div>
        </div>
        <div style={{width:"100%", textAlign:'end'}}>
        <Button variant="contained" color="primary" onClick={handleUpdateTheNew}>
          Update
        </Button>
        </div>
      </form>
    </div>
  );
};
