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
            <p className="criteria_title">UY TÍN</p>
            <p className="criteria_description">
              Nơi Bán Linh Kiện Đẹp Đảm Bảo Uy Tín Với Hơn 10 Năm Kinh Nghiệm.
            </p>
          </div>
          <div className="criteria_item">
            <p className="criteria_title">CHẤT LƯỢNG</p>
            <p className="criteria_description">
              Các sản phẩm được kiểm tra tiêu chuẩn chất lượng khi được nhập về kho.
            </p>
          </div>
          <div className="criteria_item">
            <p className="criteria_title">NHIỆT THÀNH</p>
            <p className="criteria_description">
              Đội ngũ nhân viên hỗ trợ nhiệt tình khi xảy ra các vấn đề liên quan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
