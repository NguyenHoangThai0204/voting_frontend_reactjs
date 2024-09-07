import { ContentHome } from "../../Screens/ContentHome/ContentHomeLayout/ContentHomeLayout";
import { useLocation } from 'react-router-dom';
import { ContentVoteLayout } from "../../Screens/ContentVote/ContentVoteLayout/ContentVoteLayout";
import { ContentVoteFormLayout } from "../../Screens/ContentVote/ContentVoteForm/ContentVoteFormLayout";
import ContentInformation from "../../Screens/ContentInformation/ContentInformation";
import { ContentDetailVote } from "../../Screens/ContentDetailVote/ContentDetailVote";

export const ContentLayout = () => {
  const location = useLocation();

  // console.log('Current path:', location.pathname); // Thêm dòng này để kiểm tra

  switch (location.pathname) {
    case '/home':
      return <ContentHome />;
    case '/':
      return <ContentHome />;
    case '/vote':
      return <ContentVoteLayout />;
    case '/comment':
      return <p>Comment</p>;
    case '/personal-page':
      return <ContentInformation />;
    case '/setting':
      return <p>Setting</p>;
    case '/create-vote':
      return <ContentVoteFormLayout />;
    case '/detail-vote':
      return <ContentDetailVote />;
    default:
      return <p>Không tìm thấy trang</p>;
  }
};
