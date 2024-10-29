// {/* <div className="wrapper_detail_vote">
//       <h1>DETAIL VOTE</h1>

//       <form>
//         <div className="header_content_form">
//           <div className="header_content_detail_right">
//             <div className="avatar_poll">
//               <img  alt="upload" /> 
//             </div>
//           </div>
//           <div className="header_content_detail_left">
//             <div style={{ display: "flex" }}>
//               <div style={{ width: "90%" }}>
//                 <div className="label">Name vote:</div>
//                 <TextField
//                   className="text_namevote"
//                 //   value={vote?.title || ''}
//                   inputProps={{ readOnly: true }}
//                   variant="outlined"
//                 />
//               </div>
//               <div style={{ margin: "auto" }}>
//                 <IconButton
//                 //   onClick={handleClickOpen}
//                   aria-label="statistics"
//                   style={{ transform: 'scale(1.5)' }} // Tăng kích thước nút
//                 >
//                   <AssessmentIcon style={{ fontSize: 50 }} /> {/* Tăng kích thước icon */}
//                 </IconButton>
//               </div>

//               {/* Modal */}
//               <div >
//                 {/* {vote?.timeEnd && new Date(vote.timeEnd).getTime() > new Date().getTime() ? (
//                   <StatisticsDialogPolling open={open} handleClose={handleClose} pollId={vote._id} />
//                 ) : (
//                   vote?._id && <StatisticsDialog open={open} handleClose={handleClose} pollId={vote._id} />
//                 )} */}
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
//                 style={{ marginBottom: "10px",width: "100%",backgroundColor: "#f5f5f5" }}
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
//             <TextField type="text" className="labelField" value={formattedTimeStart || ''} variant="outlined" />
//           </div>
//           <div className="date">
//             <div className="label">End date:</div>
//             <TextField type="text" className="labelField" value={formattedTimeEnd || ''} variant="outlined" />
//           </div>
//           <div className="date">
//             <div className="label">Type of vote:</div>
//             <TextField type="text" className="labelField" value={vote?.typeContent || ''} variant="outlined" />
//           </div>
          
//         </div>

//       </form>
//     </div> */}