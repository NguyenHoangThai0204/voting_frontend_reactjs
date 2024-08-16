
import { ItemVote } from '../ItemVote/ItemVote'
import "./ListStype.css"

export const ListVoted = () => {
    const list = [
        {
            title: " xin chao",
            description: "sản phẩm 1",
        }   
    ]
    return (
        <div className='wrapper'>
            {
                list.map((item, index) => (
                    <ItemVote key={index} item={item} />
                ))

            }
        </div>
    )
}
