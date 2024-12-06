import "./ItemPoll.css";
import React from "react";
import img from "../../../../assets/vote1.jpg";
import { Link } from "react-router-dom";
import { Poll } from "../../../../typeObject";
import { useEffect, useState } from "react";
import { getInforAuthor } from "../../../../api/CallApi";
import { formatDistanceToNow } from 'date-fns';
import { AuthContext } from "../../../../contextapi/AuthContext";
interface ItemPollProps {
  item: Poll;
}
import { vi } from "date-fns/locale";
import { useLocation } from "react-router-dom";
export const ItemPoll = ({ item }: ItemPollProps) => {
  const [author, setAuthor] = useState<string | undefined>('');
  const authContext = React.useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await getInforAuthor(item.authorId);
        console.log('Author response:', response);
        if (response && response.data && response.data.fullName) {
          setAuthor(response.data.fullName);
        } else {
          console.warn("fullName not found in response");
        }
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };

    fetchAuthor();
  }, [item.authorId]);

  // Tính thời gian đã qua kể từ khi tạo bình chọn
  const timeSinceCreation = formatDistanceToNow(new Date(item.timeCreate), { addSuffix: true, locale: vi });

  // Kiểm tra xem bình chọn có kết thúc chưa
  const isPollEnded = new Date(item.timeEnd) < new Date();

  // Nếu đã kết thúc, hiển thị "The end"
  const displayTime = isPollEnded ? "Kết thúc" : timeSinceCreation;

  return (
    <div className="item">
      <Link to={`/detail-poll/${item._id}`}>
        <div className="image_container">
          <img src={item.avatar || img} alt="item" />
          <div className="icon_container">
            <i className="fa-solid fa-heart"></i>
          </div>
        </div>
        <h3>{item.title}</h3>
        <h5>{item.description}</h5>
        <div className="footer_itemvote">
          <div className="footer_left marquee">
            {
              authContext?.user && location.pathname.startsWith('/poll') ? (
               <> {item?.typeContent === "public" ? "Công khai" : item?.typeContent === "private" ? "Riêng tư" : "Nâng cao"}</>
              ) : (
                
                <>{author}</>
              )
            }
          </div>
          <div className="footer_right">
            {displayTime}
          </div>
        </div>
      </Link>
    </div>
  );
};
