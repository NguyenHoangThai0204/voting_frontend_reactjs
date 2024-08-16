
import { ContentHomeSlideAnomation } from "../ContentHomeSlideAnomation/ContentHomeSlideAnomation";
import { ListVoted } from "../ListVote/ListVoted";
import { ListVoting } from "../ListVote/ListVoting";
import "./ContentHomeLayout.css";

export const ContentHome = () => {

  return (
    <div className="content_right_home">
      <div className="slider_content_home">
        <ContentHomeSlideAnomation />
      </div>
      <div className="list_vote">
        <h2>List of voting </h2>
        <div className="list_item_vote">
          <ListVoting />
        </div>
      </div>
      <div className="list_vote">
        <h2>List of voted </h2>
        <div className="list_item_vote">
          <ListVoted/>
        </div>
      </div>
    </div>
  )
}
