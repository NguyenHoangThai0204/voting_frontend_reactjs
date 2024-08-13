
import { ContentHomeSlideAnomation } from "../ContentHomeSlideAnomation/ContentHomeSlideAnomation";
import "./ContentHomeLayout.css";

export const ContentHome = () => {
 
  return (
    <div className="content_right_home">
      <div className="slider_content_home">
        <ContentHomeSlideAnomation />
      </div>
      <div className="voting_list">
        <div className="voting_list_title">
          <h2>Voting List</h2>
        </div>
        
      </div>
      <div className="voted_list">
        <div className="voted_list_title">
          <h2>Voted List</h2>
        </div>
      </div>
    </div>
  )
}
