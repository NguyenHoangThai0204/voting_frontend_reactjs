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

import { createPoll, uploadImage } from "../../../../api/CallApi"
// import { createPoll, createPrivatePoll, getAICheckContent,uploadImage } from "../../../../api/CallApi"
import { useNavigate } from "react-router-dom";
import React from "react";
import { AuthContext } from "../../../../contextapi/AuthContext";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CircularProgress from '@mui/material/CircularProgress';
import emailjs from '@emailjs/browser';
import Swal from "sweetalert2";
import { formatISO } from "date-fns";
// import { createPollSm } from "../../../../service/contractService";
import { createPollWithOptions } from '../../../../service/contractService';

// import { useLocation } from "react-router-dom";
export const ContentPollFormLayout = () => {
  const authContext = React.useContext(AuthContext);
  const addRessWallet = authContext?.walletAddress;
  // const { authorId } = useLocation().state as { authorId: string } ;
  const authorId = authContext?.user?._id;
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
    const newImageUrl = event.target.value;
    setImageUrl(newImageUrl);
    setImage(newImageUrl);  // Cập nhật hình ảnh với URL mới

    // Kiểm tra xem URL có hợp lệ hay không (bạn có thể thêm logic kiểm tra URL ở đây)
    if (newImageUrl) {
      console.log('Đường dẫn ảnh đã được nhập:', newImageUrl);
    } else {
      console.error('URL không hợp lệ!');
    }
  };

  // Hàm xử lý khi người dùng chọn ảnh từ input file
  const handleChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Gọi hàm uploadImage để upload file
      const formData = new FormData();
      formData.append('file', file);
      const uploadedImageUrl = await uploadImage(formData);

      if (uploadedImageUrl) {
        setImage(uploadedImageUrl);  // Cập nhật với đường link ảnh đã upload
        setImageUrl(uploadedImageUrl); // Cập nhật URL ảnh
      } else {
        console.error('Upload ảnh không thành công');
      }
    }
  };

  const handleRemoveEmail = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Ngăn hành động mặc định của nút
    setEmails((prevEmails) => prevEmails.filter((_, i) => i !== index));
  };

  const handleChange = (event: SelectChangeEvent) => {
    setTypeOfVote(event.target.value as string);
  };
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


    // const checkNameVote = await getAICheckContent(nameVote);
    // if (checkNameVote === "NEGATIVE") {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Tên bình chọn có từ không chuẩn mực đạo đức! Vui lòng nhập lại!',
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
    //   setLoading(false);
    //   return;
    // }
    // const checkDescription = await getAICheckContent(description);
    // if (checkDescription === "NEGATIVE") {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Miêu tả bình chọn có từ không chuẩn mực đạo đức! Vui lòng nhập lại!',
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
    //   setLoading(false);
    //   return;
    // }

    // const checkOptions = await Promise.all(options.map(async (option, index) => {
    //   try {
    //     const result = await getAICheckContent(option);
    //     return { result, index, option }; // Trả về đối tượng chứa kết quả, vị trí và nội dung
    //   } catch (error) {
    //     console.error(`Error at option ${index}:`, option, error);
    //     return { result: "ERROR", index, option }; // Nếu có lỗi trong quá trình gọi getAICheckContent
    //   }
    // }));

    // // Kiểm tra nếu có bất kỳ lựa chọn nào có "NEGATIVE"
    // const negativeOption = checkOptions.find(item => item.result === "NEGATIVE");

    // if (negativeOption) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: `Lựa chọn ở vị trí ${negativeOption.index + 1} không chuẩn mực đạo đức! Nội dung: "${negativeOption.option}"`,
    //     showConfirmButton: false,
    //     timer: 2500,
    //     timerProgressBar: true,
    //     showClass: {
    //       popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
    //     },
    //     hideClass: {
    //       popup: "", // Tắt hiệu ứng biến mất
    //     },
    //   });
    //   setLoading(false);
    //   return;
    // }


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


    if (new Date(startDate) >= new Date(endDate)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu!",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      return;
    }

    const formattedStartDate = formatISO(new Date(startDate));
    const formattedEndDate = formatISO(new Date(endDate));

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
      listEmailVote: string[] | null;
    } = {
      authorId: authorId,
      title: nameVote,
      description: description,
      options: options.map((choice, index) => ({
        contentOption: choice,
        additonalContentOption: "",
        avatarContentOption: avatarItemUrls[index] || "",
        descriptionContentOption: descriptionSelector[index],
        votes: []
      })),
      avatar: image || "",
      typeContent: typeOfVote,
      timeStart: formattedStartDate,
      timeEnd: formattedEndDate,
      timeCreate: new Date().toISOString(),
      pollIdSm: null,
      listEmailVote: null
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
          // Tạo poll với các tùy chọn
          const response = await createPollWithOptions(
            nameVote,
            options.map((choice) => ({ contentOption: choice }))
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
            voteData.listEmailVote = emails;
            const responsePollCreated = await createPoll(voteData);
            const idPoll = responsePollCreated.data._id;
            sendEmails(emails, idPoll);
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

        await createPoll(voteData);
        navigate("/poll");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false); // Khi kết thúc quá trình
  };

  const [avatarItemUrls, setAvatarItemUrls] = useState<string[]>([]);

  const handleAvatarItem = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Lấy file ảnh từ input

    if (!file) {
      console.error('Không có tệp được chọn!');
      return;
    }

    try {
      // Gọi hàm uploadImage để upload file và lấy URL ảnh đã upload
      const formData = new FormData();
      formData.append('file', file);
      const uploadedImageUrl = await uploadImage(formData);

      if (uploadedImageUrl) {
        // Cập nhật URL ảnh đã upload vào avatarUrls
        const newAvatarUrls = [...avatarItemUrls];
        newAvatarUrls[index] = uploadedImageUrl; // Cập nhật URL ảnh cho index tương ứng
        setAvatarItemUrls(newAvatarUrls); // Cập nhật trạng thái
        console.log(`Avatar cho index ${index} đã được cập nhật thành công với URL: ${uploadedImageUrl}`);
      } else {
        console.error('Upload ảnh không thành công');
      }
    } catch (error) {
      console.error('Lỗi khi upload ảnh:', error);
    }
  };


  const [emails, setEmails] = useState<string[]>([]); // Lưu danh sách email
  const [inputValue, setInputValue] = useState<string>(""); // Lưu giá trị email hiện tại

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Ngăn hành động mặc định của phím Enter

      if (inputValue.trim() !== "") {
        // Kiểm tra và thêm email mới vào danh sách
        setEmails((prevEmails) => {
          const initialEmail = authContext?.user?.email;
          const newEmails = initialEmail ? [...prevEmails, initialEmail] : [...prevEmails];

          // Thêm email mới nếu chưa tồn tại
          return [...new Set([...newEmails, inputValue.trim()])]; // Đảm bảo không trùng lặp email
        });

        setInputValue(""); // Reset giá trị input
      }
    }
  };



  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const sendEmails = async (emails: string[], idPoll: string) => {
    if (emails.length === 0) {
      console.error("Danh sách email trống!");
      return;
    }
  
    console.log("Đang gửi email đến:", emails); // Kiểm tra danh sách email
  
    try {
      // Duyệt qua danh sách email và gửi email từng cái
      for (const email of emails) {
        await emailjs.send(
          "service_3km6kz9", // Service ID của bạn
          "template_rj7s5mn", // Template ID của bạn
          {
            email: email, // Email người nhận
            idPoll: idPoll, // Nội dung ID poll
            creater: authContext?.user?.fullName, // Email người tạo poll
          },
          "GZglHOpvZnbumTNEZ" // Public Key của bạn
        );
  
        console.log(`Email đã gửi thành công đến: ${email}`);
      }
      alert("Email đã được gửi đến tất cả danh sách!");
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gửi email:", error);
      alert("Đã xảy ra lỗi khi gửi email. Vui lòng thử lại sau!");
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
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '16px',
                  margin: '10px auto',
                  borderRadius: '5px',
                  border: 'none',
                }}
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
                        src={avatarItemUrls[index] || "https://via.placeholder.com/30"} // Avatar mặc định nếu chưa có
                        alt="avatar"
                        style={{maxWidth:"90%"}}
                        className="choice-avatar"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleAvatarItem(index, e)}
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
                      // style={{ width: "100%", marginBottom: "10px" }}
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
            <TextField className="textField" type="datetime-local" onChange={(e) => { setStartDate(e.target.value) }} variant="outlined" />
          </div>
          <div className="date">
            <div className="label">Ngày kết thúc:</div>
            <TextField className="textField" type="datetime-local" onChange={(e) => { setEndDate(e.target.value) }} variant="outlined" />
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
                <MenuItem value={"privatesmc"}>Nâng cao</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {typeOfVote === "privatesmc" && (
          <div>
            <div className="label">Danh sách tài khoản có email được phép vote:</div>
            <TextField
              className="text_namevote"
              variant="outlined"
              value={inputValue}
              onChange={handleChangeEmail}
              fullWidth
              onKeyPress={handleKeyPress}
              placeholder="Nhập email và nhấn Enter để thêm"
            />
            <div className="email-list" style={{ margin: '5px auto' }}>
              {emails.map((email, index) => (
                <div
                  key={index}
                  className="email-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '5px',
                    padding: '5px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    height: '50px',
                    fontSize: '18px',
                  }}
                >
                  <span>{email}</span>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "red",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                    onClick={(e) => handleRemoveEmail(index, e)} // Truyền cả index và sự kiện e
                  >
                    x
                  </button>

                </div>
              ))}
            </div>
          </div>
        )}

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