import { Link } from "react-router-dom";
import { ListVoted } from "../../ContentListVote/ListVote/ListVoted";
import { ListVoting } from "../../ContentListVote/ListVote/ListVoting";
import './ContentVoteLayout.css';
import { AuthContext } from '../../../../contextapi/AuthContext';
import { useContext, useEffect, useState } from "react";
import { getAllVotes } from '../../../../api/CallApi';
import { Vote } from '../../../../typeObject';

export const ContentVoteLayout = () => {
    const authContext = useContext(AuthContext); // Lấy thông tin người dùng
    const { user } = authContext!;
    
    // Khai báo state với kiểu dữ liệu cụ thể
    const [voting, setVoting] = useState<Vote[]>([]);
    const [voted, setVoted] = useState<Vote[]>([]);

    useEffect(() => {
        const fetchVotes = async () => {
            if (!user) {
                console.log('User not logged in');
            } else {
                console.log('User logged in:', user);
        
                try {
                    const response = await getAllVotes(user._id.toString());
                    
                    // Lấy trực tiếp mảng `Vote[]` từ `response.data`
                    const votes: Vote[] = Array.isArray(response.data) ? response.data : [];
        
                    const currentVoting = votes.filter(vote =>
                        new Date(vote.timeEnd).getTime() > new Date().getTime()
                    );
                    const votedVotes = votes.filter(vote =>
                        new Date(vote.timeEnd).getTime() <= new Date().getTime()
                    );
        
                    setVoting(currentVoting);
                    setVoted(votedVotes);

                } catch (error) {
                    console.error('Failed to fetch votes:', error);
                }
            }
        };
    
        fetchVotes();
    }, [user]);
    
    

    return (
        <div className="wrapper_votelayout">
            <div className="content_vote">
                {/* Nội dung khác của bạn */}
            </div>
            <div className="list_vote">
                <div className="list_vote_header">
                    <h2>List of voting</h2>
                    <Link to="/create-vote" className="create_vote_button">
                        Create Vote
                    </Link>
                </div>
                <div className="list_item_vote">
                    {/* Render danh sách các cuộc vote */}
                        <ListVoting voting={voting} />
                </div>
            </div>
            <div className="list_vote">
                <h2>List of voted</h2>
                <div className="list_item_vote">

                        <ListVoted voted={voted}/>

                </div>
            </div>
        </div>
    );
};
