import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import { Box, Stack } from '@mui/system';
import Button from '@mui/material/Button';
import { Tab, Card, Tabs, CardHeader } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import TrackTable from './track-table';

export default function TrackView({ tablist, title, ...other }) {
  const [currentTab, setCurrentTab] = useState('confirmed');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Card {...other} sx={{ p: 1 }}>
      <CardHeader title={title} />
      <Box sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Tabs value={currentTab} onChange={handleChangeTab}>
            {tablist.slice(0, 4).map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>
          <Stack direction="row" gap={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangePicker localeText={{ start: 'From Date', end: 'To Date' }} />
            </LocalizationProvider>
            <Button size="large" variant="contained" color="primary">
              All
            </Button>
          </Stack>
        </Stack>
        {tablist.slice(0, 4).map(
          (tab) =>
            tab.value === currentTab && (
              <Stack sx={{ p: 1 }} key={tab.value}>
                <TrackTable />
              </Stack>
            )
        )}
      </Box>
    </Card>
  );
}

TrackView.propTypes = {
  tablist: PropTypes.array,
  title: PropTypes.string,
};
