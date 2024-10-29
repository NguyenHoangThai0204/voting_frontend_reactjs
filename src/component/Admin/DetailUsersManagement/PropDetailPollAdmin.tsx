// import "./ContentDetailPoll.css";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import { Poll } from "../../../typeObject";
import { format } from 'date-fns';
import AssessmentIcon from '@mui/icons-material/Assessment';
import StatisticsDialogPolling from "../../Screens/StatisticsDialog/StatisticsDialogPolling";
import StatisticsDialog from "../../Screens/StatisticsDialog/StatisticsDialog";

interface PropDetailPollAdminProps {
  poll: Poll; // Nhận prop poll
}

export const PropDetailPollAdmin: React.FC<PropDetailPollAdminProps> = ({ poll }) => {
  const [choices, setChoices] = useState<string[]>(poll.options.map(() => ""));
  const [descriptions, setDescriptions] = useState<string[]>(poll.options.map(() => ""));
  const [showDescriptions, setShowDescriptions] = useState<boolean[]>(poll.options.map(() => false));

  // Định dạng thời gian bắt đầu và kết thúc
  const formattedTimeStart = poll.timeStart ? format(new Date(poll.timeStart), 'dd/MM/yyyy HH:mm') : '';
  const formattedTimeEnd = poll.timeEnd ? format(new Date(poll.timeEnd), 'dd/MM/yyyy HH:mm') : '';

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
    <div className="wrapper_detail_vote">
      <h1>DETAIL VOTE</h1>

      <form>
        <div className="header_content_form">
          <div className="header_content_detail_right">
            <div className="avatar_poll">
              <img src={poll.avatar ?? undefined} alt="upload" />
            </div>
          </div>
          <div className="header_content_detail_left">
            <div style={{ display: "flex" }}>
              <div style={{ width: "90%" }}>
                <div className="label">Name vote:</div>
                <TextField
                  className="text_namevote"
                  value={poll.title || ''}
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
              <div >
                {poll.timeEnd && new Date(poll.timeEnd).getTime() > new Date().getTime() ? (
                  <StatisticsDialogPolling open={open} handleClose={handleClose} pollId={poll._id} />
                ) : (
                  poll._id && <StatisticsDialog open={open} handleClose={handleClose} pollId={poll._id} />
                )}
              </div>
            </div>
            <div className="label">Description:</div>
            <TextField
              className="text_namevote"
              value={poll.description || ''}
              multiline
              rows={4}
              inputProps={{ readOnly: true }}
              variant="outlined"
            />
          </div>
        </div>
        <div className="label">Choices:</div>
        {
          poll.options.map((select, index) => (
            <div key={index} className="choice-wrapper">
              <TextField
                className="text_namechoice"
                variant="outlined"
                style={{ marginBottom: "10px", width: "100%", backgroundColor: "#f5f5f5" }}
                placeholder={`Choice ${index + 1}`}
                value={select.contentOption || ''}
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
            <TextField type="text" className="labelField" value={formattedTimeStart || ''} variant="outlined" />
          </div>
          <div className="date">
            <div className="label">End date:</div>
            <TextField type="text" className="labelField" value={formattedTimeEnd || ''} variant="outlined" />
          </div>
          <div className="date">
            <div className="label">Type of vote:</div>
            <TextField type="text" className="labelField" value={poll.typeContent || ''} variant="outlined" />
          </div>
        </div>
      </form>
    </div>
  )
}
