import "../ContentVote/ContentVoteForm/ContentVoteFormLayout.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, InputAdornment } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import { getVoteById, createVote } from "../../../api/CallApi"; // Giả sử bạn có hàm createVote trong CallApi
import { Poll } from "../../../typeObject";
import { useLocation } from "react-router-dom";
import { format } from 'date-fns';

export const ContentDetailVote = () => {
  const [choices, setChoices] = useState<string[]>([""]);
  const [descriptions, setDescriptions] = useState<string[]>([""]);
  const [showDescriptions, setShowDescriptions] = useState<boolean[]>([false]);
  const [image, setImage] = useState<string | null>(null);
  const location = useLocation();
  const { id } = location.state as { id: string };
  
  const [vote, setVote] = useState<Poll | null >(null);
  useEffect(() => {
    const fetchVote = async () => {
      try {
        const response = await getVoteById(id);
        setVote(response.data);
      } catch (error) {
        console.error("Error fetching vote data:", error);
      }
    };
    fetchVote();
  }, [id]);

  const formattedTimeStart = vote?.timeStart ? format(new Date(vote.timeStart), 'dd/MM/yyyy HH:mm') : '';
  const formattedTimeEnd = vote?.timeEnd ? format(new Date(vote.timeEnd), 'dd/MM/yyyy HH:mm') : '';

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }

  const handleVote = async (optionId: string) => {
    try {
      const userId = "66cbc96d367aa89344e6c0d9"; // Giả sử bạn có userId từ đâu đó
      const response = await createVote({
        pollId: id,
        optionId: optionId,
        userId: userId,
        timestamp: new Date().toISOString()
      });
      console.log('Vote success:', response.data);
    } catch (error) {
      console.error('Error voting:', error);
    }
  }

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
            <div className="label">Name vote:</div>
            <TextField 
              className="text_namevote" 
              value={vote?.title || ''} 
              inputProps={{ readOnly: true }} 
              variant="outlined" 
            />
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
              <TextField
                className="text_namechoice"
                variant="outlined"
                placeholder={`Choice ${index + 1}`}
                value={select.contentOption || ''}
                inputProps={{ readOnly: true }} 
                onClick={() => handleVote(select._id)} // Thêm sự kiện onClick để vote
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
                    style={{width:"100%", marginBottom:"10px"}}
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