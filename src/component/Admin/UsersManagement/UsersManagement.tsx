import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllUser, getInforAuthor } from '../../../api/CallApi';
import { User } from '../../../typeObject';
import './UsersManagement.css';

export const UsersManagement = () => {
  // Lấy state từ location
  const location = useLocation();
  const [users, setUsers] = useState<User[]>([]);
  const [id, setId] = useState<string>('');
  const [userItem, setUserItem] = useState<User>();
  // Lấy id từ state nếu tồn tại
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
    if (id) { // Nếu có id, gọi API lấy thông tin của người dùng theo id
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
  }, [id]); // Chỉ chạy khi id thay đổi

  return (
    <div className="usersManagement">
      <div className="userManaLeft">
        <table className="table table-striped" style={{ width: '100%' }} border={1}>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Full name</th>
              <th scope="col">Avatar</th>
              <th scope="col">Phone number</th>
            </tr>
          </thead>
          <tbody>
            {location.pathname.startsWith('/home/getUserByid') ? (
              <tr>
                <td>1</td>
                <td>{userItem?.fullName}</td>
                <td><img src={userItem?.avatar} alt="avatar" style={{ width: '50px', height: '50px' }} /></td>
                <td>{userItem?.phone}</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.fullName}</td>
                  <td><img src={user.avatar} alt="avatar" style={{ width: '50px', height: '50px' }} /></td>
                  <td>{user.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="userManaRight">
        {/* Hiển thị thêm thông tin người dùng ở đây nếu cần */}
      </div>
    </div>
  );
};
