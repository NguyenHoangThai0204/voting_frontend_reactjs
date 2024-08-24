import { Link } from "react-router-dom";
import { ListVoted } from "../../ContentListVote/ListVote/ListVoted";
import { ListVoting } from "../../ContentListVote/ListVote/ListVoting";
import './ContentVoteLayout.css';

export const ContentVoteLayout = () => {
    return (
        <div className="wrapper_votelayout">
            <div className="content_vote">
               
            </div>
            <div className="list_vote">
                <div className="list_vote_header">
                    <h2>List of voting</h2>
                    <Link to="/create-vote" className="create_vote_button">
                        Create Vote
                    </Link>
                </div>
                <div className="list_item_vote">
                    <ListVoting />
                </div>
            </div>
            <div className="list_vote">
                <h2>List of voted</h2>
                <div className="list_item_vote">
                    <ListVoted />
                </div>
            </div>
        </div>
    );
};
