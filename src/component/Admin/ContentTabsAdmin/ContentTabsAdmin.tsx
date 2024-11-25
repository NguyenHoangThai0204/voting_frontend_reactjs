// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import { UsersManagement } from '../UsersManagement/UsersManagement';
// import { BookManagement } from '../BookManagement/BookManagement';
// import { InputSearchAdmin } from '../InputSearchAdmin/InputSearchAdmin';

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
//       {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
//     </div>
//   );
// }

// export default function ContentTabsAdmin() {
//   const [tabIndex, setTabIndex] = React.useState(0);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabIndex(newValue);
//   };

//   return (
//     <Box sx={{ width: '95vw', position: 'relative', top: '70px', bottom:'70px',margin: 'auto' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
//         <Tabs value={tabIndex} onChange={handleChange} aria-label="admin tabs">
//           <Tab label="Quản lí người dùng" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
//           <Tab label="Quản lí bài viết" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
//           <Tab label="Tab 3" id="simple-tab-2" aria-controls="simple-tabpanel-2" />
//         </Tabs>
//         <InputSearchAdmin />
//       </Box>
//       <div style={{ overflow: "auto", padding:0 }}>
//         {/* Tab Panels */}
//         <CustomTabPanel value={tabIndex} index={0}>
//           <UsersManagement />
//         </CustomTabPanel>
//         <CustomTabPanel value={tabIndex} index={1}>
//           <BookManagement />
//         </CustomTabPanel>
//         <CustomTabPanel value={tabIndex} index={2}>
//           <h2>Content for Tab 3</h2>
//           <p>This is the content for the third tab.</p>
//         </CustomTabPanel>
//       </div>
//     </Box>
//   );
// }








import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { UsersManagement } from '../UsersManagement/UsersManagement';
import { BookManagement } from '../BookManagement/BookManagement';
import { InputSearchAdmin } from '../InputSearchAdmin/InputSearchAdmin';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

export default function ContentTabsAdmin() {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '95vw', position: 'relative', top: '70px', bottom:'70px',margin: 'auto', height:'auto' }}>
      <Box sx={{ borderBottom: 1, position:'sticky', top: '70px',borderColor: 'divider',display:"flex", alignItems:'center', backgroundColor:'rgb(226, 240, 231)'}}>
        <Tabs value={tabIndex} onChange={handleChange} aria-label="admin tabs"
        sx={{width:'50%'}}>
          <Tab label="Quản lí người dùng" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
          <Tab label="Quản lí bài viết" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
          <Tab label="Tab 3" id="simple-tab-2" aria-controls="simple-tabpanel-2" />
        </Tabs>
        <div style={{width:'50%',}}><InputSearchAdmin currentTab={tabIndex} /></div>
      </Box>
      <div>
        <CustomTabPanel value={tabIndex} index={0}>
          <UsersManagement />
        </CustomTabPanel>
        <CustomTabPanel value={tabIndex} index={1}>
          <BookManagement />
        </CustomTabPanel>
        {/* <CustomTabPanel value={tabIndex} index={2}>
          <h2>Content for Tab 3</h2>
          <p>This is the content for the third tab.</p>
        </CustomTabPanel> */}
      </div>
    </Box>
  );
}
