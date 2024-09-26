import { useContext } from 'react';
import { AuthContext } from '../../../contextapi/AuthContext';
import './ContentInformation.css';
import Button from '@mui/material/Button';

import { useState } from 'react';

const ContenInformation = () => {
  const authContext = useContext(AuthContext);
  const [image, setImage] = useState<string | null>(null);

  if (!authContext) {
    return <p>Loading...</p>;
  }

  const { user, isLogged } = authContext;

  if (!isLogged) {
    return <p>Please log in to see user information.</p>;
  }

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }

  return (
    <div>
      <h1>User Information</h1>
      {user ? (
        <div className='contentinformation'>
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
          <div className='infor'>
            <p><strong>ID:</strong> {user._id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>FullName:</strong> {user.fullName}</p>
            <p><strong>Address: </strong> {user.street},  {user.ward},  {user.district},  {user.province}</p>

          </div>
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default ContenInformation;
