// import * as React from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import { UsersManagement } from '../UsersManagement/UsersManagement';
// import { InputSearchAdmin } from '../InputSearchAdmin/InputSearchAdmin';
// // import { PollsManagement } from '../PollsManagement/PollsManagement';
// import { useNavigate } from 'react-router-dom';
// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function CustomTabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// export default function ContentTabsAdmin() {
//   const [value, setValue] = React.useState(0);
//   const navigate = useNavigate();
  
//   const handleChange = (_: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
  
//       navigate('/home'); // Chuyển hướng về trang home
    
//   };

//   return (
//     <Box sx={{ width: '90vw', position: 'relative', top: '70px', margin: 'auto' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "space-between" }}>
//         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//           <Tab label="List user" {...a11yProps(0)}
//            sx={{ textTransform: 'none' }} />
//         </Tabs>
//         <div style={{ margin: "10px 0" }}>
//           < InputSearchAdmin />
//         </div>
//       </Box>
//       <div style={{ overflow: "auto" }}>
//         <CustomTabPanel value={value} index={0}>
//           <UsersManagement />
//         </CustomTabPanel>
//       </div>
//     </Box>
//   );
// }
