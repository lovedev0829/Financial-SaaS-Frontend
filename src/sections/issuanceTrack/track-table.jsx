import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { Table, TableRow, TableCell, TableBody, ListItemText, TableContainer } from '@mui/material';

import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';

export default function TrackTable() {
  const theme = useTheme();
  const lightMode = theme.palette.mode === 'light';

  return (
    <TableContainer sx={{ overflow: 'unset' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 720 }}>
          <TableHeadCustom
            headLabel={[
              { id: 'issuanceId', label: 'Issuance Identification' },
              { id: 'distributorId', label: 'Distributor Identification' },
              { id: 'distributorSpread', label: 'Distributor Spread' },
              { id: 'clientIndexRate', label: 'Client Index Rate' },
              { id: 'quantity', label: 'Quantity' },
              { id: 'price', label: 'Price' },
              { id: 'tradedamount', label: 'Traded Amount' },
              { id: 'issuestatus', label: 'Issue Status' },
              { id: 'action', label: 'Action' },
            ]}
            sx={{ color: 'white' }}
          />

          <TableBody>
            <TableRow>
              <TableCell>
                <ListItemText
                  primary="CDB"
                  primaryTypographyProps={{ typography: 'body2' }}
                  secondaryTypographyProps={{
                    mt: 0.5,
                    component: 'span',
                    typography: 'caption',
                  }}
                />
              </TableCell>

              <TableCell>12</TableCell>

              <TableCell>06/01/2025</TableCell>
              <TableCell>R$2,000,000.00</TableCell>
              <TableCell>State ICO</TableCell>
              <TableCell>+4.6%</TableCell>
              <TableCell>+4.6%</TableCell>
              <TableCell>
                <Label variant={lightMode ? 'soft' : 'filled'} color="success">
                  Confirmed
                </Label>
              </TableCell>
              <TableCell>
                <Button variant="outlined">edit</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
