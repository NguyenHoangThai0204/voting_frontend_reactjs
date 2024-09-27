
import { useState, useEffect } from 'react';
import {getAllUser, changeStatusUser} from '../../../api/CallApi';
import { User } from '../../../typeObject';
import './UsersManagement.css';

export const UsersManagement = () => {

  const [users, setUsers] = useState<User[]>([]);
  
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

  const handleDelete = async (id: string) => {
    try {
      const confirmDelete = confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        await changeStatusUser(id);
        alert('Delete user successfully');
      }
    } catch (error) {
      console.error("Error deleting user data:", error);
    }
  };

  return (
    <div>
        <table className="table table-striped" style={{ width: '100%'}} border={1}>
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Full name</th>
                <th scope="col">Avatar</th>
                <th scope="col">Phone number</th>
                <th scope="col">Gender</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
              {users.map((user, index)=>(
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.fullName}</td>
                  <td><img src={user.avatar} alt="avatar" style={{ width: '50px', height: '50px' }} /></td>
                  <td>{user.phone}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td style={{textAlign:"center", margin:"auto" }} > 
                    <button className="btn btn-primary" style={{marginRight:"5px"}}>Edit</button>
                    <button className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                    style={{marginLeft:"10px"}}>Delete</button>
                  </td>
                </tr>
              ))}    
            </tbody>
        </table>    
    </div>
  )
}
