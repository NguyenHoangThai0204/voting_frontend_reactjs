import { ContentHome } from "../../Screens/ContentHome/ContentHomeLayout/ContentHomeLayout";
import { useLocation  } from 'react-router-dom';
import { ContentPollLayout } from "../../Screens/ContentPoll/ContentPollLayout/ContentPollLayout";
import { ContentPollFormLayout } from "../../Screens/ContentPoll/ContentPollForm/ContentPollFormLayout";
import ContentInformation from "../../Screens/ContentInformation/ContentInformation";
import { ContentDetailPoll } from "../../Screens/ContentDetailPoll/ContentDetailPoll";

export const ContentLayout = () => {
  const location = useLocation();
  // console.log('Current path:', location.pathname); // Thêm dòng này để kiểm tra

  switch (location.pathname) {
    case '/home':
      return <ContentHome />;
    case '/':
      return <ContentHome />;
    case '/poll':
      return <ContentPollLayout />;
    case '/comment':
      return <p>Comment</p>;
    case '/personal-page':
      return <ContentInformation />;
    case '/setting':
      return <p>Setting</p>;
    case '/create-poll':
      return <ContentPollFormLayout />;
    case '/detail-poll': 
      return <ContentDetailPoll />;
    default:
      return <p>Không tìm thấy trang</p>;
  }
};
