import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ContentTabsAdmin() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '90vw', position: 'relative', top: '70px', margin: 'auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="List user" {...a11yProps(0)} sx={{ textTransform: 'none' }} />
          <Tab label="List poll" {...a11yProps(1)} sx={{ textTransform: 'none' }} />
          <Tab label="List comment" {...a11yProps(2)} sx={{ textTransform: 'none' }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <UsersManagement />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        item two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        item three
      </CustomTabPanel>
    </Box>
  );
}
