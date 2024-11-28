import "./ContentPollFormLayout.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, InputAdornment } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DescriptionIcon from '@mui/icons-material/Description';
import { useLocation } from "react-router-dom";
// import { createPrivatePoll } from "../../../../api/CallApi"
import { createPoll, createPrivatePoll, getAICheckContent } from "../../../../api/CallApi"
import { useNavigate } from "react-router-dom";
import React from "react";
import { AuthContext } from "../../../../contextapi/AuthContext";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CircularProgress from '@mui/material/CircularProgress';

import Swal from "sweetalert2";
export const ContentPollFormLayout = () => {
  const authContext = React.useContext(AuthContext);
  const addRessWallet = authContext?.walletAddress;

  const { authorId } = useLocation().state as { authorId: string };
  const [options, setOptions] = useState<string[]>([""]);
  const [descriptionSelector, setDescriptionSelector] = useState<string[]>([""]);
  const [showDescriptions, setShowDescriptions] = useState<boolean[]>([false]);
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [typeOfVote, setTypeOfVote] = useState('');

  const [nameVote, setNameVote] = useState("");
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');


  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
    setImage(event.target.value); // Cập nhật hình ảnh với URL mới
  };

  const handleChange = (event: SelectChangeEvent) => {
    setTypeOfVote(event.target.value as string);
  };

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }

  const handleAddChoice = () => {
    setOptions([...options, ""]);
    setDescriptionSelector([...descriptionSelector, ""]);
    setShowDescriptions([...showDescriptions, false]);
  }

  const handleChoiceChangeContent = (index: number, value: string) => {
    const newChoices = [...options];
    newChoices[index] = value;
    setOptions(newChoices);
  }

  const handleDescriptionChangeContent = (index: number, value: string) => {
    const newDescriptions = [...descriptionSelector];
    newDescriptions[index] = value;
    setDescriptionSelector(newDescriptions);
  }

  const handleDeleteChoice = (index: number) => {
    const newChoices = options.filter((_, i) => i !== index);
    const newDescriptions = descriptionSelector.filter((_, i) => i !== index);
    const newShowDescriptions = showDescriptions.filter((_, i) => i !== index);
    setOptions(newChoices);
    setDescriptionSelector(newDescriptions);
    setShowDescriptions(newShowDescriptions);
  }

  const toggleDescriptionInput = (index: number) => {
    const newShowDescriptions = [...showDescriptions];
    newShowDescriptions[index] = !newShowDescriptions[index];
    setShowDescriptions(newShowDescriptions);
  }
  //
  const [loading, setLoading] = useState(false);

  const handleCreateVote = async () => {
    setLoading(true); // Bắt đầu quá trình tải
    if (!authorId || !nameVote || !description || options.length === 0 || !typeOfVote || !startDate || !endDate) {
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
      setLoading(false);
      return;
    }
    const checkNameVote = await getAICheckContent(nameVote);
    if (checkNameVote === "NEGATIVE") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tên bình chọn có từ không chuẩn mực đạo đức! Vui lòng nhập lại!',
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
      setLoading(false);
      return;
    }
    const checkDescription = await getAICheckContent(description);
    if (checkDescription === "NEGATIVE") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Miêu tả bình chọn có từ không chuẩn mực đạo đức! Vui lòng nhập lại!',
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
      setLoading(false);
      return;
    }

    const checkOptions = await Promise.all(options.map(async (option) => {
      return await getAICheckContent(option);
    }
    ));
    if (checkOptions.includes("NEGATIVE")) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Các lựa chọn có từ không chuẩn mực đạo đức! Vui lòng nhập lại!',
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
      setLoading(false);
      return;
    }

    // const checkDescriptionSelector = await Promise.all(descriptionSelector.map(async (description) => {
    //   return await getAICheckContent(description);
    // }));

    // if (checkDescriptionSelector.includes("NEGATIVE")) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Miêu tả lựa chọn có từ không chuẩn mực đạo đức! Vui lòng nhập lại!',
    //     showConfirmButton: false,
    //     timer: 1500,
    //     timerProgressBar: true,
    //     showClass: {
    //       popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
    //     },
    //     hideClass: {
    //       popup: "", // Tắt hiệu ứng biến mất
    //     },

    //   })
    //   return;
    // }


    const voteData: {
      authorId: string;
      title: string;
      description: string;
      options: {
        contentOption: string;
        additonalContentOption: string;
        descriptionContentOption: string;
        avatarContentOption: string;
        votes: never[];
      }[];
      avatar: string;
      typeContent: string;
      timeStart: string;
      timeEnd: string;
      timeCreate: string;
      pollIdSm: string | null;
    } = {
      authorId: authorId,
      title: nameVote,
      description: description,
      options: options.map((choice, index) => ({
        contentOption: choice,
        additonalContentOption: "",
        avatarContentOption: avatarUrls[index] || "",
        descriptionContentOption: descriptionSelector[index],
        votes: []
      })),
      avatar: image || "",
      typeContent: typeOfVote,
      timeStart: startDate,
      timeEnd: endDate,
      timeCreate: new Date().toISOString(),
      pollIdSm: null
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
          setLoading(false);
          return;
        }
        try {
          const reponse = await createPrivatePoll({
            title: nameVote,
            author: addRessWallet,
            options: options.map((choice) => ({
              contentOption: choice
            })),
          });
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

          if (reponse) {
            voteData.pollIdSm = reponse || null;
          }
          await createPoll(voteData);
          navigate("/poll");
        }
        catch (error) {
          console.log(error);
        }
      }
      else {
        await createPoll(voteData);
        navigate("/poll");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false); // Khi kết thúc quá trình
  };

  const [avatarUrls, setAvatarUrls] = useState<string[]>([]);

  const handleAvatarChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Lấy file ảnh từ input
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Cập nhật URL ảnh đã chọn vào avatarUrls
        const newAvatarUrls = [...avatarUrls];
        newAvatarUrls[index] = reader.result as string; // Cập nhật URL ảnh cho index tương ứng
        setAvatarUrls(newAvatarUrls); // Cập nhật trạng thái
      };
      reader.readAsDataURL(file); // Đọc file ảnh dưới dạng URL
    }
  };


  return (
    <div className={`wrapper_voteform ${loading ? "loading-active" : ""}`}>
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
          <p>Đang tải...</p>
        </div>
      ) : (
        <div className="form-container">

        </div>
      )}
      <h1>TẠO BÌNH CHỌN MỚI</h1>
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
              {image ? (
                <img src={image} alt="vote_image" />
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
            <div className="label">Tên bình chọn:</div>
            <TextField className="text_namevote" onChange={(e) => setNameVote(e.target.value)} variant="outlined" />
            <div className="label">Miêu tả:</div>
            <TextField className="text_namevote" onChange={(e) => { setDescription(e.target.value) }} multiline rows={4} variant="outlined" />
          </div>
        </div>
        <div className="label">Danh sách lựa chọn:</div>
        {
          options.map((choice, index) => (
            <div key={index} className="choice-wrapper">
              <TextField
                className="text_namechoice"
                variant="outlined"
                placeholder={`Lựa chọn ${index + 1}`}
                value={choice}
                onChange={(e) => handleChoiceChangeContent(index, e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="add description"
                        onClick={() => toggleDescriptionInput(index)}
                      >
                        <DescriptionIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="remove choice"
                        onClick={() => handleDeleteChoice(index)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {
                showDescriptions[index] && (
                  <div className="text_description">
                    <div className="avatar-wrapper-description">
                      {/* Avatar */}
                      <img
                        src={avatarUrls[index] || "https://via.placeholder.com/30"} // Avatar mặc định nếu chưa có
                        alt="avatar"
                        className="choice-avatar"
                      />
                      {/* Thêm nút thay đổi avatar */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleAvatarChange(index, e)}
                        style={{ display: 'none' }}
                        id={`avatar-upload-${index}`}
                      />
                      <label htmlFor={`avatar-upload-${index}`}>
                        <IconButton component="span" aria-label="change avatar">
                          <CameraAltIcon />
                        </IconButton>
                      </label>
                    </div>
                    <TextField
                      className="text_description_field"
                      variant="outlined"
                      placeholder={`Miêu tả lựa chọn ${index + 1}`}
                      multiline
                      style={{ width: "100%", marginBottom: "10px" }}
                      value={descriptionSelector[index]}
                      onChange={(e) => handleDescriptionChangeContent(index, e.target.value)}
                    />
                  </div>
                )
              }
            </div>
          ))
        }


        <Button variant="contained"
          onClick={handleAddChoice}
          sx={{ textTransform: 'none' }}
          color="success">Thêm lựa chọn</Button>
        <div className="form_date">
          <div className="date">
            <div className="label">Ngày bắt đầu:</div>
            <TextField type="datetime-local" onChange={(e) => { setStartDate(e.target.value) }} variant="outlined" />
          </div>
          <div className="date">
            <div className="label">Ngày kết thúc:</div>
            <TextField type="datetime-local" onChange={(e) => { setEndDate(e.target.value) }} variant="outlined" />
          </div>
          <div className="date">
            <div className="label">Kiểu bình chọn:</div>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeOfVote}
                onChange={handleChange}
              >
                <MenuItem value={"public"}>Công khai</MenuItem>
                <MenuItem value={"private"}>Riêng tư</MenuItem>
                <MenuItem value={"privatesmc"}>với smartcontract</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateVote}
            sx={{ textTransform: 'none', margin: "15px" }}
          >
            Tạo
          </Button>
        </div>
      </form>
    </div>

  )
}
