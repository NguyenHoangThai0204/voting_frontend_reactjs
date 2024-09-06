
import { ContentHomeSlideAnomation } from "../ContentHomeSlideAnomation/ContentHomeSlideAnomation";
import { ContentHomeVote } from "../ContentHomeVote/ContentHomeVote";
import "./ContentHomeLayout.css";
// import { AuthContext } from "../../../../contextapi/AuthContext";
// import { useContext } from 'react';
// import { ContentHomeGuest } from "../ContentHomeGuest/ContentHomeGuest";

export const ContentHome = () => {

  // const authContext = useContext(AuthContext);

  return (
    <div className="content_right_home">
      <div className="slider_content_home">
        <ContentHomeSlideAnomation />
      </div>
       <ContentHomeVote />

     
    </div>
  )
}
