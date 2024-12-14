import "./ContentDetailPoll.css";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  getPollById,
  // voteSm,
  postVote,
  // changeState,
  postVotePrivate,
  getVoteByUserIdAndPollId,
  updateTimeEnd,
  getInforAuthor,
  checkVotePrivate,
  addPollIdToListVote,
} from "../../../api/CallApi";
import { Poll, Vote } from "../../../typeObject";
import { format } from "date-fns";
import AssessmentIcon from "@mui/icons-material/Assessment";
import StatisticsDialogPolling from "../StatisticsDialog/StatisticsDialogPolling";
import StatisticsDialog from "../StatisticsDialog/StatisticsDialog";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contextapi/AuthContext";
import React from "react";
import Swal from "sweetalert2";
import io from "socket.io-client";
import { useNavigate } from 'react-router-dom';
import { voteSmartcontract, changePollState } from "../../../service/contractService";
import CircularProgress from "@mui/material/CircularProgress";
// const socket = io("http://localhost:3000", { transports: ["websocket"] });
const socket = io("https://api-1.pollweb.io.vn", { transports: ["websocket"] });

export const ContentDetailPoll: React.FC = () => {
  const [choices, setChoices] = useState<string[]>([""]);
  const [nameAuthor, setNameAuthor] = useState<string[]>([""]);
  const [descriptions, setDescriptions] = useState<string[]>([""]);
  const [showDescriptions, setShowDescriptions] = useState<boolean[]>([false]);
  const authContext = React.useContext(AuthContext);
  const addRessWallet = authContext?.walletAddress;
  const { id } = useParams();
  const navigate = useNavigate();
  const [vote, setVote] = useState<Poll | null>(null);
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);
  const [voteSMLength, setVoteSMLength] = useState<Vote[]>([]);
  const [isVoting, setIsVoting] = useState(false);

  const fetchVote = async () => {
    try {
      if (id) {
        console.log("Fetching vote data for poll ID:", id);
        const response = await getPollById(id);
        console.log("Vote data fetched:", response.data);
        setVote(response.data);
        const authorName = (await getInforAuthor(response.data.authorId)).data.fullName;
        setNameAuthor(authorName ? [authorName] : [""]);

        if (authContext?.user?._id) {

          const responseVote = await getVoteByUserIdAndPollId({
            pollId: id,
            userId: authContext?.user?._id,
          });

          setVoteSMLength(responseVote.data as unknown as Vote[]);

          if (responseVote.data) {
            setVotedOptionId(responseVote.data.optionId);
          }
        }
      } else {
        console.error("Poll ID is undefined");
      }
    } catch (error) {
      console.error("Error fetching vote data:", error);
    }
  };


  // Tạo kết nối với server WebSocket
  useEffect(() => {

    // Lắng nghe sự kiện "voteUpdate" từ server
    socket.on("voteUpdateSL", (updatedVote) => {
      if (!updatedVote) {
        navigate("/poll");
      } else {
        fetchVote();
      }
    });

    // Gọi hàm fetchVote để lấy dữ liệu khi component mount hoặc khi id thay đổi
    if (!vote) {
      fetchVote();
    }

    // Clean up khi component unmount
    return () => {
      socket.off("voteUpdateSL")  // Đảm bảo đóng kết nối socket khi component bị unmount
    };
  });
  const formattedTimeStart = vote?.timeStart
    ? format(new Date(vote.timeStart), "dd/MM/yyyy HH:mm")
    : "";
  const formattedTimeEnd = vote?.timeEnd
    ? format(new Date(vote.timeEnd), "dd/MM/yyyy HH:mm")
    : "";

  const handleVote = async (
    optionId: string,
    content: string,
    optionsId: number
  ) => {
    setIsVoting(true);
    try {
      if (!vote) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Không tìm thấy cuộc bình chọn!",
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

        return;
      }

      const voteEndDate = vote.timeEnd ? new Date(vote.timeEnd) : null;
      const voteStartDate = vote.timeStart ? new Date(vote.timeStart) : null;

      // Kiểm tra thời gian bình chọn
      if (voteStartDate && new Date() < voteStartDate) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Bình chọn chưa bắt đầu.", showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          showClass: {
            popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
          },
          hideClass: {
            popup: "", // Tắt hiệu ứng biến mất
          },
        });

        return;
      }

      if (voteEndDate && new Date() > voteEndDate) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Bình chọn đã kết thúc.", showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          showClass: {
            popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
          },
          hideClass: {
            popup: "", // Tắt hiệu ứng biến mất
          },
        });
        setIsVoting(false);
        return;
      }

      // Xác nhận bình chọn
      const confirmVote = confirm("Bạn chọn: " + content);
      if (!confirmVote) {
        Swal.fire({
          icon: "info",
          title: "Thông tin",
          text: "Hủy bỏ bình chọn.", showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          showClass: {
            popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
          },
          hideClass: {
            popup: "", // Tắt hiệu ứng biến mất
          },
        });
        setIsVoting(false);
        return;
      }

      // Xử lý bình chọn
      if (vote.typeContent === "privatesmc") {
        try {
          if (authContext?.user) {
            if (authContext?.walletAddress) {
              if (
                vote.listEmailVote?.includes(authContext?.user?.email) === true
              ) {
                try {
                  if (voteSMLength.length === 0) {

                    await changePollState(Number(vote.pollIdSm), 1);
                  }

                  const responseCheck = await checkVotePrivate({
                    pollId: vote._id,
                    optionId: optionId,
                    transactionHash: 0,
                    userId: authContext?.user?._id ?? null,
                    timestamp: new Date().toISOString(),
                    addRessWallet: addRessWallet || "",
                  });
                  if (responseCheck.status === "OK") {
                    try {
                      const isVoteSuccessful = await voteSmartcontract(Number(vote.pollIdSm), optionsId);
                      if (isVoteSuccessful) {
                        const dataVote = {
                          pollId: vote._id,
                          optionId: optionId,
                          transactionHash: 0,
                          userId: authContext?.user?._id ?? null,
                          timestamp: new Date().toISOString(),
                          addRessWallet: null,
                        };
                        await postVotePrivate(dataVote);
                        await addPollIdToListVote({
                          pollId: vote._id,
                          id: authContext?.user?._id ?? "",
                        });
                        Swal.fire({
                          icon: "success",
                          title: "Thành công",
                          text: "Bình chọn thành công!",
                          showConfirmButton: false,
                          timer: 1500,
                          timerProgressBar: true,
                          showClass: {
                            popup: "swal2-no-animation",
                          },
                          hideClass: {
                            popup: "",
                          },
                        });
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "Thất bại",
                          text: "Bạn đã huỷ thanh toán hoặc có lỗi xảy ra trong quá trình bỏ phiếu!",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                      }
                    } catch (error) {
                      Swal.fire({
                        icon: "error",
                        title: "Thất bại",
                        text: "Đã có lỗi xảy ra trong quá trình bỏ phiếu!",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      console.error("Vote failed:", error);
                    } finally {
                      setIsVoting(false);
                    }
                  }
                  else {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Tài khoản hoặc ví này đã vote rồi.", showConfirmButton: false,
                      timer: 1500,
                      timerProgressBar: true,
                      showClass: {
                        popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
                      },
                      hideClass: {
                        popup: "", // Tắt hiệu ứng biến mất
                      },
                    });
                    setIsVoting(false);
                    return;
                  }


                } catch {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ví hoặc tài khoản này đã vote rồi.", showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    showClass: {
                      popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
                    },
                    hideClass: {
                      popup: "", // Tắt hiệu ứng biến mất
                    },
                  });
                  setIsVoting(false);
                  return;
                }
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Tài khoản có email không được cấp quyền.", showConfirmButton: false,
                  timer: 1500,
                  timerProgressBar: true,
                  showClass: {
                    popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
                  },
                  hideClass: {
                    popup: "", // Tắt hiệu ứng biến mất
                  },
                });
                setIsVoting(false);
                return;
              }
            }
            else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Chưa kết nối ví.", showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                showClass: {
                  popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
                },
                hideClass: {
                  popup: "", // Tắt hiệu ứng biến mất
                },
              });
              setIsVoting(false);
              return;
            }
          }
          // Gửi dữ liệu bình chọn lên backend
          else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Vui lòng đăng nhập để bình chọn.", showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              showClass: {
                popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
              },
              hideClass: {
                popup: "", // Tắt hiệu ứng biến mất
              },
            });
            setIsVoting(false);
            return;
          }
        } catch (error) {
          console.error("Error voting:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Bạn đã chọn trong cuộc bình chọn này rồi.", showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            showClass: {
              popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
            },
            hideClass: {
              popup: "", // Tắt hiệu ứng biến mất
            },
          });
          setIsVoting(false);
          return;

        }
      } else if (vote.typeContent === "private") {
        try {
          if (authContext?.user) {
            const dataVote = {
              pollId: vote._id,
              optionId: optionId,
              transactionHash: 0,
              userId: authContext?.user?._id ?? null,
              timestamp: new Date().toISOString(),
              addRessWallet: null,
            };
            await postVotePrivate(dataVote);
            await addPollIdToListVote({
              pollId: vote._id,
              id: authContext?.user?._id ?? null,
            });
            Swal.fire({
              icon: "success",
              title: "Thành công",
              text: "Bình chọn thành công!", showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              showClass: {
                popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
              },
              hideClass: {
                popup: "", // Tắt hiệu ứng biến mất
              },
            });
            setIsVoting(false);
          }
          // Gửi dữ liệu bình chọn lên backend
          else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Vui lòng đăng nhập để bình chọn.", showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              showClass: {
                popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
              },
              hideClass: {
                popup: "", // Tắt hiệu ứng biến mất
              },
            });
            setIsVoting(false);
            return;
          }
        } catch (error) {
          console.error("Error voting:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Bạn đã chọn trong cuộc bình chọn này rồi.", showConfirmButton: false,
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
        setIsVoting(false);
        return;

      } else {
        // Bình chọn không sử dụng smart contract
        const dataVote = {
          pollId: vote._id,
          optionId: optionId,
          transactionHash: 0,  // Gán chuỗi rỗng
          userId: authContext?.user?._id || null,
          timestamp: new Date().toISOString(),
          addRessWallet: null,
        };

        try {
          await postVote(dataVote);
          await addPollIdToListVote({
            pollId: vote._id,
            id: authContext?.user?._id ||"",
          });
          Swal.fire({
            icon: "success",
            title: "Thành công",
            text: "Bình chọn thành công!", showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            showClass: {
              popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
            },
            hideClass: {
              popup: "", // Tắt hiệu ứng biến mất
            },
          });
          setIsVoting(false);
        } catch (error) {
          console.error("Error voting:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Bạn đã chọn trong cuộc bình chọn này rồi.", showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            showClass: {
              popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
            },
            hideClass: {
              popup: "", // Tắt hiệu ứng biến mất
            },
          });
          setIsVoting(false);
        }
      }
      setIsVoting(false);
    } catch (error) {
      console.error("Error: " + error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lỗi trong quá trình bình chọn.",
        showConfirmButton: false,
        timer: 1500,
        showClass: {
          popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
        },
        hideClass: {
          popup: "", // Tắt hiệu ứng biến mất
        },
      });
      setIsVoting(false);
    }
  };

  const handleChoiceChangeContent = (index: number, value: string) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const handleDescriptionChangeContent = (index: number, value: string) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  const toggleDescriptionInput = (index: number) => {
    const newShowDescriptions = [...showDescriptions];
    newShowDescriptions[index] = !newShowDescriptions[index];
    setShowDescriptions(newShowDescriptions);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true); // Mở modal khi nhấn vào icon
  };

  const handleClose = () => {
    setOpen(false); // Đóng modal
  };

  return (
    <div className={`wrapper_detail_vote ${isVoting ? "loading-active" : ""}`}>
      {isVoting ? (
        <div className="loading-container">
          <CircularProgress />
          <p>Đang xử lý bình chọn...</p>
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
              <img src={vote?.avatar ?? undefined} alt="upload" />
            </div>
          </div>
          <div className="header_content_detail_left">
            <div style={{ display: "flex" }}>
              <div style={{ width: "90%" }}>
                <div className="label">Tên cuộc bình chọn:</div>
                <TextField
                  className="text_namevote"
                  value={vote?.title || ""}
                  inputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </div>

              <div style={{ margin: "auto" }}>
                <IconButton
                  onClick={handleClickOpen}
                  aria-label="statistics"
                  style={{ transform: "scale(1.5)" }} // Tăng kích thước nút
                >
                  <AssessmentIcon style={{ fontSize: 50 }} />{" "}
                  {/* Tăng kích thước icon */}
                </IconButton>
              </div>

              {/* Modal */}
              <div>
                {vote?.timeEnd &&
                  new Date(vote.timeEnd).getTime() > new Date().getTime() ? (
                  <StatisticsDialogPolling
                    open={open}
                    handleClose={handleClose}
                    pollId={vote._id}
                  />
                ) : (
                  vote?._id && (
                    <StatisticsDialog
                      open={open}

                      handleClose={handleClose}
                      pollId={vote._id}
                    />
                  )
                )}
              </div>
            </div>
            <div className="label">Miêu tả:</div>
            <TextField
              className="text_namevote"
              value={vote?.description || ""}
              multiline
              rows={4}
              inputProps={{ readOnly: true }}
              variant="outlined"
            />
            <div className="label">Tác giả:</div>
            <TextField
              className="text_namevote"
              value={nameAuthor || ""}
              multiline
              rows={1}
              inputProps={{ readOnly: true }}
              variant="outlined"
            />
          </div>
        </div>
        <div className="label">Lựa chọn:</div>
        {vote?.options.map((select, index) => (
          <div key={index} className="choice-wrapper">
            <TextField
              className="text_namechoice"
              variant="outlined"
              style={{
                marginBottom: "10px",
                width: "100%",
                backgroundColor: select._id === votedOptionId ? "#44fd24" : "#f5f5f5", // Màu nền đỏ nếu id trùng
                border: select._id === votedOptionId ? "2px solid #44fd24" : "none", // Đường viền đỏ nếu id trùng
              }}
              placeholder={`Choice ${index + 1}`}
              value={select.contentOption || ""}
              onClick={() =>
                handleVote(select._id, select.contentOption, index + 1)
              }
              onChange={(e) => handleChoiceChangeContent(index, e.target.value)}
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
                    src={select.avatarContentOption || "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-19.jpg"} // Avatar mặc định nếu chưa có
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
              type="text"
              className="labelField"
              value={formattedTimeStart || ""}
              variant="outlined"
            />
          </div>
          <div className="date">
            <div className="label">Ngày kết thúc:</div>
            <TextField
              type="text"
              className="labelField"
              value={formattedTimeEnd || ""}
              variant="outlined"
            />
          </div>
          <div className="date">
            <div className="label">Kiểu bình chọn:</div>
            <TextField
              type="text"
              className="labelField"
              value={vote?.typeContent === "public" ? "Công khai" : vote?.typeContent === "private" ? "Riêng tư" : "Nâng cao"}
              variant="outlined"
            />
          </div>

          {
            authContext?.user?._id && vote?.authorId === authContext?.user?._id && vote?.timeEnd && new Date(vote.timeEnd).getTime() > new Date().getTime() && (
              <div className="date">
                <button
                  className="btn_end_vote"
                  onClick={async (e) => {
                    e.preventDefault();
                    Swal.fire({
                      title: 'Xác nhận',
                      text: 'Bạn có muốn kết thúc thời cuộc bình chọn này ngây không?',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Đồng ý',
                      cancelButtonText: 'Hủy',
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        navigate("/poll");
                        await updateTimeEnd(vote._id);
                        Swal.fire({
                          icon: "success",
                          title: "Thành công",
                          text: "Kết thúc bình chọn thành công!", showConfirmButton: false,
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
                    });
                    // try {
                    //   if (vote) {
                    //     navigate("/poll");
                    //     await updateTimeEnd(vote._id);
                    //     Swal.fire({
                    //       icon: "success",
                    //       title: "Thành công",
                    //       text: "Kết thúc bình chọn thành công!", showConfirmButton: false,
                    //       timer: 1500,
                    //       timerProgressBar: true,
                    //       showClass: {
                    //         popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
                    //       },
                    //       hideClass: {
                    //         popup: "", // Tắt hiệu ứng biến mất
                    //       },
                    //     });
                    //   }

                    // } catch (error) {
                    //   console.error("Error ending vote:", error);
                    //   Swal.fire({
                    //     icon: "error",
                    //     title: "Oops...",
                    //     text: "Lỗi trong quá trình kết thúc bình chọn.",
                    //     showConfirmButton: false,
                    //     timer: 1500,
                    //     showClass: {
                    //       popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
                    //     },
                    //     hideClass: {
                    //       popup: "", // Tắt hiệu ứng biến mất
                    //     },
                    //   });
                    // }
                  }
                  }
                >
                  Kết thúc
                </button></div>)
          }

        </div>
      </form>
    </div>

  );
};
