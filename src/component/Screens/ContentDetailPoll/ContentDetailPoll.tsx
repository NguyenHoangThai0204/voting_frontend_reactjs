import "./ContentDetailPoll.css";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  getPollById,
  voteSm,
  postVote,
  changeState,
  postVotePrivate,
} from "../../../api/CallApi";
import { Poll } from "../../../typeObject";
import { format } from "date-fns";
import AssessmentIcon from "@mui/icons-material/Assessment";
import StatisticsDialogPolling from "../StatisticsDialog/StatisticsDialogPolling";
import StatisticsDialog from "../StatisticsDialog/StatisticsDialog";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contextapi/AuthContext";
import React from "react";

export const ContentDetailPoll: React.FC = () => {
  const [choices, setChoices] = useState<string[]>([""]);
  const [descriptions, setDescriptions] = useState<string[]>([""]);
  const [showDescriptions, setShowDescriptions] = useState<boolean[]>([false]);
  const authContext = React.useContext(AuthContext);
  const addRessWallet = authContext?.walletAddress;

  const { id } = useParams();

  const [vote, setVote] = useState<Poll | null>(null);

  useEffect(() => {
    const fetchVote = async () => {
      try {
        if (id) {
          const response = await getPollById(id);
          setVote(response.data);
        } else {
          console.error("ID is undefined");
        }
        // setVote(response.data);
      } catch (error) {
        console.error("Error fetching vote data:", error);
      }
    };
    fetchVote();
  }, [id]);

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
    try {
      if (!vote) {
        alert("Dữ liệu bình chọn không tồn tại.");
        return;
      }

      const voteEndDate = vote.timeEnd ? new Date(vote.timeEnd) : null;
      const voteStartDate = vote.timeStart ? new Date(vote.timeStart) : null;

      // Kiểm tra thời gian bình chọn
      if (voteStartDate && new Date() < voteStartDate) {
        alert("Bình chọn chưa bắt đầu.");
        return;
      }

      if (voteEndDate && new Date() > voteEndDate) {
        alert("Bình chọn đã kết thúc.");
        return;
      }

      // Xác nhận bình chọn
      const confirmVote = confirm("Bạn chọn: " + content);
      if (!confirmVote) {
        alert("Bạn đã hủy chọn.");
        return;
      }

      // Xử lý bình chọn
      if (vote.typeContent === "privatesmc") {
        // Kiểm tra ví đã kết nối
        if (!authContext?.walletAddress) {
          alert("Vui lòng kết nối ví trước khi bình chọn.");
          return;
        }

        // Kiểm tra `pollIdSm`
        if (!vote.pollIdSm) {
          console.error("pollIdSm is null");
          alert("Dữ liệu Poll không hợp lệ.");
          return;
        }

        // Thực hiện bình chọn trên smart contract
        try {
          if (addRessWallet) {
            await changeState({
              pollIdSm: Number(vote.pollIdSm),
              newState: 1,
              author: addRessWallet,
            });
          } else {
            console.error("Wallet address is null or undefined");
            alert("Lỗi kết nối ví.");
            return;
          }

          // Gửi dữ liệu bình chọn lên backend
          const dataVote = {
            pollId: vote._id,
            optionId: optionId,
            transactionHash: null,
            userId: authContext?.user?._id ?? null,
            timestamp: new Date().toISOString(),
          };

          await postVotePrivate(dataVote);
          await voteSm({
            pollIdSm: vote.pollIdSm || "",
            optionId: optionsId,
            author: addRessWallet || "",
          });

          alert("Bình chọn thành công!");
        } catch (error) {
          console.error("Error voting:", error);
          alert("Bạn đã bình chọn này rôi.");
        }
      } else if (vote.typeContent === "private") {
        try {
          if (authContext?.user) {
            const dataVote = {
              pollId: vote._id,
              optionId: optionId,
              transactionHash: null,
              userId: authContext?.user?._id ?? null,
              timestamp: new Date().toISOString(),
            };

            await postVotePrivate(dataVote);

            alert("Bình chọn thành công!");
          }
          // Gửi dữ liệu bình chọn lên backend
          else {
            alert("Bạn cần đăng nhập tài khoản.");
            return;
          }
        } catch (error) {
          console.error("Error voting:", error);
          alert("Bạn đã bình chọn này rôi.");
        }
      } else {
        // Bình chọn không sử dụng smart contract
        const dataVote = {
          pollId: vote._id,
          optionId: optionId,
          transactionHash: null,
          userId: authContext?.user?._id || null,
          timestamp: new Date().toISOString(),
        };

        try {
          await postVote(dataVote);
          alert("Bình chọn thành công!");
        } catch (error) {
          console.error("Error voting:", error);
          alert("Lỗi trong quá trình bình chọn.");
        }
      }
    } catch (error) {
      console.error("Error: " + error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
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
    <div className="wrapper_detail_vote">
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
          </div>
        </div>
        <div className="label">Lựa chọn:</div>
        {vote?.options.map((select, index) => (
          <div key={index} className="choice-wrapper">
            {/* <p>Số lượng phiếu hiện tại {select.votes.length} </p> */}
            <TextField
              className="text_namechoice"
              variant="outlined"
              style={{
                marginBottom: "10px",
                width: "100%",
                backgroundColor: "#f5f5f5",
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
              <TextField
                className="text_description"
                variant="outlined"
                multiline
                style={{ width: "100%", marginBottom: "10px" }}
                value={select?.descriptionContentOption || ""}
                onChange={(e) =>
                  handleDescriptionChangeContent(index, e.target.value)
                }
              />
            )}
          </div>
        ))}

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
              value={vote?.typeContent || ""}
              variant="outlined"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
