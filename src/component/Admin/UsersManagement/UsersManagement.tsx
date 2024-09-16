
import { useState, useEffect } from 'react';
import {getAllUser} from '../../../api/CallApi';
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

  return (
    <div>
        <table className="table table-striped" style={{ width: '100%' }} border={1}>
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
                  <td style={{textAlign:"center"}}> 
                    <button className="btn btn-primary" style={{margin:"auto"}}>Edit</button>
                    <button className="btn btn-danger" style={{margin:"auto"}}>Delete</button>
                  </td>
                </tr>
              ))}    
            </tbody>
        </table>    
    </div>
  )
}
