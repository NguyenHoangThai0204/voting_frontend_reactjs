import { ListPoll } from "../../ContentListPoll/ListPoll/ListPoll";
import './ContentHomePoll.css';
import { useEffect, useState } from "react";
import { getAllVotes } from '../../../../api/CallApi';
import { Poll } from '../../../../typeObject';
import { AuthContext } from "../../../../contextapi/AuthContext";
import React from "react";

export const ContentHomeVote = () => {
    const authContext = React.useContext(AuthContext);
    // const { walletAddress } = authContext!;

    const [voting, setVoting] = useState<Poll[]>([]);
    const [voted, setVoted] = useState<Poll[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [votePrivate, setVotePrivate] = useState<Poll[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [votePrivatSm, setVotePrivateSm] = useState<Poll[]>([]);

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const response = await getAllVotes();
                const votes: Poll[] = Array.isArray(response.data) ? response.data : [];

                const currentTime = Date.now();
                const activeVotes = votes.filter(vote =>
                    vote.typeContent === "public" &&
                    vote.timeEnd &&
                    !isNaN(Date.parse(vote.timeEnd)) &&
                    Date.parse(vote.timeEnd) >= currentTime
                );
                const expiredVotePrivate = votes.filter(vote =>
                    vote.typeContent === "private"
                );
                const expiredVotes = votes.filter(vote =>
                    vote.typeContent === "public" &&
                    vote.timeEnd &&
                    !isNaN(Date.parse(vote.timeEnd)) &&
                    Date.parse(vote.timeEnd) < currentTime
                );
                const expiredVotePrivateSm = votes.filter(vote =>
                    vote.typeContent === "privatesmc"
                );
                setVoting(activeVotes);
                setVoted(expiredVotes);
                setVotePrivate(expiredVotePrivate);
                setVotePrivateSm(expiredVotePrivateSm);

            } catch (error) {
                console.error('Failed to fetch votes:', error);
                setError('Có lỗi xảy ra khi tải dữ liệu phiếu bầu.');
            }
        };

        fetchVotes();
    }, [
        
    ]);

    return (
        <div className="wrapper_votelayout">
            {/* {
                walletAddress && votePrivatSm.length > 0 && <div className="content_vote">
                    <h2 >Cuộc bình chọn nâng cao</h2>
                    <div className="list_item_vote">
                        <ListPoll vote={votePrivatSm} />
                    </div>
                </div>

            } */}
            {authContext?.user && votePrivate.length > 0 && <div className="content_vote">
                <h2 >Cuộc bình chọn riêng tư</h2>
                <div className="list_item_vote">
                    <ListPoll vote={votePrivate} />
                </div>
            </div>}
            {voting.length > 0 && <div className="content_vote">
                <h2 style={{marginBottom:'5px'}}>Các cuộc bình chọn công khai đang diễn ra</h2>
                <div className="list_item_vote">
                    <ListPoll vote={voting} />
                </div>
            </div>}
            {voted.length > 0 && <div className="content_vote">
                <h2 style={{marginBottom:'5px'}}>Các cuộc bình chọn công khai đã kết thúc</h2>
                <div className="list_item_vote">
                    <ListPoll vote={voted} />
                </div>
            </div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};
