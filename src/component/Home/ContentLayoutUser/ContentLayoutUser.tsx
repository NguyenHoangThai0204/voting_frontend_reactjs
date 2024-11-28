import React from 'react';
import { ContentHome } from "../../Screens/ContentHome/ContentHomeLayout/ContentHomeLayout";
import { useLocation } from 'react-router-dom';
import { ContentPollLayout } from "../../Screens/ContentPoll/ContentPollLayout/ContentPollLayout";
import { ContentPollFormLayout } from "../../Screens/ContentPoll/ContentPollForm/ContentPollFormLayout";
import ContentInformation from "../../Screens/ContentInformation/ContentInformation";
import { ContentDetailPoll } from "../../Screens/ContentDetailPoll/ContentDetailPoll";
import ContentTabsAdmin from "../../Admin/ContentTabsAdmin/ContentTabsAdmin";
import { TheNewLayout } from '../../Screens/CommentsScreen/TheNewLayout';

export const ContentLayout = () => {
  const location = useLocation();
  // const params = useParams<{ id: string }>();

  // Kiểm tra và xử lý tham số
  if (location.pathname.startsWith('/detail-poll/')) {
    return <ContentDetailPoll />;
  }
  if (location.pathname.startsWith('/home/admin/')) {
    return <ContentTabsAdmin />;
  }
  switch (location.pathname) {
    case '/home':
      return <ContentHome />;
    case '/':
      return <ContentHome />;
    case '/poll':
      return <ContentPollLayout />;
    case '/thenew':
      return <TheNewLayout />;
    case '/personal-page':
      return <ContentInformation />;
    // case '/setting':
    //   return <p>Setting</p>;
    case '/create-poll':
      return <ContentPollFormLayout />;
    default:
      return <p>Không tìm thấy trang</p>;
  }
};
