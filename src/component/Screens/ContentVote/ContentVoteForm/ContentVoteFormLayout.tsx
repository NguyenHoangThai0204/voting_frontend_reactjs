import "./ContentVoteFormLayout.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, InputAdornment } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const ContentVoteFormLayout = () => {

  const [choices, setChoices] = useState<string[]>([""]);
  const [image, setImage] = useState<string | null>(null);
  const [typeOfVote, setTypeOfVote] = useState('');

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
            <TextField className="text_namevote" multiline rows={4} variant="outlined" />
          </div>
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
                    <img
                      src={image}
                    ></img>
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
          <div className="date">
          <div className="label">Type of vote:</div>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeOfVote}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={"public"}>Public</MenuItem>
                <MenuItem value={"private"}>Private</MenuItem>
                <MenuItem value={"privatesmc"}>Private with smartcontract</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

      </form>
    </div>
  )
}
