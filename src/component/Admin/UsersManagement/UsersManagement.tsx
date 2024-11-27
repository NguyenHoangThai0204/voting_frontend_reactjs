// import { useLocation,useNavigate  } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { getAllUser, getInforAuthor, getAllVoteUser } from '../../../api/CallApi';
// import { User, Poll } from '../../../typeObject';
// import './UsersManagement.css';
// import { InputSearchAdmin } from '../InputSearchAdmin/InputSearchAdmin';
// import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
// import { DetailUsersManagement } from '../DetailUsersManagement/DetailUsersManagement';

// export const UsersManagement = () => {
//   const location = useLocation();
//   const [users, setUsers] = useState<User[]>([]);
//   const [id, setId] = useState<string>('');
//   const [userItem, setUserItem] = useState<User>();
//   const [polls, setPolls] = useState<Poll[]>([]);
//   useEffect(() => {
//     if (location.state && location.state.id) {
//       setId(location.state.id);
//     }
//   }, [location.state]);

//   useEffect(() => {
//   const fetchUsers = async () => {
//     try {
//       const response = await getAllUser();
//       const fetchedUsers = Array.isArray(response.data) ? response.data : [response.data];
//       setUsers(fetchedUsers);

//       // Thiết lập ID và thông tin của người đầu tiên trong danh sách
//       if (fetchedUsers.length > 0) {
//         const firstUser = fetchedUsers[0];
//         setId(firstUser._id);
//         setUserItem(firstUser);

//         // Gọi API lấy thông tin các polls của người dùng đầu tiên
//         const response2 = await getAllVoteUser(firstUser._id);
//         setPolls(Array.isArray(response2.data) ? response2.data : [response2.data]);
//       }
//     } catch (error) {
//       console.error("Error fetching users data:", error);
//     }
//   };
//   fetchUsers();
// }, []);

  
//   useEffect(() => {
//     if (id) {
//       const fetchUserInfo = async () => {
//         try {
//           const response = await getInforAuthor(id);
//           setUserItem(response.data);
//         } catch (error) {
//           console.error("Error fetching user info:", error);
//         }
//       };
//       fetchUserInfo();
//     }
//   }, [id]);

//   const handleRowClick = async (user: User) => {
//       setUserItem(user);
//       const response2 = await getAllVoteUser(user._id);
//       setPolls(Array.isArray(response2.data) ? response2.data : [response2.data]);
//   };
//   const navigate = useNavigate();
//   const handleMenuClick = () => {
//     navigate('/home');
//   }
//   return (
//     <div className="usersManagement">
//       <div className="userManaLeft">
//         <div style={{ display: "flex", backgroundColor:"white", width: "100%", justifyContent: "space-between", padding:"2px",top:0, opacity:1, position:"sticky", height:"50px", zIndex: 2}}>
//           <div style={{ display: "flex", alignItems: "center", width: "20%" }}>
//             <h3>Tìm kiếm: </h3>
//           </div>

//           <InputSearchAdmin />
          
//           <div>
//             <MenuTwoToneIcon style={{ fontSize: "45px", color: "black" }} 
//               onClick={handleMenuClick}
//             />
//           </div>
//         </div>
//         <table className="table table-striped" style={{ width: '100%' }} border={1}>
//           <thead>
//             <tr>
//               <th scope="col">ID</th>
//               <th scope="col">Full name</th>
//               <th scope="col">Avatar</th>
//             </tr>
//           </thead>
//           <tbody>
//             {location.pathname.startsWith('/home/getUserByid') ? (
//               <tr className='trrow'>
//                 <td>1</td>
//                 <td>{userItem?.fullName}</td>
//                 <td><img src={userItem?.avatar} alt="avatar" style={{ width: '50px', height: '50px' }} /></td>
//               </tr>
//             ) : (
//               users.map((user, index) => (
//                 <tr className='trrow' key={user._id} onClick={() => handleRowClick(user)}>
//                   <td>{index + 1}</td>
//                   <td>{user.fullName}</td>
//                   <td><img src={user.avatar} alt="avatar" style={{ width: '50px', height: '50px' }} /></td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div className="userManaRight">
//         <DetailUsersManagement userItem={userItem} pollItem={polls} refreshUserList={function (): void {
//           throw new Error('Function not implemented.');
//         } }/>
//       </div>
//     </div>
//   );
// };



import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllUser, getInforAuthor, getAllVoteUser } from '../../../api/CallApi';
import { User, Poll } from '../../../typeObject';
import './UsersManagement.css';
import { DetailUsersManagement } from '../DetailUsersManagement/DetailUsersManagement';

export const UsersManagement = () => {
  const location = useLocation();
  //eslint-disable-next-line
  const [users, setUsers] = useState<User[]>([]);  // Lưu danh sách người dùng
  const [id, setId] = useState<string>('');  // Lưu id người dùng
  const [userItem, setUserItem] = useState<User>();  // Lưu thông tin người dùng
  const [polls, setPolls] = useState<Poll[]>([]);  // Lưu các poll của người dùng

  // Thiết lập id từ location nếu có
  useEffect(() => {
    if (location.state && location.state.id) {
      setId(location.state.id);
    }
  }, [location.state]);

  // Lấy danh sách người dùng ban đầu và polls của người dùng đầu tiên
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUser();
        const fetchedUsers = Array.isArray(response.data) ? response.data : [response.data];
        setUsers(fetchedUsers);

        if (fetchedUsers.length > 0) {
          const firstUser = fetchedUsers[0];
          setId(firstUser._id);
          setUserItem(firstUser);

          const response2 = await getAllVoteUser(firstUser._id);
          setPolls(Array.isArray(response2.data) ? response2.data : [response2.data]);
        }
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };
    fetchUsers();
  }, []);  // Chạy một lần khi component mount

  // Gọi API lấy thông tin người dùng và polls khi id thay đổi
  useEffect(() => {
    if (id) {
      const fetchUserInfo = async () => {
        try {
          const userResponse = await getInforAuthor(id);
          setUserItem(userResponse.data);  // Cập nhật thông tin người dùng

          const pollsResponse = await getAllVoteUser(id);
          setPolls(Array.isArray(pollsResponse.data) ? pollsResponse.data : [pollsResponse.data]);  // Cập nhật polls
        } catch (error) {
          console.error("Error fetching user info or polls:", error);
        }
      };
      fetchUserInfo();
    }
  }, [id]);  // Mỗi khi id thay đổi sẽ gọi lại API

  return (
    <div>
        <DetailUsersManagement userItem={userItem} pollItem={polls} refreshUserList={() => {}} />
      </div>
  );
};
