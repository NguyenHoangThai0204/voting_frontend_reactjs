import { ListPoll } from "../../ContentListPoll/ListPoll/ListPoll";
import './ContentHomePoll.css';
import {  useEffect, useState } from "react";
import { getAllVotes } from '../../../../api/CallApi';
import { Poll } from '../../../../typeObject';

export const ContentHomeVote = () => {
    
    // Khai báo state với kiểu dữ liệu cụ thể
    const [voting, setVoting] = useState<Poll[]>([]);
  

    useEffect(() => {
        const fetchVotes = async () => {
           
                try {
                    const response = await getAllVotes();
                    
                    // Lấy trực tiếp mảng `Vote[]` từ `response.data`
                    const votes: Poll[] = Array.isArray(response.data) ? response.data : [];
                    console.log('Votes:', response);
                    const list = votes.filter(vote =>{
                      return vote.typeContent === "public";
                    })        
                    setVoting(list);
                } catch (error) {
                    console.error('Failed to fetch votes:', error);
                }
   
              }
        fetchVotes();
    },[]);
    
    

    return (
        <div className="wrapper_votelayout">
            <div className="content_vote">
                {/* Nội dung khác của bạn */}
            </div>
            <div className="list_vote">
               
                <div className="list_item_vote">
                    {/* Render danh sách các cuộc vote */}
                        <ListPoll vote={voting} />
                </div>
            </div>
            
        </div>
    );
};
