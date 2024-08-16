
import { ItemVote } from '../ItemVote/ItemVote'
import "./ListStype.css"

export const ListVoting = () => {
    const list = [
        {
            title:" xin chao",
            description: "sản phẩm 1",
        },
        {
            title:" xin chao 2 ",
            description: "sản phẩm 2",
        },
        {
            title:" xin chao 2 ",
            description: "sản phẩm 2",
        },
        {
            title:" xin chao 2 ",
            description: "sản phẩm 2",
        },
        {
            title:" xin chao 2 ",
            description: "sản phẩm 2",
        }
    ]
    return (
        <>

            <div className='wrapper'>
              {
                list.map((item, index)=>(
                    <ItemVote key={index} item={item} />
                ))

              }
            </div>
        </>
    )
}
