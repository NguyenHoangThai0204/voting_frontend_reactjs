// import "./ContentDetailPoll.css";
// import TextField from '@mui/material/TextField';
// import { useState, useEffect } from "react";
// import { IconButton, InputAdornment } from "@mui/material";
// import DescriptionIcon from '@mui/icons-material/Description';
// import { getPollById, postVote } from "../../../api/CallApi";
// import { Poll } from "../../../typeObject";
// import { format } from 'date-fns';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import StatisticsDialogPolling from "../StatisticsDialog/StatisticsDialogPolling";
// import StatisticsDialog from "../StatisticsDialog/StatisticsDialog";
// import { useParams } from 'react-router-dom';

// export const ContentDetailPoll: React.FC = () => {
//   const [choices, setChoices] = useState<string[]>([""]);
//   const [descriptions, setDescriptions] = useState<string[]>([""]);
//   const [showDescriptions, setShowDescriptions] = useState<boolean[]>([false]);


//   const { id } = useParams();

//   const [vote, setVote] = useState<Poll | null>(null);
//   useEffect(() => {
//     const fetchVote = async () => {
//       try {
//         if (id) {
//           const response = await getPollById(id);
//           setVote(response.data);
//         } else {
//           console.error("ID is undefined");
//         }
//         // setVote(response.data);

//       } catch (error) {
//         console.error("Error fetching vote data:", error);
//       }
//     };
//     fetchVote();
//   }, [id]);

//   const formattedTimeStart = vote?.timeStart ? format(new Date(vote.timeStart), 'dd/MM/yyyy HH:mm') : '';
//   const formattedTimeEnd = vote?.timeEnd ? format(new Date(vote.timeEnd), 'dd/MM/yyyy HH:mm') : '';

//   const handleVote = async (optionId: string, content: string) => {
//     try {
//       const voteEndDate = vote?.timeEnd ? new Date(vote.timeEnd) : null;

//       if (voteEndDate && voteEndDate > new Date()) {
//         const confirmVote = confirm('Bạn chọn: ' + content);
//         if (confirmVote) {
//           const dataVote = {
//             pollId: null,
//             optionId: optionId,
//             transactionHash: null,
//             userId: null,
//             timestamp: new Date().toISOString(),
//           };
//           console.log(dataVote);
//           await postVote(dataVote);
//           alert('Thành công');
//         } else {
//           alert('Huỷ chọn');
//         }
//       } else {
//         alert('Bình chọn đã kết thúc');
//       }
//     } catch (error) {
//       console.error('Error: ' + error);
//     }
//   };


//   const handleChoiceChangeContent = (index: number, value: string) => {
//     const newChoices = [...choices];
//     newChoices[index] = value;
//     setChoices(newChoices);
//   }

//   const handleDescriptionChangeContent = (index: number, value: string) => {
//     const newDescriptions = [...descriptions];
//     newDescriptions[index] = value;
//     setDescriptions(newDescriptions);
//   }

//   const toggleDescriptionInput = (index: number) => {
//     const newShowDescriptions = [...showDescriptions];
//     newShowDescriptions[index] = !newShowDescriptions[index];
//     setShowDescriptions(newShowDescriptions);
//   }

//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true); // Mở modal khi nhấn vào icon
//   };

//   const handleClose = () => {
//     setOpen(false); // Đóng modal
//   };

//   return (
//     <div className="wrapper_voteform">
//       <h1>DETAIL VOTE</h1>

//       <form>
//         <div className="header_content_form">
//           <div className="header_content_detail_right">
//             <div className="avatar_poll">
//               <img src={vote?.avatar ?? undefined} alt="upload" /> 
//             </div>
//           </div>
//           <div className="header_content_detail_left">
//             <div style={{ display: "flex" }}>
//               <div style={{ width: "90%" }}>
//                 <div className="label">Name vote:</div>
//                 <TextField
//                   className="text_namevote"
//                   value={vote?.title || ''}
//                   inputProps={{ readOnly: true }}
//                   variant="outlined"
//                 />
//               </div>
//               <div style={{ margin: "auto" }}>
//                 <IconButton
//                   onClick={handleClickOpen}
//                   aria-label="statistics"
//                   style={{ transform: 'scale(1.5)' }} // Tăng kích thước nút
//                 >
//                   <AssessmentIcon style={{ fontSize: 50 }} /> {/* Tăng kích thước icon */}
//                 </IconButton>
//               </div>

//               {/* Modal */}
//               <div >
//                 {vote?.timeEnd && new Date(vote.timeEnd).getTime() > new Date().getTime() ? (
//                   <StatisticsDialogPolling open={open} handleClose={handleClose} pollId={vote._id} />
//                 ) : (
//                   vote?._id && <StatisticsDialog open={open} handleClose={handleClose} pollId={vote._id} />
//                 )}
//               </div>
//             </div>
//             <div className="label">Description:</div>
//             <TextField
//               className="text_namevote"
//               value={vote?.description || ''}
//               multiline
//               rows={4}
//               inputProps={{ readOnly: true }}
//               variant="outlined"
//             />
//           </div>
//         </div>
//         <div className="label">Choices:</div>
//         {
//           vote?.options.map((select, index) => (
//             <div key={index} className="choice-wrapper">
//               {/* <p>Số lượng phiếu hiện tại {select.votes.length} </p> */}
//               <TextField
//                 className="text_namechoice"
//                 variant="outlined"
//                 placeholder={`Choice ${index + 1}`}
//                 value={select.contentOption || ''}
//                 onClick={() => handleVote(select._id, select.contentOption)}
//                 onChange={(e) => handleChoiceChangeContent(index, e.target.value)}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         edge="end"
//                         aria-label="add description"
//                         onClick={(e) => {toggleDescriptionInput(index);
//                           e.stopPropagation();}
//                         }
                        
//                       >
//                         <DescriptionIcon />
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               {
//                 showDescriptions[index] && (
//                   <TextField
//                     className="text_description"
//                     variant="outlined"
//                     multiline
//                     style={{ width: "100%", marginBottom: "10px" }}
//                     value={select?.descriptionContentOption || ''}
//                     onChange={(e) => handleDescriptionChangeContent(index, e.target.value)}
//                   />
//                 )
//               }
//             </div>
//           ))
//         }

//         <div className="form_date">
//           <div className="date">
//             <div className="label">Start date:</div>
//             <TextField type="text" value={formattedTimeStart || ''} variant="outlined" />
//           </div>
//           <div className="date">
//             <div className="label">End date:</div>
//             <TextField type="text" value={formattedTimeEnd || ''} variant="outlined" />
//           </div>
//           <div className="date">
//             <div className="label">Type of vote:</div>
//             <TextField type="text" value={vote?.typeContent || ''} variant="outlined" />
//           </div>

//         </div>

//       </form>
//     </div>
//   )
// }