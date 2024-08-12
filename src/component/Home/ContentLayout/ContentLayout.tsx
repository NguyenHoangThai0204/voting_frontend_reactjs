import { ContentHome } from "../../Screens/ContentHome/ContentHome";
import { ContentSetting } from "../../Screens/ContentSetting/ContentSetting";

export const ContentLayout = () => {
  const param = window.location.href;

  return (
    <div className="content">
      {param === '/home' || param === '/' ? (
        <ContentHome />
      ) : param === '/settings' ? (
        <ContentSetting />
      ) : (
        <p>Xin chào</p>
      )}
    </div>
  );
};
