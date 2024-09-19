import "./ContentDetailPoll.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, InputAdornment } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import { getPollById, postVote } from "../../../api/CallApi";
import { Poll } from "../../../typeObject";
import { useLocation } from "react-router-dom";
import { format } from 'date-fns';
import AssessmentIcon from '@mui/icons-material/Assessment';
import StatisticsDialogPolling from "../StatisticsDialog/StatisticsDialogPolling";
import StatisticsDialog from "../StatisticsDialog/StatisticsDialog";

export const ContentDetailPoll = () => {
  const [choices, setChoices] = useState<string[]>([""]);
  const [descriptions, setDescriptions] = useState<string[]>([""]);
  const [showDescriptions, setShowDescriptions] = useState<boolean[]>([false]);
  const [image, setImage] = useState<string | null>(null);
  const location = useLocation();
  // Lấy ID từ state
  const { id } = location.state as { id: string };

  const [vote, setVote] = useState<Poll | null>(null);
  useEffect(() => {
    const fetchVote = async () => {
      try {
        const response = await getPollById(id);
        setVote(response.data);

      } catch (error) {
        console.error("Error fetching vote data:", error);
      }
    };
    fetchVote();
  }, [id]);

  const formattedTimeStart = vote?.timeStart ? format(new Date(vote.timeStart), 'dd/MM/yyyy HH:mm') : '';
  const formattedTimeEnd = vote?.timeEnd ? format(new Date(vote.timeEnd), 'dd/MM/yyyy HH:mm') : '';

  const handleVote = async (optionId: string, content: string) => {
    try {
      const voteEndDate = vote?.timeEnd ? new Date(vote.timeEnd) : null;

      if (voteEndDate && voteEndDate > new Date()) {
        const confirmVote = confirm('Bạn chọn: ' + content);
        if (confirmVote) {
          const dataVote = {
            pollId: null,
            optionId: optionId,
            transactionHash: null,
            userId: null,
            timestamp: new Date().toISOString(),
          };
          console.log(dataVote);
          await postVote(dataVote);
          alert('Thành công');
        } else {
          alert('Huỷ chọn');
        }
      } else {
        alert('Bình chọn đã kết thúc');
      }
    } catch (error) {
      console.error('Error: ' + error);
    }
  };


  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }
  const handleChoiceChangeContent = (index: number, value: string) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  }

  const handleDescriptionChangeContent = (index: number, value: string) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  }

  const handleDeleteChoice = (index: number) => {
    const newChoices = choices.filter((_, i) => i !== index);
    const newDescriptions = descriptions.filter((_, i) => i !== index);
    const newShowDescriptions = showDescriptions.filter((_, i) => i !== index);
    setChoices(newChoices);
    setDescriptions(newDescriptions);
    setShowDescriptions(newShowDescriptions);
  }

  const toggleDescriptionInput = (index: number) => {
    const newShowDescriptions = [...showDescriptions];
    newShowDescriptions[index] = !newShowDescriptions[index];
    setShowDescriptions(newShowDescriptions);
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true); // Mở modal khi nhấn vào icon
  };

  const handleClose = () => {
    setOpen(false); // Đóng modal
  };

  return (
    <div className="wrapper_voteform">
      <h1>DETAIL VOTE</h1>

      <form>
        <div className="header_content_form">
          <div className="header_content_form_right">
            <label htmlFor="upload_image_vote" className="upload_area">
              <input type="file"
                id="upload_image_vote"
                onChange={handleChangeImage}
                style={{ display: "none" }}
              />
              {
                image ?
                  (
                    <img src={image} alt="vote_image"></img>
                  ) : (
                    <Button
                      variant="contained"
                      className="upload_button"
                      component="span"
                    > Upload image</Button>
                  )
              }
            </label>
          </div>
          <div className="header_content_form_left">
            <div style={{ display: "flex" }}>
              <div style={{ width: "90%" }}>
                <div className="label">Name vote:</div>
                <TextField
                  className="text_namevote"
                  value={vote?.title || ''}
                  inputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </div>
              <div style={{ margin: "auto" }}>
                <IconButton
                  onClick={handleClickOpen}
                  aria-label="statistics"
                  style={{ transform: 'scale(1.5)' }} // Tăng kích thước nút
                >
                  <AssessmentIcon style={{ fontSize: 50 }} /> {/* Tăng kích thước icon */}
                </IconButton>
              </div>

              {/* Modal */}
              {vote?.timeEnd && new Date(vote.timeEnd).getTime() > new Date().getTime() ? (
                <StatisticsDialogPolling open={open} handleClose={handleClose} pollId={vote._id} />
              ) : (
                vote?._id && <StatisticsDialog open={open} handleClose={handleClose} pollId={vote._id} />
              )}
            </div>
            <div className="label">Description:</div>
            <TextField
              className="text_namevote"
              value={vote?.description || ''}
              multiline
              rows={4}
              inputProps={{ readOnly: true }}
              variant="outlined"
            />
          </div>
        </div>
        <div className="label">Choices:</div>
        {
          vote?.options.map((select, index) => (
            <div key={index} className="choice-wrapper">
              <p>Số lượng phiếu hiện tại {select.votes.length} </p>
              <TextField
                className="text_namechoice"
                variant="outlined"
                placeholder={`Choice ${index + 1}`}
                value={select.contentOption || ''}
                onClick={() => handleVote(select._id, select.contentOption)}
                // inputProps={{ readOnly: true }}
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
                  <TextField
                    className="text_description"
                    variant="outlined"
                    multiline
                    style={{ width: "100%", marginBottom: "10px" }}
                    value={select?.descriptionContentOption || ''}
                    onChange={(e) => handleDescriptionChangeContent(index, e.target.value)}
                  />
                )
              }
            </div>
          ))
        }

        <div className="form_date">
          <div className="date">
            <div className="label">Start date:</div>
            <TextField type="text" value={formattedTimeStart || ''} variant="outlined" />
          </div>
          <div className="date">
            <div className="label">End date:</div>
            <TextField type="text" value={formattedTimeEnd || ''} variant="outlined" />
          </div>
          <div className="date">
            <div className="label">Type of vote:</div>
            <TextField type="text" value={vote?.typeContent || ''} variant="outlined" />
          </div>

        </div>

      </form>
    </div>
  )
}