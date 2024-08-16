
import { ContentHomeSlideAnomation } from "../ContentHomeSlideAnomation/ContentHomeSlideAnomation";
import { ListVoted } from "../../ContentListVote/ListVote/ListVoted";
import { ListVoting } from "../../ContentListVote/ListVote/ListVoting";
import "./ContentHomeLayout.css";
import { AuthContext } from "../../../../contextapi/AuthContext";
import { useContext } from 'react';
import { ContentHomeGuest } from "../ContentHomeGuest/ContentHomeGuest";

export const ContentHome = () => {

  const authContext = useContext(AuthContext);

  return (
    <div className="content_right_home">
      <div className="slider_content_home">
        <ContentHomeSlideAnomation />
      </div>
      {
        authContext?.isLogged ? (
          <>
            dsafg asdfg 
          </>
        ):(
          <div className="">
            <ContentHomeGuest />
          </div>
        )
      }
    </div>
  )
}
