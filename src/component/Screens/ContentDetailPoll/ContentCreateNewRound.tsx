import React, { useEffect , useState} from 'react'
import './ContentCreateNewRound.css'
import { Poll } from '../../../typeObject'
import TextField from '@mui/material/TextField';
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
interface ContentDetailPollProps {
  newPoll: Poll;
  onCloseDialog: () => void; // Thêm prop onCloseDialog
}
import emailjs from '@emailjs/browser';
import { createPollWithOptions } from '../../../service/contractService';
import Swal from 'sweetalert2';
import Button from "@mui/material/Button";
import DescriptionIcon from "@mui/icons-material/Description";
import { formatISO } from 'date-fns';
import { AuthContext } from '../../../contextapi/AuthContext';
// import { createPoll, createRound, countRound, checkRound } from '../../../api/CallApi';
import { createPoll, createRound, addPollToRound, findRoundPollByName, checkRound } from '../../../api/CallApi';

import { useNavigate } from "react-router-dom";
export const ContentCreateNewRound = ({ newPoll , onCloseDialog }: ContentDetailPollProps) => {
  const navigate = useNavigate();
  const authContext = React.useContext(AuthContext);
  const addRessWallet = authContext?.walletAddress;
  const [showDescriptions, setShowDescriptions] = React.useState<boolean[]>([false]);

  const handleDescriptionChangeContent = (index: number, value: string) => {
    const newOptions = [...newPoll.options];
    newOptions[index].descriptionContentOption = value;
    newPoll.options = newOptions;

  };
  const [loading, setLoading] = useState(false);

  const [roundCount, setRoundCount] = React.useState<number>(0);
  const [check, setCheck] = React.useState(false);
  useEffect(() => {
    const checkFunction = async () => {
      const check = await checkRound({
        pollId: newPoll?._id ?? "",
        roundName: newPoll?.title || "",
      });
      if (check.status === "FAIL") {
        setCheck(true);
      } else {
        setCheck(false);
      }
    }
    checkFunction();
    const fetchRoundCount = async () => {
      const response = await findRoundPollByName(newPoll.title);
      setRoundCount(response.data.idPollRound.length);
    };
    fetchRoundCount();
  }, [newPoll.title, newPoll._id, roundCount]);

  const toggleDescriptionInput = (index: number) => {
    const newShowDescriptions = [...showDescriptions];
    newShowDescriptions[index] = !newShowDescriptions[index];
    setShowDescriptions(newShowDescriptions);
  };
  const [startDate, setStartDate] = React.useState<string | null>(null);
  const [endDate, setEndDate] = React.useState<string | null>(null);
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
  const handleCreateVote = async () => {
    setLoading(true); 
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
      setLoading(false);
      return;
    }
    if ( !startDate || !endDate) {
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
      setLoading(false);
      return;
    }
    const formattedStartDate = startDate ? formatISO(new Date(startDate)) : '';
    const formattedEndDate = endDate ? formatISO(new Date(endDate)) : '';

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
      authorId: newPoll.authorId,
      title: newPoll.title,
      description: "vòng " + (roundCount + 2),
      options: newPoll.options
        .filter((option) => option.contentOption)
        .map((option) => ({
          contentOption: option.contentOption,
          additonalContentOption: option.additonalContentOption || '',
          descriptionContentOption: option.descriptionContentOption,
          avatarContentOption: option.avatarContentOption || '',
          votes: [],
        })),
      avatar: newPoll.avatar || "",
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
          onCloseDialog();
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
            customClass: {
              popup: 'swal2-popup-custom', // Tùy chỉnh class
            },
            hideClass: {
              popup: "", // Tắt hiệu ứng biến mất
            },
          })
          setLoading(false);
          return;
        }
        // await addPollToRound({
        //   pollIdOld: newPoll._id,
        //   roundName: newPoll.title,
        // });
        try {
          
          if (check) {

            console.log("Round chưa được tạo");
            await createRound({
              pollId: newPoll._id,
              roundName: newPoll?.title,
            });

            const response = await createPollWithOptions(
              newPoll.title,
              newPoll.options.map((option) => ({ contentOption: option.contentOption })),
            );
            if (response) {
              setLoading(false);
              Swal.fire({
                icon: 'success',
                title: 'Tạo bình chọn thành công!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                showClass: {
                  popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
                },
                customClass: {
                  popup: 'swal2-popup-custom', // Tùy chỉnh class
                },
                hideClass: {
                  popup: "", // Tắt hiệu ứng biến mất
                },
              })

              // Tiến hành xử lý thêm thông tin vào backend sau khi poll được tạo thành công
              if (response) {
                voteData.pollIdSm = response.toString();
              }

              const responsePollCreated = await createPoll(voteData);

              const idPoll = responsePollCreated.data._id;

              // await addPollToRound({
              //   pollIdOld: newPoll._id,
              //   pollIdNew: idPoll,
              // });

              if (newPoll.listEmailVote) {
                sendEmails(newPoll.listEmailVote, idPoll);
              }
              console.log("Round đã được tạo", idPoll);

              navigate("/poll");

            } else {
              setLoading(false);
              onCloseDialog();
              Swal.fire({
                icon: 'error',
                title: 'Tạo bình chọn thất bại hoặc đã bị huỷ!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                showClass: {
                  popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
                },
                customClass: {
                  popup: 'swal2-popup-custom', // Tùy chỉnh class
                },
                hideClass: {
                  popup: "", // Tắt hiệu ứng biến mất
                },
              });
            }
          } else {
            const response = await createPollWithOptions(
              newPoll.title,
              newPoll.options.map((option) => ({ contentOption: option.contentOption })),
            );
            if (response) {
              // Tạo poll với các tùy chọn
              await addPollToRound({
                pollIdOld: newPoll._id,
                roundName: newPoll.title,
              });
              setLoading(false);
              Swal.fire({
                icon: 'success',
                title: 'Tạo bình chọn thành công!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                showClass: {
                  popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
                },
                customClass: {
                  popup: 'swal2-popup-custom', // Tùy chỉnh class
                },
                hideClass: {
                  popup: "", // Tắt hiệu ứng biến mất
                },
              })

              // Tiến hành xử lý thêm thông tin vào backend sau khi poll được tạo thành công
              if (response) {
                voteData.pollIdSm = response.toString();
              }

              const responsePollCreated = await createPoll(voteData);

              const idPoll = responsePollCreated.data._id;

              // await addPollToRound({
              //   pollIdOld: newPoll._id,
              //   pollIdNew: idPoll,
              // });

              if (newPoll.listEmailVote) {
                sendEmails(newPoll.listEmailVote, idPoll);
              }
              console.log("Round đã được tạo", idPoll);
              setLoading(false);
              navigate("/poll");

            } else {
              onCloseDialog();
              Swal.fire({
                icon: 'error',
                title: 'Tạo bình chọn thất bại hoặc đã bị huỷ!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                showClass: {
                  popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
                },
                customClass: {
                  popup: 'swal2-popup-custom', // Tùy chỉnh class
                },
                hideClass: {
                  popup: "", // Tắt hiệu ứng biến mất
                },
              });
            }
          }


        } catch (error) {
          console.log(error);
          setLoading(false);
          onCloseDialog();
          Swal.fire({
            icon: 'error',
            title: 'Tạo bình chọn thất bại',
            text: 'Có lỗi xảy ra trong quá trình tạo bình chọn.',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'swal2-popup-custom', // Tùy chỉnh class
            },
            timerProgressBar: true,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className={`wrapper_detail_newPoll ${loading ? "loading-active" : ""}`}>
    <div className={`wrapper_detail_newpoll ${loading ? "loading-active" : ""}`}>

      {/* // <div className="wrapper_detail_newpoll">  */}
      {loading ? (
              <div className="loading-container">
                <CircularProgress />
                <p>Đang tải...</p>
              </div>
            ) : (
              <div className="form-container">
      
              </div>
            )}
      <h1>Chi tiết cuộc bình chọn</h1>
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
                  value={newPoll?.title || ""}
                  inputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </div>
            </div>
            <div className="label">Miêu tả:</div>
            <TextField
              className="text_namevote"
              value={newPoll?.description || ""}
              multiline
              rows={4}
              inputProps={{ readOnly: true }}
              variant="outlined"
            />
            <div className="label">Tác giả:</div>
          </div>
        </div>
        <div className="label">Lựa chọn:</div>
        {newPoll?.options.map((select, index) => (
          <div key={index} className="choice-wrapper">
            <TextField
              style={{ width: "100%", marginBottom: "10px" }}
              className="text_namechoice"
              variant="outlined"
              placeholder={`Choice ${index + 1}`}
              value={select.contentOption || ""}
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
                  {/* Avatar */}
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
                  onChange={(e) =>
                    handleDescriptionChangeContent(index, e.target.value)
                  }
                />
              </div>)}
          </div>
        ))
        }

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
          Tạo
        </Button>
      </div>

    </div>
  )
}
