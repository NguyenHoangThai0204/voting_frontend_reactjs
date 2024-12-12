import React from 'react'
import './ItemComent.css'
import { TheNew } from '../../../../typeObject';
// import ReactHtmlParser from 'react-html-parser';
interface TheNewObj {
  theNew: TheNew;
}
export const ItemComent: React.FC<TheNewObj> = ({ theNew }) => {
  return (
    <div className='itemComment'>
      <div className="header">
        <div className="avatar">
          <img src = "https://voting-app-tm.s3.ap-southeast-1.amazonaws.com/logo-m-t-min.jpg" 
           alt="admin" />
        </div>
        <div className="name">
          <p>Admin</p>
        </div>
      </div>
      <div className="contentItem">
        <div className="contentLeft">
          <div className="commentTitle">
            <p>{theNew.tenBaiViet}</p>
          </div>
          <div className="commentDescription">
            <p style={{
              display: "-webkit-box",
              WebkitLineClamp: 4, // Viết camelCase thay cho -webkit-line-clamp
              WebkitBoxOrient: "vertical", // Viết camelCase thay cho -webkit-box-orient
              overflow: "hidden",
              textOverflow: "ellipsis",
              
            }}>
              <p dangerouslySetInnerHTML={{ __html: theNew?.noiDungBaiViet || '' }}></p>
            </p>

          </div>
        </div>
        <div className="contentRight">
          <img src={theNew.hinhAnhBaiViet} alt="avatar" />
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
