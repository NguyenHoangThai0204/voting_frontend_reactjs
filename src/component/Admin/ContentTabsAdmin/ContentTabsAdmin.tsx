import * as React from 'react';

import Box from '@mui/material/Box';
import { UsersManagement } from '../UsersManagement/UsersManagement';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}



export default function ContentTabsAdmin() {

  return (
    
    <Box sx={{ width: '95vw', position: 'relative', top: '70px', margin: 'auto' }}>
      <div><h1 style={{textAlign:"center"}}>Admin</h1></div>
      <div style={{ overflow: "auto" }}>
        <CustomTabPanel value={0} index={0}>
          <UsersManagement />
        </CustomTabPanel>
      </div>
    </Box>
  );
}
