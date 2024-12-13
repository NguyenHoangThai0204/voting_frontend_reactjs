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
      <div className="criteria_section">
        <h2>
          <u>
            <i>Tiêu chí</i>
          </u>
        </h2>
        <div className="criteria_row">
          <div className="criteria_item">
            <p className="criteria_title">Nhanh chóng, dễ dàng</p>
            <p className="criteria_description">
            Tạo trong vài phút, dùng ngây không cần đăng nhập.
            </p>
          </div>
          <div className="criteria_item">
            <p className="criteria_title">An toàn và bảo mật</p>
            <p className="criteria_description">
            Sử dụng công nghệ bảo mật hiện đại.
            </p>
          </div>
          <div className="criteria_item">
            <p className="criteria_title">Thống kê kết quả</p>
            <p className="criteria_description">
            Cung cấp kết quả chi tiết, dễ nhìn và dễ hiểu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
