import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import InsertChartIcon from '@mui/icons-material/InsertChart';

import Label from 'src/components/label';
import Chart, { useChart } from 'src/components/chart';

import { fNumber, fPercent } from '../../utils/format-number';
// ----------------------------------------------------------------------

export default function AppWidgetSummary({ title, percent, total, chart, sx, ...other }) {
  const { colors = [['white', 'white']], series, options } = chart;

  const chartOptions = useChart({
    colors: colors.map((colr) => colr[1]),
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: colors.map((colr) => [
          { offset: 30, color: colr[0], opacity: 0.1 },
          { offset: 70, color: colr[1], opacity: 0.3 },
        ]),
      },
    },
    chart: {
      animations: {
        enabled: true,
      },
      sparkline: {
        enabled: true,
      },
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
    },
    ...options,
  });

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Stack container direction="row" spacing={2}>
          <Stack spacing={2}>
            <IconComponent title={title} />
          </Stack>
          <Stack direction="column">
            <Typography fontSize={20}>{title}</Typography>
            <Stack direction="row">
              <Typography fontSize={20}>R$ 25,463</Typography>
              <Typography variant="subtitle1" fontSize={14} mt={1}>
                .58
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2, mb: 1 }}>
            <Label
              style={{
                fontSize: '12px',
                color: '#0eab84',
                backgroundColor: '#b0e9ef',
                padding: '12px',
                borderRadius: '20px',
              }}
            >
              {percent > 0 && '+'}
              {fPercent(percent)}
              <NorthEastIcon sx={{ width: '15px', marginBottom: '9px' }} />
            </Label>
            <Typography fontSize={12}>Last 7 days activity</Typography>
          </Stack>
          <Stack justifyContent="space-around">
            <Chart
              dir="ltr"
              type="area"
              series={[{ data: series }]}
              options={chartOptions}
              width={86}
              height={54}
            />
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}

export const IconComponent = ({ title }) => {
  const boxStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '50px',
    height: '50px',
    backgroundColor: '#82d9e1',
    borderRadius: '50%',
  };

  switch (title) {
    case 'Issuance volume':
      return (
        <Box sx={{ ...boxStyle, backgroundColor: '#82d9e1' }}>
          <InsertChartIcon sx={{ width: 30, height: 30, color: '#229DA9' }} />
        </Box>
      );

    case 'Selic Rate':
      return (
        <Box sx={{ ...boxStyle, backgroundColor: '#BFDBFD' }}>
          <Avatar sx={{ width: 30, height: 30 }} src="assets/dashboard/selic.svg" />
        </Box>
      );
    case 'IGPM':
      return (
        <Box sx={{ ...boxStyle, backgroundColor: '#FDBDD8' }}>
          <Avatar sx={{ width: 30, height: 30 }} src="assets/dashboard/ipgm.svg" />
        </Box>
      );
    case 'IPCA':
      return (
        <Box sx={{ ...boxStyle, backgroundColor: '#E2D5FC' }}>
          <Avatar sx={{ width: 30, height: 30 }} src="assets/dashboard/ipca.svg" />
        </Box>
      );
    case 'USD':
      return (
        <Box sx={{ ...boxStyle, backgroundColor: '#FEC2FF' }}>
          <Avatar sx={{ width: 30, height: 30 }} src="assets/dashboard/usd.svg" />
        </Box>
      );
    default:
      return null; // Return null or some default component if title doesn't match
  }
};

AppWidgetSummary.propTypes = {
  chart: PropTypes.object,
  percent: PropTypes.number,
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};

IconComponent.propTypes = {
  title: PropTypes.string,
};
