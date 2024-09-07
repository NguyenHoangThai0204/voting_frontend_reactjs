import "./ItemVote.css";
import img from "../../../../assets/anh-dep-thien-nhien-2-1.jpg";
import { Link } from "react-router-dom";
import { Poll } from "../../../../typeObject";
import { useEffect, useState } from "react";
import { getInforAuthor } from "../../../../api/CallApi";
import { formatDistanceToNow } from 'date-fns';

interface ItemVoteProps {
  item: Poll;
}

export const ItemVote = ({ item }: ItemVoteProps) => {
  const [author, setAuthor] = useState<string | undefined>('');

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await getInforAuthor(item.authorId);
        console.log('Author response:', response.data);
        setAuthor(response.data.fullName);
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };
    fetchAuthor();
  }, [item.authorId]);

  const timeSinceCreation = formatDistanceToNow(new Date(item.timeCreate), { addSuffix: true });

  return (
    <div className="item">
      <Link to="/detail-vote" state={{ id: item._id }}>
        <div className="image_container">
          <img src={img} alt="item" />
          <div className="icon_container">
            <i className="fa-solid fa-heart"></i>
          </div>
        </div>
        <h3>{item.title}</h3>
        <h5>{item.description}</h5>
        <div className="footer_itemvote">
          <div className="footer_left">
            {author}
          </div>
          <div className="footer_right">
            {timeSinceCreation}
          </div>
        </div>
      </Link>
    </div>
  );
};
