import { ContentHome } from "../../Screens/ContentHome/ContentHomeLayout/ContentHomeLayout";
import { ContentSetting } from "../../Screens/ContentSetting/ContentSetting";
import { useLocation } from 'react-router-dom';

export const ContentLayout = () => {
  const location = useLocation();

  console.log('Current path:', location.pathname); // Thêm dòng này để kiểm tra

  switch (location.pathname) {
    case '/home':
      return <ContentHome />;
    case '/settings':
      return <ContentSetting />;
    default:
      return <p>Không tìm thấy trang</p>;
  }
};
