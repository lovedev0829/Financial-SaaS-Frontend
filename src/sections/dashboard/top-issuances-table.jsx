import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import TableContainer from '@mui/material/TableContainer';

import { fCurrency } from 'src/utils/format-number';

import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';

// ----------------------------------------------------------------------

export default function TopIssuancesTbl({
  title,
  subheader,
  tableLabels,
  tableData,
  ...other
}) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 720 }}>
            <TableHeadCustom headLabel={tableLabels} sx={{backgroundColor: "white"}} />

            <TableBody>
              {tableData.map((row) => (
                <TopIssuancesRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}

TopIssuancesTbl.propTypes = {
  subheader: PropTypes.string,
  tableData: PropTypes.array,
  tableLabels: PropTypes.array,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function TopIssuancesRow({ row }) {

  return (
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

        <TableCell>{fCurrency(row.amount)}</TableCell>

        <TableCell>
            06/01/2025
        </TableCell>
        <TableCell>
            R$2,000,000.00
        </TableCell>
        <TableCell>
            State ICO
        </TableCell>
        <TableCell>
            +4.6%
        </TableCell>

      </TableRow>
  );
}

TopIssuancesRow.propTypes = {
  row: PropTypes.object,
};
