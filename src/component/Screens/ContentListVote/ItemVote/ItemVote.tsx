import "./ItemVote.css";
import img from "../../../../assets/anh-dep-thien-nhien-2-1.jpg";
import { Link } from "react-router-dom";
import { Vote } from "../../../../typeObject";
interface ItemVoteProps {
  item: Vote;
}

export const ItemVote = ({ item }: ItemVoteProps) => {

  // const [author, setAuthor] = useState<string | undefined>('');

  // useEffect(() => {
  //   const fetchAuthor = async () => {
  //     const response = await getInforAuthor(item.authorId);
  //     console.log('Author respons e:', item.authorId);
  //     setAuthor(response.data.fullName);
  //   }
  //   fetchAuthor();
  // }, [item.authorId]);

  return (
    <div className="item">
     <Link
        to="/detail-vote"
        state={{ id: item._id }}
      >
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
            {/* {author} */}
          </div>
          <div className="footer_right">

          </div>
        </div>
      </Link>
    </div>
  );
};
