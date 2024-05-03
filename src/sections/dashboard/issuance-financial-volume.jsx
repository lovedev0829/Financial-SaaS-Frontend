import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Chart, { useChart } from 'src/components/chart';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// ----------------------------------------------------------------------

export default function IssuanceFinancialVolume({ title, chart, ...other }) {
  const {
    colors = [
      ['#69ADFF', '#69ADFF'],
      ['#69ADFF', '#69ADFF'],
    ],
    categories,
    series,
    options,
  } = chart;

  const popover = usePopover();

  const [seriesData, setSeriesData] = useState('2019');

  const chartOptions = useChart({
    colors: colors.map((colr) => colr[1]),
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: colors.map((colr) => [
          { offset: 10, color: colr[0], opacity: 0.3 },
          { offset: 90, color: colr[1], opacity: 0.1 },
        ]),
      },
    },
    xaxis: {
      categories,
    },
    ...options,
  });

  const handleChangeSeries = useCallback(
    (newValue) => {
      popover.onClose();
      setSeriesData(newValue);
    },
    [popover]
  );

  return (
    <>
      <Card {...other}>
        <CardHeader
          title={title}
          action={
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker views={['month', 'year']} />
            </LocalizationProvider>
          }
        />
        <Box sx={{ flexGrow: 1, mt: 3 }}>
          <Grid container spacing={2} sx={{ justifyContent: 'flex-end' }}>
            <Grid xs={12} xl={3}>
              <TextField
                xs={12}
                type="text"
                placeholder="Search for something"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid xs={12} md={2.5}>
              <Select xs={12} value={0} id="assetSubtype">
                <MenuItem value={0} selected>
                  Asset Subtype
                </MenuItem>
                <MenuItem value={10}>LCI</MenuItem>
                <MenuItem value={20}>LCA</MenuItem>
                <MenuItem value={30}>CDB</MenuItem>
              </Select>
            </Grid>
            <Grid xs={12} md={2.5}>
              <Select xs={12} value={0} id="distributor">
                <MenuItem value={0} selected>
                  Distributor
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Box>
        {series.map((item) => (
          <Box key={item.year} sx={{ mt: 3, mx: 3 }}>
            {item.year === seriesData && (
              <Chart
                dir="ltr"
                type="area"
                series={item.data}
                options={chartOptions}
                width="100%"
                height={364}
              />
            )}
          </Box>
        ))}
      </Card>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 140 }}>
        {series.map((option) => (
          <MenuItem
            key={option.year}
            selected={option.year === seriesData}
            onClick={() => handleChangeSeries(option.year)}
          >
            {option.year}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}

IssuanceFinancialVolume.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
};
