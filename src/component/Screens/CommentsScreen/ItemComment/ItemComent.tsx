import React from 'react'
import './ItemComent.css'
export const ItemComent = () => {
  return (
    <div className='itemComment'>
        <div className="header">
            <div className="avatar">
                <img src="https://images2.thanhnien.vn/528068263637045248/2024/1/25/c3c8177f2e6142e8c4885dbff89eb92a-65a11aeea03da880-1706156293184503262817.jpg" alt="avatar" />
            </div>
            <div className="name">
                <p>Nguyen Van A</p>
            </div>
        </div>
        <div className="contentItem">
          <div className="contentLeft">
            <div className="commentTitle">
              <p>Tên Chủ đếf</p>
            </div>
            <div className="commentDescription">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A veniam nesciunt velit aliquid repellendus aliquam ex officia nostrum, nulla explicabo dolorem ullam. In facere quo ab sunt, omnis quia illo?</p>
            </div>
          </div>
          <div className="contentRight">
          <img src="https://images2.thanhnien.vn/528068263637045248/2024/1/25/c3c8177f2e6142e8c4885dbff89eb92a-65a11aeea03da880-1706156293184503262817.jpg" alt="avatar" />
          </div>
        </div>
        <div className="footer">
          <div className="like">
            <p>Like</p>
          </div>
          <div className="dislike">
            <p>Dislike</p>
          </div>
        </div>
    </div>
  )
}
