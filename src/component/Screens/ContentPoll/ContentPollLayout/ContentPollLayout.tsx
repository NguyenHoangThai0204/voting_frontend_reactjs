import { Link } from "react-router-dom";
import { ListPoll } from "../../ContentListPoll/ListPoll/ListPoll";
import './ContentPollLayout.css';
import { AuthContext } from '../../../../contextapi/AuthContext';
import { useContext, useEffect, useState } from "react";
import { getAllVoteUser } from '../../../../api/CallApi';
import { Poll } from '../../../../typeObject';

export const ContentPollLayout = () => {
    const authContext = useContext(AuthContext); // Lấy thông tin người dùng
    const { user } = authContext!;

    // Khai báo state với kiểu dữ liệu cụ thể
    const [voting, setVoting] = useState<Poll[]>([]);
    const [voted, setVoted] = useState<Poll[]>([]);

    useEffect(() => {
        const fetchVotes = async () => {
            if (!user) {
                console.log('User not logged in');
            } else {
                try {
                    const response = await getAllVoteUser(user._id.toString());

                    // Lấy trực tiếp mảng `Vote[]` từ `response.data`
                    const votes: Poll[] = Array.isArray(response.data) ? response.data : [];

                    const currentVoting = votes.filter(vote =>
                        vote.timeEnd && new Date(vote.timeEnd)?.getTime() > new Date().getTime()
                    );
                    const votedVotes = votes.filter(vote =>
                        vote.timeEnd && new Date(vote.timeEnd)?.getTime() <= new Date().getTime()
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
                    <h2>Danh sách bình chọn đang diễn ra:</h2>
                    <Link to="/create-poll" state={{ authorId: user?._id }} className="create_vote_button" >
                        Tạo bình chọn
                    </Link>
                </div>
                <div className="list_item_vote">
                    {/* Render danh sách các cuộc vote */}
                    <ListPoll vote={voting} />
                </div>
            </div>
            <div className="list_vote">
                <h2>Danh sách bình đã kết thúc:</h2>
                <div className="list_item_vote">
                    <ListPoll vote={voted} />
                </div>
            </div>
        </div>
    );
};
