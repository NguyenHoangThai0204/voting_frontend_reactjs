// import React from 'react'
// import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
// import '../UsersManagement/UsersManagement.css';
// import AddIcon from '@mui/icons-material/Add';
// import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
// import { FormAddComment } from './FormAddComment/FormAddComment';
// import { TheNew } from '../../../typeObject';
// // import {getAllTheNews} from '../../../api/CallApi'

// export const BookManagement = () => {

//   const [open, setOpen] = React.useState(false);
//   // eslint-disable-next-line
//   const [listTheNew, setListTheNew] = React.useState<TheNew[]>([])

//   const handleAddClick = () => {
//     setOpen(true);
//   }
//   const handleClose = () => {
//     setOpen(false);
//   };

//   React.useEffect(()=>{
//     const fetchTheNew = async () =>{
//       try{
//         const response = await getAllTheNews()
//         setListTheNew(Array.isArray(response.data) ? 
//         response.data : [response.data]); 
//       }catch(error){
//         console.log("Error fetching the news data ", error);
//       }
//     };
//     fetchTheNew();
//   }, [])

//   return (+
//     <div className="usersManagement">
//       <div className="userManaLeft">
//         <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
//           <div style={{ display: "flex", alignItems: "center", width: "50%" }}>
//             <h3>Search: </h3>
//           </div>
//           {/* <InputSearchAdmin /> */}
//           <div>
//             <AddIcon style={{ fontSize: "45px", color: "black" , marginRight:"2px"}} 
//               onClick={handleAddClick}
//             />
//             <MenuTwoToneIcon style={{ fontSize: "45px", color: "black" }} 
//             //   onClick={handleMenuClick}
//             />
//           </div>
//         </div>
//         <table className="table table-striped" style={{ width: '100%', marginTop: "5px" }} border={1}>
//           <thead>
//             <tr>
//               <th scope="col">ID</th>
//               <th scope="col">Tên bài viết</th>
//               <th scope="col">Chủ đề</th>
//               <th scope="col">Avatar</th>
//             </tr>
//           </thead>
//           <tbody>

//               {/* {
//                 listTheNew.map((theNew)=>(
//                   <tr className='trrow'>
//                   <td>1</td>
//                   <td>{theNew?.tenBaiViet}</td>
//                   <td>{theNew.chuDeBaiViet}</td>
//                   <td><img src={theNew?.hinhAnhBaiViet} alt="avatar" style={{ width: '50px', height: '50px' }} /></td>
//                 </tr>
//                 ))
//               } */}
//           </tbody>
//         </table>
//       </div>
//       <div className="userManaRight">
//         {/* <DetailUsersManagement userItem={userItem} pollItem={polls}/> */}
//       </div>
//       <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">
//         <DialogContent>
//               <FormAddComment />
//         </DialogContent>
//         <DialogActions>
//                     <Button onClick={handleClose} color="primary">Close</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   )
// }
