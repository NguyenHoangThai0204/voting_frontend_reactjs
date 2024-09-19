
// import { useState, useEffect } from 'react';
// import {getAllUser} from '../../../api/CallApi';
// import { User } from '../../../typeObject';
import '../UsersManagement/UsersManagement.css';

export const PollsManagement = () => {

  // const [users, setUsers] = useState<User[]>([]);
  
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await getAllUser();
  //       setUsers(Array.isArray(response.data) ? response.data : [response.data]);
  //     } catch (error) {
  //       console.error("Error fetching users data:", error);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  return (
    <div>
        <table className="table table-striped" style={{ width: '100%'}} border={1}>
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Poll name</th>
                <th scope="col">Avatar</th>
                <th scope="col">Description</th>
                <th scope="col">Gender</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
              
            </tbody>
        </table>    
    </div>
  )
}
