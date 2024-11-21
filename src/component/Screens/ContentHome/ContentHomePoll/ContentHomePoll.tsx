import { ListPoll } from "../../ContentListPoll/ListPoll/ListPoll";
import './ContentHomePoll.css';
import { useEffect, useState } from "react";
import { getAllVotes } from '../../../../api/CallApi';
import { Poll } from '../../../../typeObject';

export const ContentHomeVote = () => {
    // Khai báo state với kiểu dữ liệu cụ thể
    const [voting, setVoting] = useState<Poll[]>([]);
    const [voted, setVoted] = useState<Poll[]>([]);

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const response = await getAllVotes();
                const votes: Poll[] = Array.isArray(response.data) ? response.data : [];

                // Phân loại phiếu bầu
                const currentTime = Date.now();
                const activeVotes = votes.filter(vote => 
                    vote.typeContent === "public" &&
                    vote.timeEnd &&
                    Date.parse(vote.timeEnd) >= currentTime
                );
                const expiredVotes = votes.filter(vote => 
                    vote.typeContent === "public" &&
                    vote.timeEnd &&
                    Date.parse(vote.timeEnd) < currentTime
                );

                // Cập nhật state
                setVoting(activeVotes);
                setVoted(expiredVotes);

            } catch (error) {
                console.error('Failed to fetch votes:', error);
            }
        };

        fetchVotes();
    }, []);

    return (
        <div className="wrapper_votelayout">
            <div className="content_vote"style={{margin:"30px"}}>
                <h2 style={{margin:"5px 0 10px 0"}}>Đang diễn ra</h2>
                <div className="list_item_vote" >
                    <ListPoll vote={voting} />
                </div>
            </div>
            <div className="content_vote" style={{margin:"30px"}}>
                <h2 style={{margin:"5px 0 10px 0"}}>Đã kết thúc</h2>
                <div className="list_item_vote">
                    <ListPoll vote={voted} />
                </div>
            </div>
        </div>
    );
};
