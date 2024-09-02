
import "./ItemVote.css"
import img from "../../../../assets/anh-dep-thien-nhien-2-1.jpg"
import { Link } from "react-router-dom";

interface ItemVoteProps {
  item: {
    title: string;
    description: string;
  }
}
export const ItemVote = ({ item }: ItemVoteProps) => {
  return (
    <div className="item">
      <Link to="/detail-vote">
        <div className="image_container" >
          <img src={img} alt="item" />
          <div className="icon_container" >
            <i className="fa-solid fa-heart"></i>
          </div>
        </div>
        <h3>{item.title}</h3>
        <h5>{item.description}</h5>
      </Link>
    </div>
  )
}
