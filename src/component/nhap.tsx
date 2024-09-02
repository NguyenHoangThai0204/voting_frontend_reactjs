// import "./ContentDetailVote.css"
// import TextField from '@mui/material/TextField';
// import { useLocation } from 'react-router-dom';
// import { Vote } from "../../../typeObject";
// import { useEffect, useState } from "react";
// import {getVoteById} from "../../../api/userApi";

// export const ContentDetailVote = () => {
//   const location = useLocation();
//     // Lấy ID từ state
//   const { id } = location.state as { id: string };
//   const [vote, setVote] = useState<Vote>();

//   useEffect(() => {
//     const fetchVote = async () => {
//       const response = await getVoteById(id);
//       console.log('Vote response:', response);
//       console.log('Vote data:',id);
//       setVote(response.data);
//     }
//     fetchVote();
//   }, [id]);

//   return (
//     <div className="wrapper_detail_vote">
//       <form>
//         <div className="header_content_form">
//           <div className="header_content_form_right">
//             <label htmlFor="upload_image_vote" className="upload_area">
//               <img></img>
//             </label>
//           </div>
//           <div className="header_content_form_left">
//             <div className="label">Name vote:</div>
//             <h1>{vote?.title}</h1>
//             <div className="label">Description:</div>
//             <TextField className="text_namevote" value={vote?.description || ''}  inputProps={{ readOnly: true }} multiline rows={4} variant="outlined" />
//           </div>
//         </div>
//         <div className="content_form">
//           <div className="label">Option:</div>
//           <div className="content_option">
//             {vote?.selectors.map((option, index) => (
//               <div key={index}>
//                 <TextField className="text_option" value={option.contentSelector} inputProps={{ readOnly: true }} variant="outlined" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }
