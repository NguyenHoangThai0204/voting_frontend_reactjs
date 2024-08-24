import "./ContentVoteFormLayout.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, InputAdornment } from "@mui/material";

export const ContentVoteFormLayout = () => {

  const [choices, setChoices] = useState<string[]>([""]);
  
  const handleAddChoice = () => {
    setChoices([...choices, ""])
  }

  const handleChoiceChangeContent = (index: number, value: string) => {
    const newChoice = [...choices];
    newChoice[index] = value;
    setChoices(newChoice);
  }

  const handleDeleteChoice = (index: number) => {
    const newChoice = choices.filter((_, i) => i !== index)
    setChoices(newChoice)
  }

  return (
    <div className="wrapper_voteform">
      <h1>CREATE NEW VOTE</h1>
      <form>
        <div className="header_content_form">
          <div className="header_content_form_left">
            <div className="label">Name vote:</div>
            <TextField className="text_namevote" variant="outlined" />
            <div className="label">Description:</div>
            <TextField className="text_namevote" multiline              rows={4} variant="outlined" />
          </div>
          <div className="header_content_form_right">
            <label htmlFor="upload_image_vote" className="upload_area">
            <Button 
                variant="contained" 
                className="upload_button"
                component="span"
              > Upload image</Button>
              {/* <input
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
              />*/}
            </label>
          </div>
        </div>
        <div className="label">Choices:</div>
        {
          choices.map((choice, index) => (
            <TextField
              key={index}
              className="text_namechoice"
              variant="outlined"
              placeholder={`Choice ${index + 1} `}
              value={choice}
              onChange={(e) => handleChoiceChangeContent(index, e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="remove choice"
                      onClick={() => handleDeleteChoice(index)}
                    >
                      <CloseIcon></CloseIcon>
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          ))
        }
        <Button variant="contained"
          onClick={handleAddChoice}
          color="success">Add choice</Button>
        <div className="form_date">
          <div className="date">
            <div className="label">Start date:</div>
            <TextField type="datetime-local" variant="outlined" />
          </div>
          <div className="date">
            <div className="label">End date:</div>
            <TextField type="datetime-local" variant="outlined" />
          </div>
        </div>

      </form>
    </div>
  )
}
