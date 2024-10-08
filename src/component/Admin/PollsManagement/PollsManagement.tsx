
import { useState, useEffect } from 'react';
import { getAllVotes } from '../../../api/CallApi';
import { Poll } from '../../../typeObject';
import '../UsersManagement/UsersManagement.css';

export const PollsManagement = () => {

  const [polls , setPolls] = useState<Poll[]>([]);
  
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await getAllVotes();
        setPolls(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };
    fetchPolls();
  }, []);
  const convertToVietnamTime = (isoTime: string) => {
    return new Date(isoTime).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  };
  return (
    <div>
        <table className="table table-striped" style={{ width: '100%'}} border={1}>
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Poll name</th>
                <th scope="col">Avatar</th>
                <th scope="col">Description</th>
                <th scope="col">Time start</th>
                <th scope="col">Time end</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
              { polls.map((poll, index)=>(
                <tr key={poll._id}>
                  <td>{index + 1}</td>
                  <td>{poll.title}</td>
                  <td><img src={poll.avatar ?? ''} alt="avatar" style={{ width: '50px', height: '50px' }} /></td>
                  <td>{poll.description}</td>
                  <td>{poll.timeStart ? convertToVietnamTime(poll.timeStart) : 'N/A'}</td>
                  <td>{poll.timeEnd ? convertToVietnamTime(poll.timeEnd) : 'N/A'}</td>
                  <td style={{textAlign:"center", margin:"auto" }} > 
                    <button className="btn btn-primary" style={{marginRight:"5px"}}>Edit</button>
                    <button className="btn btn-danger" style={{marginLeft:"10px"}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>    
    </div>
  )
}
