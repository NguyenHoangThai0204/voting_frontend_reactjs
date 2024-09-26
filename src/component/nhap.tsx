// import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../../contextapi/AuthContext';
// import { Select, MenuItem } from '@mui/material';
// import axios from 'axios';
// import './ContentInformation.css';

// const ContentInformation = () => {
//   const authContext = useContext(AuthContext);
//   const user = authContext?.user;
//   const isLogged = authContext?.isLogged;

//   interface Location {
//     code: string;
//     name: string;
//   }

//   const [provinces, setProvinces] = useState<Location[]>([]);
//   const [districts, setDistricts] = useState<Location[]>([]);
//   const [wards, setWards] = useState<Location[]>([]);
//   const [selectedProvince, setSelectedProvince] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [selectedWard, setSelectedWard] = useState('');

//   useEffect(() => {
//     axios.get('https://provinces.open-api.vn/api/p/')
//       .then(response => setProvinces(response.data))
//       .catch(error => console.error('Error fetching provinces:', error));
//   }, []);

//   useEffect(() => {
//     if (selectedProvince) {
//       axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
//         .then(response => {
//           setDistricts(response.data.districts);
//           setWards([]);
//         })
//         .catch(error => console.error('Error fetching districts:', error));
//     }
//   }, [selectedProvince]);

//   useEffect(() => {
//     if (selectedDistrict) {
//       axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
//         .then(response => setWards(response.data.wards))
//         .catch(error => console.error('Error fetching wards:', error));
//     }
//   }, [selectedDistrict]);

//   if (!isLogged) {
//     return <p>Please log in to see user information.</p>;
//   }

//   return (
//     <div>
//       <h1>User Information</h1>
//       {user ? (
//         <div>
//           <p><strong>ID:</strong> {user._id}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Full Name:</strong> {user.fullName}</p>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <p><strong>Address:</strong></p>
//               <p>Province:</p>
//               <Select
//                 value={selectedProvince}
//                 value={user.province}
//                 onChange={(e) => setSelectedProvince(e.target.value)}
//                 displayEmpty
//                 className='tenTinh'
//                 size='medium'
//               >
//                 <MenuItem value="" disabled>Select a Province</MenuItem>
//                 {provinces.map(province => (
//                   <MenuItem key={province.code} style={{ fontSize: "1.5rem" }} value={province.code}>
//                     {province.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//               <p>District:</p>
//               <Select
//                 value={selectedDistrict}
//                 onChange={(e) => setSelectedDistrict(e.target.value)}
//                 displayEmpty
//                 className='tenHuyen'
//                 disabled={!selectedProvince}
//               >
//                 <MenuItem value="" disabled>Select a District</MenuItem>
//                 {districts.map(district => (
//                   <MenuItem key={district.code} style={{ fontSize: "1.5rem" }} value={district.code}>
//                     {district.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//               <p>Ward:</p>
//               <Select
//                 value={selectedWard}
//                 onChange={(e) => setSelectedWard(e.target.value)}
//                 displayEmpty
//                 className='tenXa'
//                 disabled={!selectedDistrict}
//               >
//                 <MenuItem value="" disabled>Select a Ward</MenuItem>
//                 {wards.map(ward => (
//                   <MenuItem key={ward.code} style={{ fontSize: "1.5rem" }} value={ward.code}>
//                     {ward.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             <div>
//               <p>Street:</p>
//               {/* Add input for street here */}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>No user information available.</p>
//       )}
//     </div>
//   );
// };

// export default ContentInformation;