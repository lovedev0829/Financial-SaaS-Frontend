import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import { _bankingRecentTransitions } from 'src/_mock';

import AppWidgetWorld from './app-widget-world';
import TopIssuancesTbl from './top-issuances-table';
import AppWidgetSummary from './app-widget-summary';
import IssuanceTracking from '../issuanceTrack/track';
import IssuanceFinancialVolume from './issuance-financial-volume';

export default function DashboardView() {
  return (
    <Container maxWidth="100%">
      <Grid container spacing={3}>
        <Grid xs={12} md={2.4}>
          <AppWidgetSummary
            title="Issuance volume"
            percent={2.6}
            total={18765}
            chart={{
              series: [1, 8, 35, 50, 82, 84, 77, 60, 87, 43],
            }}
            sx={{
              backgroundImage: 'linear-gradient(85deg, #29C3D2 0%, #29C3D2 0% , #A6ECEE 100%)',
              color: 'white',
            }}
          />
        </Grid>
        <Grid xs={12} md={2.4}>
          <AppWidgetSummary
            title="Selic Rate"
            percent={2.6}
            total={18765}
            chart={{
              series: [1, 8, 35, 50, 82, 84, 77, 60, 87, 43],
            }}
            sx={{
              backgroundImage: 'linear-gradient(85deg, #79AFF0 0%, #BFDBFD 100%)',
              color: 'white',
            }}
          />
        </Grid>
        <Grid xs={12} md={2.4}>
          <AppWidgetSummary
            title="IGPM"
            percent={2.6}
            total={18765}
            chart={{
              series: [1, 8, 35, 50, 82, 84, 77, 60, 87, 43],
            }}
            sx={{
              backgroundImage: 'linear-gradient(85deg, #F290B9 0%, #FDBDD8 100%)',
              color: 'white',
            }}
          />
        </Grid>
        <Grid xs={12} md={2.4}>
          <AppWidgetSummary
            title="IPCA"
            percent={2.6}
            total={18765}
            chart={{
              series: [1, 8, 35, 50, 82, 84, 77, 60, 87, 43],
            }}
            sx={{
              backgroundImage: 'linear-gradient(85deg, #C1ACEB 0%, #E2D5FC 100%)',
              color: 'white',
            }}
          />
        </Grid>
        <Grid xs={12} md={2.4}>
          <AppWidgetSummary
            title="USD"
            percent={2.6}
            total={18765}
            chart={{
              series: [1, 8, 35, 50, 82, 84, 77, 60, 87, 43],
            }}
            sx={{
              backgroundImage: 'linear-gradient(85deg, #EC89EE 0%, #FEC2FF 100%)',
              color: 'white',
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={6}>
          <IssuanceFinancialVolume
            title="Issuance Financial Volume"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  year: '2019',
                  data: [
                    {
                      name: 'Asia',
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                    },
                  ],
                },
                {
                  year: '2020',
                  data: [
                    {
                      name: 'Asia',
                      data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>
        <Grid container xs={12} md={6} lg={6} direction="column">
          <Grid md={12}>
            <TopIssuancesTbl
              title="Top 3 Issuances"
              tableData={_bankingRecentTransitions}
              tableLabels={[
                { id: 'name', label: 'Name' },
                { id: 'index', label: 'Index' },
                { id: 'maturity', label: 'Maturity' },
                { id: 'volume', label: 'Volume' },
                { id: 'state' },
                { id: 'percentage' },
              ]}
            />
          </Grid>
          <Grid md={12}>
            <AppWidgetWorld
              tablist={[
                {
                  value: 'news',
                  label: 'News',
                },
                {
                  value: 'events',
                  label: 'Events',
                },
                {
                  value: 'Podcast',
                  label: 'Podcast',
                },
              ]}
            />
          </Grid>
        </Grid>
        <Grid xs={12} md={12}>
          <IssuanceTracking
            title="Issuance tracking"
            tablist={[
              {
                value: 'confirmed',
                label: 'Confirmed',
              },
              {
                value: 'pending',
                label: 'Pending',
              },
              {
                value: 'cancelled',
                label: 'Cancelled',
              },
              {
                value: 'issued',
                label: 'Issued',
              },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
