// import "./ContentDetailPoll.css";
// import TextField from "@mui/material/TextField";
// import { useState, useEffect } from "react";
// import { IconButton, InputAdornment } from "@mui/material";
// import DescriptionIcon from "@mui/icons-material/Description";
// import {
//   getPollById,
//   voteSm,
//   postVote,
//   changeState,
//   postVotePrivate,
//   getVoteByUserIdAndPollId,
//   updateTimeEnd,
//   deletePoll
// } from "../../../api/CallApi";
// import { Poll } from "../../../typeObject";
// import { format } from "date-fns";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import StatisticsDialogPolling from "../StatisticsDialog/StatisticsDialogPolling";
// import StatisticsDialog from "../StatisticsDialog/StatisticsDialog";
// import { useParams } from "react-router-dom";
// import { AuthContext } from "../../../contextapi/AuthContext";
// import React from "react";
// import Swal from "sweetalert2";
// import io from "socket.io-client";
// import { useNavigate } from 'react-router-dom';


// export const ContentDetailPoll: React.FC = () => {
//   const [choices, setChoices] = useState<string[]>([""]);
//   const [descriptions, setDescriptions] = useState<string[]>([""]);
//   const [showDescriptions, setShowDescriptions] = useState<boolean[]>([false]);
//   const authContext = React.useContext(AuthContext);
//   const addRessWallet = authContext?.walletAddress;
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [vote, setVote] = useState<Poll | null>(null);
//   const [votedOptionId, setVotedOptionId] = useState<string | null>(null);

//   const fetchVote = async () => {
//     try {
//       if (id) {
//         console.log("Fetching vote data for poll ID:", id);
//         const response = await getPollById(id);
  
//         if (!response.data) {
//           console.warn("Poll not found! Redirecting to '/'...");
//           navigate('/thenew'); // Chuyển hướng nếu poll không tồn tại
//           return;
//         }
  
//         console.log("Poll data fetched:", response.data);
//         setVote(response.data);
  
//         // Tiếp tục xử lý khi poll tồn tại
//         if (authContext?.user?._id) {
//           console.log("Fetching user's vote for poll ID:", id);
//           const responseVote = await getVoteByUserIdAndPollId({
//             pollId: id,
//             userId: authContext?.user?._id,
//           });
//           console.log("User's vote data fetched:", responseVote.data);
//           if (responseVote.data) {
//             setVotedOptionId(responseVote.data.optionId);
//           }
//         }
//       } else {
//         console.error("Poll ID is undefined");
//       }
//     } catch (error) {
//       console.error("Error fetching vote data:", error);
//     }
//   };
  

//   // Tạo kết nối với server WebSocket
//   useEffect(() => {
//     // Thiết lập kết nối WebSocket
//     const socket = io("http://localhost:3000", { transports: ["websocket"] });

//     // Lắng nghe sự kiện "voteUpdate" từ server
//     socket.on("voteUpdate", (updatedVote) => {
//       if (!updatedVote) {
//         navigate("/poll"); // Ví dụ: chuyển hướng về trang chủ nếu cuộc bình chọn không còn
//       } else {
//         fetchVote();
//       }
//     });

//     // Gọi hàm fetchVote để lấy dữ liệu khi component mount hoặc khi id thay đổi
//     if (!vote) {
//       fetchVote();
//     }

//     // Clean up khi component unmount
//     return () => {
//       socket.disconnect();  // Đảm bảo đóng kết nối socket khi component bị unmount
//     };
//   } , [id, vote, navigate]);
//   const formattedTimeStart = vote?.timeStart
//     ? format(new Date(vote.timeStart), "dd/MM/yyyy HH:mm")
//     : "";
//   const formattedTimeEnd = vote?.timeEnd
//     ? format(new Date(vote.timeEnd), "dd/MM/yyyy HH:mm")
//     : "";

//   const handleVote = async (
//     optionId: string,
//     content: string,
//     optionsId: number
//   ) => {
//     try {
//       if (!vote) {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Không tìm thấy cuộc bình chọn!",
//           showConfirmButton: false,
//           timer: 1500,
//           timerProgressBar: true,
//           showClass: {
//             popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//           },
//           hideClass: {
//             popup: "", // Tắt hiệu ứng biến mất
//           },
//         });

//         return;
//       }

//       const voteEndDate = vote.timeEnd ? new Date(vote.timeEnd) : null;
//       const voteStartDate = vote.timeStart ? new Date(vote.timeStart) : null;

//       // Kiểm tra thời gian bình chọn
//       if (voteStartDate && new Date() < voteStartDate) {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Bình chọn chưa bắt đầu.", showConfirmButton: false,
//           timer: 1500,
//           timerProgressBar: true,
//           showClass: {
//             popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//           },
//           hideClass: {
//             popup: "", // Tắt hiệu ứng biến mất
//           },
//         });

//         return;
//       }

//       if (voteEndDate && new Date() > voteEndDate) {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Bình chọn đã kết thúc.", showConfirmButton: false,
//           timer: 1500,
//           timerProgressBar: true,
//           showClass: {
//             popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//           },
//           hideClass: {
//             popup: "", // Tắt hiệu ứng biến mất
//           },
//         });

//         return;
//       }

//       // Xác nhận bình chọn
//       const confirmVote = confirm("Bạn chọn: " + content);
//       if (!confirmVote) {
//         Swal.fire({
//           icon: "info",
//           title: "Thông tin",
//           text: "Hủy bỏ bình chọn.", showConfirmButton: false,
//           timer: 1500,
//           timerProgressBar: true,
//           showClass: {
//             popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//           },
//           hideClass: {
//             popup: "", // Tắt hiệu ứng biến mất
//           },
//         });

//         return;
//       }

//       // Xử lý bình chọn
//       if (vote.typeContent === "privatesmc") {
//         // Kiểm tra ví đã kết nối
//         if (!authContext?.walletAddress) {
//           Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Vui lòng kết nối ví.", showConfirmButton: false,
//             timer: 1500,
//             timerProgressBar: true,
//             showClass: {
//               popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//             },
//             hideClass: {
//               popup: "", // Tắt hiệu ứng biến mất
//             },
//           });

//           return;
//         }

//         // Kiểm tra `pollIdSm`
//         if (!vote.pollIdSm) {
//           Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Lỗi trong quá trình bình chọn, dữ liệu pollIdSm là null.", showConfirmButton: false,
//             timer: 1500,
//             timerProgressBar: true,
//             showClass: {
//               popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//             },
//             hideClass: {
//               popup: "", // Tắt hiệu ứng biến mất
//             },
//           });

//           return;
//         }

//         // Thực hiện bình chọn trên smart contract 
//         try {
//           if (addRessWallet) {
//             await changeState({
//               pollIdSm: Number(vote.pollIdSm),
//               newState: 1,
//               author: addRessWallet,
//             });
//           } else {
//             console.error("Wallet address is null or undefined");
//             Swal.fire({
//               icon: "error",
//               title: "Oops...",
//               text: "Địa chỉ ví không hợp lệ.", showConfirmButton: false,
//               timer: 1500,
//               timerProgressBar: true,
//               showClass: {
//                 popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//               },
//               hideClass: {
//                 popup: "", // Tắt hiệu ứng biến mất
//               },
//             });

//             return;
//           }

//           // Gửi dữ liệu bình chọn lên backend
//           const dataVote = {
//             pollId: vote._id,
//             optionId: optionId,
//             transactionHash: null,
//             userId: authContext?.user?._id ?? null,
//             timestamp: new Date().toISOString(),
//           };

//           await postVotePrivate(dataVote);
//           await voteSm({
//             pollIdSm: vote.pollIdSm || "",
//             optionId: optionsId,
//             author: addRessWallet || "",
//           });

//           Swal.fire({
//             icon: "success",
//             title: "Thành công",
//             text: "Bình chọn thành công!", showConfirmButton: false,
//             timer: 1500,
//             timerProgressBar: true,
//             showClass: {
//               popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//             },
//             hideClass: {
//               popup: "", // Tắt hiệu ứng biến mất
//             },
//           });

//         } catch (error) {
//           console.error("Error voting:", error);
//           Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Lỗi trong quá trình bình chọn.", showConfirmButton: false,
//             timer: 1500,
//             timerProgressBar: true,
//             showClass: {
//               popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//             },
//             hideClass: {
//               popup: "", // Tắt hiệu ứng biến mất
//             },
//           });

//         }
//       } else if (vote.typeContent === "private") {
//         try {
//           if (authContext?.user) {
//             const dataVote = {
//               pollId: vote._id,
//               optionId: optionId,
//               transactionHash: null,
//               userId: authContext?.user?._id ?? null,
//               timestamp: new Date().toISOString(),
//             };
//             await postVotePrivate(dataVote);
//             Swal.fire({
//               icon: "success",
//               title: "Thành công",
//               text: "Bình chọn thành công!", showConfirmButton: false,
//               timer: 1500,
//               timerProgressBar: true,
//               showClass: {
//                 popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//               },
//               hideClass: {
//                 popup: "", // Tắt hiệu ứng biến mất
//               },
//             });
//           }
//           // Gửi dữ liệu bình chọn lên backend
//           else {
//             Swal.fire({
//               icon: "error",
//               title: "Oops...",
//               text: "Vui lòng đăng nhập để bình chọn.", showConfirmButton: false,
//               timer: 1500,
//               timerProgressBar: true,
//               showClass: {
//                 popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//               },
//               hideClass: {
//                 popup: "", // Tắt hiệu ứng biến mất
//               },
//             });

//             return;
//           }
//         } catch (error) {
//           console.error("Error voting:", error);
//           Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Bạn đã chọn trong cuộc bình chọn này rồi.", showConfirmButton: false,
//             timer: 1500,
//             timerProgressBar: true,
//             showClass: {
//               popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//             },
//             hideClass: {
//               popup: "", // Tắt hiệu ứng biến mất
//             },
//           });
//         }
//       } else {
//         // Bình chọn không sử dụng smart contract
//         const dataVote = {
//           pollId: vote._id,
//           optionId: optionId,
//           transactionHash: null,
//           userId: authContext?.user?._id || null,
//           timestamp: new Date().toISOString(),
//         };

//         try {

//           await postVote(dataVote);
//           Swal.fire({
//             icon: "success",
//             title: "Thành công",
//             text: "Bình chọn thành công!", showConfirmButton: false,
//             timer: 1500,
//             timerProgressBar: true,
//             showClass: {
//               popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//             },
//             hideClass: {
//               popup: "", // Tắt hiệu ứng biến mất
//             },
//           });

//         } catch (error) {
//           console.error("Error voting:", error);
//           Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Bạn đã chọn trong cuộc bình chọn này rồi.", showConfirmButton: false,
//             timer: 1500,
//             timerProgressBar: true,
//             showClass: {
//               popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//             },
//             hideClass: {
//               popup: "", // Tắt hiệu ứng biến mất
//             },
//           });

//         }
//       }
//     } catch (error) {
//       console.error("Error: " + error);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Lỗi trong quá trình bình chọn.",
//         showConfirmButton: false,
//         timer: 1500,
//         showClass: {
//           popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//         },
//         hideClass: {
//           popup: "", // Tắt hiệu ứng biến mất
//         },
//       });

//     }
//   };

//   const handleChoiceChangeContent = (index: number, value: string) => {
//     const newChoices = [...choices];
//     newChoices[index] = value;
//     setChoices(newChoices);
//   };

//   const handleDescriptionChangeContent = (index: number, value: string) => {
//     const newDescriptions = [...descriptions];
//     newDescriptions[index] = value;
//     setDescriptions(newDescriptions);
//   };

//   const toggleDescriptionInput = (index: number) => {
//     const newShowDescriptions = [...showDescriptions];
//     newShowDescriptions[index] = !newShowDescriptions[index];
//     setShowDescriptions(newShowDescriptions);
//   };

//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true); // Mở modal khi nhấn vào icon
//   };

//   const handleClose = () => {
//     setOpen(false); // Đóng modal
//   };
//   const handleDelete = async (id: string) => {
//     await deletePoll(id);
//     navigate("poll");
//     Swal.fire({
//       icon: "success",
//       title: "Thành công",
//       text: "Cuộc bình chọn đã được xóa thành công!",
//       showConfirmButton: false,
//       timer: 1500,
//       timerProgressBar: true,
//       showClass: {
//         popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//       },
//       hideClass: {
//         popup: "", // Tắt hiệu ứng biến mất
//       },
//     })
//   };
  
  
//   const handleEndPoll = async (id: string) => {
//     await updateTimeEnd(id);
//     navigate("thenew");
//     Swal.fire({
//       icon: "success",
//       title: "Thành công",
//       text: "Kết thúc cuộc bình chọn thành công!",
//       showConfirmButton: false,
//       timer: 1500,
//       timerProgressBar: true,
//       showClass: {
//         popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//       },
//       hideClass: {
//         popup: "", // Tắt hiệu ứng biến mất
//       },
//     })
//     // Sau khi kết thúc thành công, chuyển hướng về trang /poll
   
//   };
//   return (
//     <div className="wrapper_detail_vote">
//       <h1>Chi tiết cuộc bình chọn</h1>

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
//                 <div className="label">Tên cuộc bình chọn:</div>
//                 <TextField
//                   className="text_namevote"
//                   value={vote?.title || ""}
//                   inputProps={{ readOnly: true }}
//                   variant="outlined"
//                 />
//               </div>
//               <div style={{ margin: "auto" }}>
//                 <IconButton
//                   onClick={handleClickOpen}
//                   aria-label="statistics"
//                   style={{ transform: "scale(1.5)" }} // Tăng kích thước nút
//                 >
//                   <AssessmentIcon style={{ fontSize: 50 }} />{" "}
//                   {/* Tăng kích thước icon */}
//                 </IconButton>
//               </div>

//               {/* Modal */}
//               <div>
//                 {vote?.timeEnd &&
//                   new Date(vote.timeEnd).getTime() > new Date().getTime() ? (
//                   <StatisticsDialogPolling
//                     open={open}
//                     handleClose={handleClose}
//                     pollId={vote._id}
//                   />
//                 ) : (
//                   vote?._id && (
//                     <StatisticsDialog
//                       open={open}
//                       handleClose={handleClose}
//                       pollId={vote._id}
//                     />
//                   )
//                 )}
//               </div>
//             </div>
//             <div className="label">Miêu tả:</div>
//             <TextField
//               className="text_namevote"
//               value={vote?.description || ""}
//               multiline
//               rows={4}
//               inputProps={{ readOnly: true }}
//               variant="outlined"
//             />
//           </div>
//         </div>
//         <div className="label">Lựa chọn:</div>
//         {vote?.options.map((select, index) => (
//           <div key={index} className="choice-wrapper">
//             <TextField
//               className="text_namechoice"
//               variant="outlined"
//               style={{
//                 marginBottom: "10px",
//                 width: "100%",
//                 backgroundColor: select._id === votedOptionId ? "#44fd24" : "#f5f5f5", // Màu nền đỏ nếu id trùng
//                 border: select._id === votedOptionId ? "2px solid #44fd24" : "none", // Đường viền đỏ nếu id trùng
//               }}
//               placeholder={`Choice ${index + 1}`}
//               value={select.contentOption || ""}
//               onClick={() =>
//                 handleVote(select._id, select.contentOption, index + 1)
//               }
//               onChange={(e) => handleChoiceChangeContent(index, e.target.value)}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       edge="end"
//                       aria-label="add description"
//                       onClick={(e) => {
//                         toggleDescriptionInput(index);
//                         e.stopPropagation();
//                       }}
//                     >
//                       <DescriptionIcon />
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />


//             {showDescriptions[index] && (
//               <div className="text_description">
//                 <div className="avatar-wrapper-description">
//                   {/* Avatar */}
//                   <img
//                     src={select.avatarContentOption || "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-19.jpg"} // Avatar mặc định nếu chưa có
//                     alt="avatar"
//                     className="choice-avatar"
//                   />
//                 </div>
//                 <TextField
//                   className="text_description_field"
//                   variant="outlined"
//                   multiline
//                   style={{ width: "100%", marginBottom: "10px" }}
//                   value={select?.descriptionContentOption || ""}
//                   onChange={(e) =>
//                     handleDescriptionChangeContent(index, e.target.value)
//                   }
//                 />
//               </div>)}
//           </div>
//         ))
//         }

//         <div className="form_date">
//           <div className="date">
//             <div className="label">Ngày bắt đầu:</div>
//             <TextField
//               type="text"
//               className="labelField"
//               value={formattedTimeStart || ""}
//               variant="outlined"
//             />
//           </div>
//           <div className="date">
//             <div className="label">Ngày kết thúc:</div>
//             <TextField
//               type="text"
//               className="labelField"
//               value={formattedTimeEnd || ""}
//               variant="outlined"
//             />
//           </div>
//           <div className="date">
//             <div className="label">Kiểu bình chọn:</div>
//             <TextField
//               type="text"
//               className="labelField"
//               value={vote?.typeContent === "public" ? "Công khai" : vote?.typeContent === "private" ? "Riêng tư" : "Nâng cao"}
//               variant="outlined"
//             />
//           </div>
//           <div className="button_end">
//             {authContext?.user?._id === vote?.authorId && vote?.timeEnd && (
//               // Kiểm tra xem thời gian kết thúc đã qua chưa
//               new Date(vote?.timeEnd).getTime() < Date.now() ? (
//                 <button
//                   onClick={() => handleDelete(vote?._id)}
//                 >
//                   Xoá Poll
//                 </button>
//               ) : (
//                 // Nếu chưa hết thời gian, hiển thị nút Kết thúc
//                 <button
//                   onClick={() => handleEndPoll(vote?._id)}
//                 >
//                   Kết thúc
//                 </button>
//               )
//             )}

//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };


// const handleVote = async (
//     optionId: string,
//     content: string,
//     optionsId: number
//   ) => {
//     try {
//       if (!vote) {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Không tìm thấy cuộc bình chọn!",
//           showConfirmButton: false,
//           timer: 1500,
//           timerProgressBar: true,
//           showClass: {
//             popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//           },
//           hideClass: {
//             popup: "", // Tắt hiệu ứng biến mất
//           },
//         });

//         return;
//       }

//       const voteEndDate = vote.timeEnd ? new Date(vote.timeEnd) : null;
//       const voteStartDate = vote.timeStart ? new Date(vote.timeStart) : null;

//       // Kiểm tra thời gian bình chọn
//       if (voteStartDate && new Date() < voteStartDate) {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Bình chọn chưa bắt đầu.", showConfirmButton: false,
//           timer: 1500,
//           timerProgressBar: true,
//           showClass: {
//             popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//           },
//           hideClass: {
//             popup: "", // Tắt hiệu ứng biến mất
//           },
//         });

//         return;
//       }

//       if (voteEndDate && new Date() > voteEndDate) {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Bình chọn đã kết thúc.", showConfirmButton: false,
//           timer: 1500,
//           timerProgressBar: true,
//           showClass: {
//             popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//           },
//           hideClass: {
//             popup: "", // Tắt hiệu ứng biến mất
//           },
//         });

//         return;
//       }

//       // Xác nhận bình chọn
//       const confirmVote = confirm("Bạn chọn: " + content);
//       if (!confirmVote) {
//         Swal.fire({
//           icon: "info",
//           title: "Thông tin",
//           text: "Hủy bỏ bình chọn.", showConfirmButton: false,
//           timer: 1500,
//           timerProgressBar: true,
//           showClass: {
//             popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//           },
//           hideClass: {
//             popup: "", // Tắt hiệu ứng biến mất
//           },
//         });

//         return;
//       }

//       // Xử lý bình chọn
//       if (vote.typeContent === "privatesmc") {
//         try {
//             if (authContext?.user) {
//                 if (authContext?.walletAddress) {
//                     const checkChangeState = await changeState({
//                         pollIdSm: Number(vote.pollIdSm),
//                         newState: 1,
//                         author: addRessWallet,
//                       });
//                       if(checkChangeState){const check = await voteSm({
//                         pollIdSm: vote.pollIdSm || "",
//                         optionId: optionsId,
//                         author: addRessWallet || "",
//                       });
//                         if (check) {
//                             const dataVote = {
//                                 pollId: vote._id,
//                                 optionId: optionId,
//                                 transactionHash: null,
//                                 userId: authContext?.user?._id ?? null,
//                                 timestamp: new Date().toISOString(),
//                               };
//                               await postVotePrivate(dataVote);
//                               Swal.fire({
//                                 icon: "success",
//                                 title: "Thành công",
//                                 text: "Bình chọn thành công!", showConfirmButton: false,
//                                 timer: 1500,
//                                 timerProgressBar: true,
//                                 showClass: {
//                                   popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//                                 },
//                                 hideClass: {
//                                   popup: "", // Tắt hiệu ứng biến mất
//                                 },
//                               });
//                         } else {
//                             Swal.fire({
//                                 icon: "error",
//                                 title: "Oops...",
//                                 text: "Tài khoản vì này đã vote.", showConfirmButton: false,
//                                 timer: 1500,
//                                 timerProgressBar: true,
//                                 showClass: {
//                                   popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//                                 },
//                                 hideClass: {
//                                   popup: "", // Tắt hiệu ứng biến mất
//                                 },
//                               });
//                               return;
//                         }}
//                       else{Swal.fire({
//                         icon: "error",
//                         title: "Oops...",
//                         text: "Lỗi không lấy PollId của smartcontract.", showConfirmButton: false,
//                         timer: 1500,
//                         timerProgressBar: true,
//                         showClass: {
//                           popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//                         },
//                         hideClass: {
//                           popup: "", // Tắt hiệu ứng biến mất
//                         },
//                       });
          
//                       return;}
//                   }
//                   else {
//                     Swal.fire({
//                       icon: "error",
//                       title: "Oops...",
//                       text: "Vui lòng kết nối ví.", showConfirmButton: false,
//                       timer: 1500,
//                       timerProgressBar: true,
//                       showClass: {
//                         popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//                       },
//                       hideClass: {
//                         popup: "", // Tắt hiệu ứng biến mất
//                       },
//                     });
        
//                     return;
//                   }
//             }
//             // Gửi dữ liệu bình chọn lên backend
//             else {
//               Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text: "Vui lòng đăng nhập để bình chọn.", showConfirmButton: false,
//                 timer: 1500,
//                 timerProgressBar: true,
//                 showClass: {
//                   popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//                 },
//                 hideClass: {
//                   popup: "", // Tắt hiệu ứng biến mất
//                 },
//               });
  
//               return;
//             }
//           } catch (error) {
//             console.error("Error voting:", error);
//             Swal.fire({
//               icon: "error",
//               title: "Oops...",
//               text: "Bạn đã chọn trong cuộc bình chọn này rồi.", showConfirmButton: false,
//               timer: 1500,
//               timerProgressBar: true,
//               showClass: {
//                 popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//               },
//               hideClass: {
//                 popup: "", // Tắt hiệu ứng biến mất
//               },
//             });
//             return;
//           }
//       } else if (vote.typeContent === "private") {
//         try {
//           if (authContext?.user) {
//             const dataVote = {
//               pollId: vote._id,
//               optionId: optionId,
//               transactionHash: null,
//               userId: authContext?.user?._id ?? null,
//               timestamp: new Date().toISOString(),
//             };
//             await postVotePrivate(dataVote);
//             Swal.fire({
//               icon: "success",
//               title: "Thành công",
//               text: "Bình chọn thành công!", showConfirmButton: false,
//               timer: 1500,
//               timerProgressBar: true,
//               showClass: {
//                 popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//               },
//               hideClass: {
//                 popup: "", // Tắt hiệu ứng biến mất
//               },
//             });
//           }
//           // Gửi dữ liệu bình chọn lên backend
//           else {
//             Swal.fire({
//               icon: "error",
//               title: "Oops...",
//               text: "Vui lòng đăng nhập để bình chọn.", showConfirmButton: false,
//               timer: 1500,
//               timerProgressBar: true,
//               showClass: {
//                 popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//               },
//               hideClass: {
//                 popup: "", // Tắt hiệu ứng biến mất
//               },
//             });

//             return;
//           }
//         } catch (error) {
//           console.error("Error voting:", error);
//           Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Bạn đã chọn trong cuộc bình chọn này rồi.", showConfirmButton: false,
//             timer: 1500,
//             timerProgressBar: true,
//             showClass: {
//               popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//             },
//             hideClass: {
//               popup: "", // Tắt hiệu ứng biến mất
//             },
//           });
//         }
//       } else {
//         // Bình chọn không sử dụng smart contract
//         const dataVote = {
//           pollId: vote._id,
//           optionId: optionId,
//           transactionHash: null,
//           userId: authContext?.user?._id || null,
//           timestamp: new Date().toISOString(),
//         };

//         try {

//           await postVote(dataVote);
//           Swal.fire({
//             icon: "success",
//             title: "Thành công",
//             text: "Bình chọn thành công!", showConfirmButton: false,
//             timer: 1500,
//             timerProgressBar: true,
//             showClass: {
//               popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//             },
//             hideClass: {
//               popup: "", // Tắt hiệu ứng biến mất
//             },
//           });

//         } catch (error) {
//           console.error("Error voting:", error);
//           Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Bạn đã chọn trong cuộc bình chọn này rồi.", showConfirmButton: false,
//             timer: 1500,
//             timerProgressBar: true,
//             showClass: {
//               popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//             },
//             hideClass: {
//               popup: "", // Tắt hiệu ứng biến mất
//             },
//           });

//         }
//       }
//     } catch (error) {
//       console.error("Error: " + error);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Lỗi trong quá trình bình chọn.",
//         showConfirmButton: false,
//         timer: 1500,
//         showClass: {
//           popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//         },
//         hideClass: {
//           popup: "", // Tắt hiệu ứng biến mất
//         },
//       });

//     }
//   };


// import "./ContentPollFormLayout.css"
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { useState } from "react";
// import CloseIcon from "@mui/icons-material/Close";
// import { IconButton, InputAdornment } from "@mui/material";
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import DescriptionIcon from '@mui/icons-material/Description';
// import { useLocation } from "react-router-dom";
// import { createPoll, createPrivatePoll, uploadImage } from "../../../../api/CallApi"
// // import { createPoll, createPrivatePoll, getAICheckContent,uploadImage } from "../../../../api/CallApi"
// import { useNavigate } from "react-router-dom";
// import React from "react";
// import { AuthContext } from "../../../../contextapi/AuthContext";
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
// import CircularProgress from '@mui/material/CircularProgress';

// import Swal from "sweetalert2";
// export const ContentPollFormLayout = () => {
//   const authContext = React.useContext(AuthContext);
//   const addRessWallet = authContext?.walletAddress;

//   const { authorId } = useLocation().state as { authorId: string };
//   const [options, setOptions] = useState<string[]>([""]);
//   const [descriptionSelector, setDescriptionSelector] = useState<string[]>([""]);
//   const [showDescriptions, setShowDescriptions] = useState<boolean[]>([false]);
//   const [image, setImage] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const [typeOfVote, setTypeOfVote] = useState('');

//   const [nameVote, setNameVote] = useState("");
//   const [description, setDescription] = useState("")
//   const [startDate, setStartDate] = useState<string | null>(null);
//   const [endDate, setEndDate] = useState<string | null>(null);
//   const [imageUrl, setImageUrl] = useState('');


//   const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newImageUrl = event.target.value;
//     setImageUrl(newImageUrl);
//     setImage(newImageUrl);  // Cập nhật hình ảnh với URL mới
  
//     // Kiểm tra xem URL có hợp lệ hay không (bạn có thể thêm logic kiểm tra URL ở đây)
//     if (newImageUrl) {
//       console.log('Đường dẫn ảnh đã được nhập:', newImageUrl);
//     } else {
//       console.error('URL không hợp lệ!');
//     }
//   };
  

//   // Hàm xử lý khi người dùng chọn ảnh từ input file
//   const handleChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const file = event.target.files[0];
      
//       // Gọi hàm uploadImage để upload file
//       const formData = new FormData();
//       formData.append('file', file);
//       const uploadedImageUrl = await uploadImage(formData);
      
//       if (uploadedImageUrl) {
//         setImage(uploadedImageUrl);  // Cập nhật với đường link ảnh đã upload
//         setImageUrl(uploadedImageUrl); // Cập nhật URL ảnh
//       } else {
//         console.error('Upload ảnh không thành công');
//       }
//     }
//   };

//   const handleChange = (event: SelectChangeEvent) => {
//     setTypeOfVote(event.target.value as string);
//   };
//   const handleAddChoice = () => {
//     setOptions([...options, ""]);
//     setDescriptionSelector([...descriptionSelector, ""]);
//     setShowDescriptions([...showDescriptions, false]);
//   }

//   const handleChoiceChangeContent = (index: number, value: string) => {
//     const newChoices = [...options];
//     newChoices[index] = value;
//     setOptions(newChoices);
//   }

//   const handleDescriptionChangeContent = (index: number, value: string) => {
//     const newDescriptions = [...descriptionSelector];
//     newDescriptions[index] = value;
//     setDescriptionSelector(newDescriptions);
//   }

//   const handleDeleteChoice = (index: number) => {
//     const newChoices = options.filter((_, i) => i !== index);
//     const newDescriptions = descriptionSelector.filter((_, i) => i !== index);
//     const newShowDescriptions = showDescriptions.filter((_, i) => i !== index);
//     setOptions(newChoices);
//     setDescriptionSelector(newDescriptions);
//     setShowDescriptions(newShowDescriptions);
//   }

//   const toggleDescriptionInput = (index: number) => {
//     const newShowDescriptions = [...showDescriptions];
//     newShowDescriptions[index] = !newShowDescriptions[index];
//     setShowDescriptions(newShowDescriptions);
//   }
//   //
//   const [loading, setLoading] = useState(false);

//   const handleCreateVote = async () => {
//     setLoading(true); // Bắt đầu quá trình tải
//     if (!authorId || !nameVote || !description || options.length === 0 || !typeOfVote || !startDate || !endDate) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Vui lòng nhập đầy đủ thông tin trước khi tạo!',
//         showConfirmButton: false,
//         timer: 1500,
//         timerProgressBar: true,
//         showClass: {
//           popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//         },
//         hideClass: {
//           popup: "", // Tắt hiệu ứng biến mất
//         },
//       })
//       setLoading(false);
//       return;
//     }


//     // const checkNameVote = await getAICheckContent(nameVote);
//     // if (checkNameVote === "NEGATIVE") {
//     //   Swal.fire({
//     //     icon: 'error',
//     //     title: 'Oops...',
//     //     text: 'Tên bình chọn có từ không chuẩn mực đạo đức! Vui lòng nhập lại!',
//     //     showConfirmButton: false,
//     //     timer: 1500,
//     //     timerProgressBar: true,
//     //     showClass: {
//     //       popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//     //     },
//     //     hideClass: {
//     //       popup: "", // Tắt hiệu ứng biến mất
//     //     },

//     //   })
//     //   setLoading(false);
//     //   return;
//     // }
//     // const checkDescription = await getAICheckContent(description);
//     // if (checkDescription === "NEGATIVE") {
//     //   Swal.fire({
//     //     icon: 'error',
//     //     title: 'Oops...',
//     //     text: 'Miêu tả bình chọn có từ không chuẩn mực đạo đức! Vui lòng nhập lại!',
//     //     showConfirmButton: false,
//     //     timer: 1500,
//     //     timerProgressBar: true,
//     //     showClass: {
//     //       popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//     //     },
//     //     hideClass: {
//     //       popup: "", // Tắt hiệu ứng biến mất
//     //     },

//     //   })
//     //   setLoading(false);
//     //   return;
//     // }

//     // const checkOptions = await Promise.all(options.map(async (option, index) => {
//     //   try {
//     //     const result = await getAICheckContent(option);
//     //     return { result, index, option }; // Trả về đối tượng chứa kết quả, vị trí và nội dung
//     //   } catch (error) {
//     //     console.error(`Error at option ${index}:`, option, error);
//     //     return { result: "ERROR", index, option }; // Nếu có lỗi trong quá trình gọi getAICheckContent
//     //   }
//     // }));
    
//     // // Kiểm tra nếu có bất kỳ lựa chọn nào có "NEGATIVE"
//     // const negativeOption = checkOptions.find(item => item.result === "NEGATIVE");
    
//     // if (negativeOption) {
//     //   Swal.fire({
//     //     icon: 'error',
//     //     title: 'Oops...',
//     //     text: `Lựa chọn ở vị trí ${negativeOption.index + 1} không chuẩn mực đạo đức! Nội dung: "${negativeOption.option}"`,
//     //     showConfirmButton: false,
//     //     timer: 2500,
//     //     timerProgressBar: true,
//     //     showClass: {
//     //       popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//     //     },
//     //     hideClass: {
//     //       popup: "", // Tắt hiệu ứng biến mất
//     //     },
//     //   });
//     //   setLoading(false);
//     //   return;
//     // }
    

//     // const checkDescriptionSelector = await Promise.all(descriptionSelector.map(async (description) => {
//     //   return await getAICheckContent(description);
//     // }));

//     // if (checkDescriptionSelector.includes("NEGATIVE")) {
//     //   Swal.fire({
//     //     icon: 'error',
//     //     title: 'Oops...',
//     //     text: 'Miêu tả lựa chọn có từ không chuẩn mực đạo đức! Vui lòng nhập lại!',
//     //     showConfirmButton: false,
//     //     timer: 1500,
//     //     timerProgressBar: true,
//     //     showClass: {
//     //       popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//     //     },
//     //     hideClass: {
//     //       popup: "", // Tắt hiệu ứng biến mất
//     //     },

//     //   })
//     //   return;
//     // }


//     const voteData: {
//       authorId: string;
//       title: string;
//       description: string;
//       options: {
//         contentOption: string;
//         additonalContentOption: string;
//         descriptionContentOption: string;
//         avatarContentOption: string;
//         votes: never[];
//       }[];
//       avatar: string;
//       typeContent: string;
//       timeStart: string;
//       timeEnd: string;
//       timeCreate: string;
//       pollIdSm: string | null;
//     } = {
//       authorId: authorId,
//       title: nameVote,
//       description: description,
//       options: options.map((choice, index) => ({
//         contentOption: choice,
//         additonalContentOption: "",
//         avatarContentOption: avatarItemUrls[index] || "",
//         descriptionContentOption: descriptionSelector[index],
//         votes: []
//       })),
//       avatar: image || "",
//       typeContent: typeOfVote,
//       timeStart: startDate,
//       timeEnd: endDate,
//       timeCreate: new Date().toISOString(),
//       pollIdSm: null
//     };

//     try {
//       if (voteData.typeContent === "privatesmc") {
//         if (!addRessWallet) {
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'Vui lòng kết nối ví trước khi tạo!',
//             showConfirmButton: false,
//             timer: 1500,
//             timerProgressBar: true,
//             showClass: {
//               popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//             },
//             hideClass: {
//               popup: "", // Tắt hiệu ứng biến mất
//             },
//           })
//           setLoading(false);
//           return;
//         }
//         try {
//           const reponse = await createPrivatePoll({
//             title: nameVote,
//             author: addRessWallet,
//             options: options.map((choice) => ({
//               contentOption: choice
//             })),
//           });
//           if (reponse) {
//             Swal.fire({
//               icon: 'success',
//               title: 'Tạo bình chọn thành công!',
//               showConfirmButton: false,
//               timer: 1500,
//               timerProgressBar: true,
//               showClass: {
//                 popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//               },
//               hideClass: {
//                 popup: "", // Tắt hiệu ứng biến mất
//               },
//             })
  
//             if (reponse) {
//               voteData.pollIdSm = reponse || null;
//             }
//             await createPoll(voteData);
//             navigate("/poll");
//           }else{
//             Swal.fire({
//               icon: 'success',
//               title: 'Không nhận được poll id!',
//               showConfirmButton: false,
//               timer: 1500,
//               timerProgressBar: true,
//               showClass: {
//                 popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
//               },
//               hideClass: {
//                 popup: "", // Tắt hiệu ứng biến mất
//               },
//             });
//           }
//         }
//         catch (error) {
//           console.log(error);
//         }
//       }
//       else {
//         await createPoll(voteData);
//         navigate("/poll");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     setLoading(false); // Khi kết thúc quá trình
//   };

//   const [avatarItemUrls, setAvatarItemUrls] = useState<string[]>([]);

//   const handleAvatarItem = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]; // Lấy file ảnh từ input
  
//     if (!file) {
//       console.error('Không có tệp được chọn!');
//       return;
//     }
  
//     try {
//       // Gọi hàm uploadImage để upload file và lấy URL ảnh đã upload
//       const formData = new FormData();
//       formData.append('file', file);
//       const uploadedImageUrl = await uploadImage(formData);
  
//       if (uploadedImageUrl) {
//         // Cập nhật URL ảnh đã upload vào avatarUrls
//         const newAvatarUrls = [...avatarItemUrls];
//         newAvatarUrls[index] = uploadedImageUrl; // Cập nhật URL ảnh cho index tương ứng
//         setAvatarItemUrls(newAvatarUrls); // Cập nhật trạng thái
//         console.log(`Avatar cho index ${index} đã được cập nhật thành công với URL: ${uploadedImageUrl}`);
//       } else {
//         console.error('Upload ảnh không thành công');
//       }
//     } catch (error) {
//       console.error('Lỗi khi upload ảnh:', error);
//     }
//   };
  


//   return (
//     <div className={`wrapper_voteform ${loading ? "loading-active" : ""}`}>
//       {loading ? (
//         <div className="loading-container">
//           <CircularProgress />
//           <p>Đang tải...</p>
//         </div>
//       ) : (
//         <div className="form-container">

//         </div>
//       )}
//       <h1>TẠO BÌNH CHỌN MỚI</h1>
//       <form>
//         <div className="header_content_form">
//           <div className="header_content_form_right">
//             <label htmlFor="upload_image_vote" className="upload_area">
//               <input
//                 type="file"
//                 id="upload_image_vote"
//                 onChange={handleChangeImage}
//                 style={{ display: 'none' }}
//               />
//               {image ? (
//                 <img src={image} alt="vote_image" />
//               ) : (
//                 <Button
//                   variant="contained"
//                   className="upload_button"
//                   component="span"
//                 >
//                   Upload image
//                 </Button>
//               )}
//             </label>
//             <div>
//               <input
//                 type="text"
//                 placeholder="Enter image URL"
//                 value={imageUrl}
//                 onChange={handleUrlChange}
//               />
//             </div>
//           </div>
//           <div className="header_content_form_left">
//             <div className="label">Tên bình chọn:</div>
//             <TextField className="text_namevote" onChange={(e) => setNameVote(e.target.value)} variant="outlined" />
//             <div className="label">Miêu tả:</div>
//             <TextField className="text_namevote" onChange={(e) => { setDescription(e.target.value) }} multiline rows={4} variant="outlined" />
//           </div>
//         </div>
//         <div className="label">Danh sách lựa chọn:</div>
//         {
//           options.map((choice, index) => (
//             <div key={index} className="choice-wrapper">
//               <TextField
//                 className="text_namechoice"
//                 variant="outlined"
//                 placeholder={`Lựa chọn ${index + 1}`}
//                 value={choice}
//                 onChange={(e) => handleChoiceChangeContent(index, e.target.value)}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         edge="end"
//                         aria-label="add description"
//                         onClick={() => toggleDescriptionInput(index)}
//                       >
//                         <DescriptionIcon />
//                       </IconButton>
//                       <IconButton
//                         edge="end"
//                         aria-label="remove choice"
//                         onClick={() => handleDeleteChoice(index)}
//                       >
//                         <CloseIcon />
//                       </IconButton>
//                     </InputAdornment>
//                   )
//                 }}
//               />
//               {
//                 showDescriptions[index] && (
//                   <div className="text_description">
//                     <div className="avatar-wrapper-description">
//                       {/* Avatar */}
//                       <img
//                         src={avatarItemUrls[index] || "https://via.placeholder.com/30"} // Avatar mặc định nếu chưa có
//                         alt="avatar"
//                         className="choice-avatar"
//                       />
//                       {/* Thêm nút thay đổi avatar */}
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => handleAvatarItem(index, e)}
//                         style={{ display: 'none' }}
//                         id={`avatar-upload-${index}`}
//                       />
//                       <label htmlFor={`avatar-upload-${index}`}>
//                         <IconButton component="span" aria-label="change avatar">
//                           <CameraAltIcon />
//                         </IconButton>
//                       </label>
//                     </div>
//                     <TextField
//                       className="text_description_field"
//                       variant="outlined"
//                       placeholder={`Miêu tả lựa chọn ${index + 1}`}
//                       multiline
//                       style={{ width: "100%", marginBottom: "10px" }}
//                       value={descriptionSelector[index]}
//                       onChange={(e) => handleDescriptionChangeContent(index, e.target.value)}
//                     />
//                   </div>
//                 )
//               }
//             </div>
//           ))
//         }


//         <Button variant="contained"
//           onClick={handleAddChoice}
//           sx={{ textTransform: 'none' }}
//           color="success">Thêm lựa chọn</Button>
//         <div className="form_date">
//           <div className="date">
//             <div className="label">Ngày bắt đầu:</div>
//             <TextField type="datetime-local" onChange={(e) => { setStartDate(e.target.value) }} variant="outlined" />
//           </div>
//           <div className="date">
//             <div className="label">Ngày kết thúc:</div>
//             <TextField type="datetime-local" onChange={(e) => { setEndDate(e.target.value) }} variant="outlined" />
//           </div>
//           <div className="date">
//             <div className="label">Kiểu bình chọn:</div>
//             <FormControl fullWidth>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={typeOfVote}
//                 onChange={handleChange}
//               >
//                 <MenuItem value={"public"}>Công khai</MenuItem>
//                 <MenuItem value={"private"}>Riêng tư</MenuItem>
//                 <MenuItem value={"privatesmc"}>với smartcontract</MenuItem>
//               </Select>
//             </FormControl>
//           </div>
//         </div>
//         <div style={{ display: "flex", justifyContent: "end" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleCreateVote}
//             sx={{ textTransform: 'none', margin: "15px" }}
//           >
//             Tạo
//           </Button>
//         </div>
//       </form>
//     </div>

//   )
// }


// try {
//     // Thực hiện song song hai hàm
//     const [voteSmResult] = await Promise.all([
//       voteSm({
//         pollIdSm: vote.pollIdSm || "",
//         optionId: optionsId,
//         author: addRessWallet || "",
//       }),
//       postVotePrivate({
//         pollId: vote._id,
//         optionId: optionId,
//         transactionHash: Number(vote.pollIdSm),
//         userId: authContext?.user?._id ?? null,
//         timestamp: new Date().toISOString(),
//       }),
//     ]);
  
//     // Kiểm tra kết quả từ voteSm
//     if (!voteSmResult) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Tài khoản ví này đã vote.",
//         showConfirmButton: false,
//         timer: 1500,
//         timerProgressBar: true,
//         showClass: {
//           popup: "swal2-no-animation",
//         },
//         hideClass: {
//           popup: "",
//         },
//       });
//       return;
//     }
  
//     // Nếu cả hai hàm thành công
//     Swal.fire({
//       icon: "success",
//       title: "Thành công",
//       text: "Bình chọn thành công!",
//       showConfirmButton: false,
//       timer: 1500,
//       timerProgressBar: true,
//       showClass: {
//         popup: "swal2-no-animation",
//       },
//       hideClass: {
//         popup: "",
//       },
//     });
//   } catch (error) {
//     // Xử lý lỗi nếu một trong hai hàm thất bại
//     console.error("Error during voting process:", error);
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: "Đã xảy ra lỗi trong quá trình bình chọn.",
//       showConfirmButton: false,
//       timer: 1500,
//       timerProgressBar: true,
//       showClass: {
//         popup: "swal2-no-animation",
//       },
//       hideClass: {
//         popup: "",
//       },
//     });
//   }