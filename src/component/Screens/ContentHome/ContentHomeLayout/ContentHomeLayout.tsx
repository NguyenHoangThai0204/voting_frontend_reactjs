
import { ContentHomeSlideAnomation } from "../ContentHomeSlideAnomation/ContentHomeSlideAnomation";
import { ContentHomeVote } from "../ContentHomePoll/ContentHomePoll";
import "./ContentHomeLayout.css";

export const ContentHome = () => {
  return (
    <div className="content_right_home">
      <div className="slider_content_home">
        <ContentHomeSlideAnomation />
      </div>
       <ContentHomeVote />
       <ContentHomeVote />
       <ContentHomeVote />
    </div>
  )
}
