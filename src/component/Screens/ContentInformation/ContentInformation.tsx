import { useContext, useState } from 'react';
import { AuthContext } from '../../../contextapi/AuthContext';
import './ContentInformation.css';
import Button from '@mui/material/Button';

const ContenInformation = () => {
  const authContext = useContext(AuthContext);
  const [image, setImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    role: '',
    status: ''
  });

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
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setUserInfo({
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: `${user?.street}, ${user?.ward}, ${user?.province}`,
      role: user?.role || '',
      status: user?.status || ''
    });
  };
  const handleCancelClick = () => {
    setIsEditing(false);
    setUserInfo({
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: `${user?.street}, ${user?.ward}, ${user?.province}`,
      role: user?.role || '',
      status: user?.status || ''
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

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
                user?.avatar || image ?
                  (
                    <img src={user?.avatar} alt="avatar" className="avatar" />
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
            <table style={{ width: "100%", height: "100%", textAlign: "start" }}>
              <tbody>
                <tr className="row">
                  <td>
                    <label>UserId: </label>
                    <span>{user ? user._id : 'N/A'}</span>
                  </td>
                </tr>
                <tr className="row">
                  <td>
                    <label>Full name: </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={userInfo.fullName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span>{user?.fullName}</span>
                    )}
                  </td>
                </tr>
                <tr className="row">
                  <td>
                    <label>Email: </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="email"
                        value={userInfo.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span>{user?.email}</span>
                    )}
                  </td>
                </tr>
                <tr className="row">
                  <td>
                    <label>Phone number: </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span>{user?.phone}</span>
                    )}
                  </td>
                </tr>
                <tr className="row">
                  <td>
                    <label>Address: </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={userInfo.address}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span>{`${user?.street}, ${user?.ward}, ${user?.province}`}</span>
                    )}
                  </td>
                </tr>
                <tr className="row">
                  <td>
                    <label>Role: </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="role"
                        value={userInfo.role}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span>{user?.role}</span>
                    )}
                  </td>
                </tr>
                <tr className="row">
                  <td>
                    <label>Status: </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="status"
                        value={userInfo.status}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span>{user?.status}</span>
                    )}
                  </td>
                </tr>
              </tbody>
              <div className='button'>
                {isEditing ? (
                  <>
                    <button className="btn btn-primary" onClick={handleEditClick}>Accept</button>
                    <button className="btn btn-secondary" onClick={handleCancelClick}>Close</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-primary" onClick={handleEditClick}>Edit user</button>
                    {user?.status === 'active' ? (
                      <button className="btn btn-danger">Block user</button>
                    ) : (
                      <button className="btn btn-success">Unblock user</button>
                    )}
                  </>
                )}
              </div>
            </table>
          </div>
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default ContenInformation;