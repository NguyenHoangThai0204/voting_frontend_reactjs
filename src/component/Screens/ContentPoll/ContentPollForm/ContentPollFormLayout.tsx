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
import { createPoll } from "../../../../api/CallApi"
import { useNavigate } from "react-router-dom";
import React from "react";

export const ContentPollFormLayout = () => {
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

  const handleCreateVote = async () => {
    // Kiểm tra điều kiện cho các trường bắt buộc
    if (!authorId || !nameVote || !description || options.length === 0 || !typeOfVote || !startDate || !endDate ) {  
      alert("Vui lòng nhập đầy đủ thông tin trước khi tạo phiếu bầu.");
      return;
    }

    const voteData = {
      authorId: authorId,
      title: nameVote,
      description: description,
      options: options.map((choice, index) => ({
        contentOption: choice,
        additonalContentOption: "",
        descriptionContentOption: descriptionSelector[index],
        votes: []
      })),
      avatar: image || "",
      typeContent: typeOfVote,
      timeStart: startDate,
      timeEnd: endDate,
      timeCreate: new Date().toISOString()
    }
    try {
      console.log(voteData);
      await createPoll(voteData);
      navigate("/poll");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="wrapper_voteform">
      <h1>CREATE NEW VOTE</h1>
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
            <div className="label">Name vote:</div>
            <TextField className="text_namevote" onChange={(e) => setNameVote(e.target.value)} variant="outlined" />
            <div className="label">Description:</div>
            <TextField className="text_namevote" onChange={(e) => { setDescription(e.target.value) }} multiline rows={4} variant="outlined" />
          </div>
        </div>
        <div className="label">Choices:</div>
        {
          options.map((choice, index) => (
            <div key={index} className="choice-wrapper">
              <TextField
                className="text_namechoice"
                variant="outlined"
                placeholder={`Choice ${index + 1}`}
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
                  <TextField
                    className="text_description"
                    variant="outlined"
                    placeholder={`Description for choice ${index + 1}`}
                    multiline
                    style={{ width: "100%", marginBottom: "10px" }}
                    value={descriptionSelector[index]}
                    onChange={(e) => handleDescriptionChangeContent(index, e.target.value)}
                  />
                )
              }
            </div>
          ))
        }
        <Button variant="contained"
          onClick={handleAddChoice}
          color="success">Add choice</Button>
        <div className="form_date">
          <div className="date">
            <div className="label">Start date:</div>
            <TextField type="datetime-local" onChange={(e) => { setStartDate(e.target.value) }} variant="outlined" />
          </div>
          <div className="date">
            <div className="label">End date:</div>
            <TextField type="datetime-local" onChange={(e) => { setEndDate(e.target.value) }} variant="outlined" />
          </div>
          <div className="date">
            <div className="label">Type of vote:</div>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeOfVote}
                onChange={handleChange}
              >
                <MenuItem value={"public"}>Public</MenuItem>
                <MenuItem value={"private"}>Private</MenuItem>
                <MenuItem value={"privatesmc"}>Private with smartcontract</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateVote}
        >
          Create
        </Button>
      </form>
    </div>
  )
}
