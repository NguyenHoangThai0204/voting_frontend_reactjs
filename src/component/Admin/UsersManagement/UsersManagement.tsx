import { useLocation,useNavigate  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllUser, getInforAuthor, getAllVoteUser } from '../../../api/CallApi';
import { User, Poll } from '../../../typeObject';
import './UsersManagement.css';
import { InputSearchAdmin } from '../InputSearchAdmin/InputSearchAdmin';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { DetailUsersManagement } from '../DetailUsersManagement/DetailUsersManagement';

export const UsersManagement = () => {
  const location = useLocation();
  const [users, setUsers] = useState<User[]>([]);
  const [id, setId] = useState<string>('');
  const [userItem, setUserItem] = useState<User>();
  const [polls, setPolls] = useState<Poll[]>([]);
  useEffect(() => {
    if (location.state && location.state.id) {
      setId(location.state.id);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUser();
        setUsers(Array.isArray(response.data) ? response.data : [response.data]);
       
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };
    fetchUsers();
  }, []);
  
  useEffect(() => {
    if (id) {
      const fetchUserInfo = async () => {
        try {
          const response = await getInforAuthor(id);
          setUserItem(response.data);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };
      fetchUserInfo();
    }
  }, [id]);

  const handleRowClick = async (user: User) => {
      setUserItem(user);
      const response2 = await getAllVoteUser(user._id);
      setPolls(Array.isArray(response2.data) ? response2.data : [response2.data]);
  };
  const navigate = useNavigate();
  const handleMenuClick = () => {
    navigate('/home');
  }
  return (
    <div className="usersManagement">
      <div className="userManaLeft">
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", width: "50%" }}>
            <h3>Search user: </h3>
          </div>
          <InputSearchAdmin />
          <div>
            <MenuTwoToneIcon style={{ fontSize: "45px", color: "black" }} 
              onClick={handleMenuClick}
            />
          </div>
        </div>
        <table className="table table-striped" style={{ width: '100%', marginTop: "5px" }} border={1}>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Full name</th>
              <th scope="col">Avatar</th>
            </tr>
          </thead>
          <tbody>
            {location.pathname.startsWith('/home/getUserByid') ? (
              <tr className='trrow'>
                <td>1</td>
                <td>{userItem?.fullName}</td>
                <td><img src={userItem?.avatar} alt="avatar" style={{ width: '50px', height: '50px' }} /></td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr className='trrow' key={user._id} onClick={() => handleRowClick(user)}>
                  <td>{index + 1}</td>
                  <td>{user.fullName}</td>
                  <td><img src={user.avatar} alt="avatar" style={{ width: '50px', height: '50px' }} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="userManaRight">
        <DetailUsersManagement userItem={userItem} pollItem={polls}/>
      </div>
    </div>
  );
};
