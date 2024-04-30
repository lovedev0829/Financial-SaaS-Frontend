import { Button } from '@mui/material';
import Table from '@mui/material/Table';
// Grid version 2
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { useTable, TablePaginationCustom } from 'src/components/table';

export default function IssuanceToolbar() {
  const table = useTable({ defaultOrderBy: 'orderNumber' });

  return (
    <>
      <TableContainer sx={{ overflow: 'unset' }}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Issuance Identification</TableCell>
              <TableCell>Asset Subtype </TableCell>
              <TableCell>Interest Rate Indexer </TableCell>
              <TableCell>Interest Rate Information </TableCell>
              <TableCell>Interest Rate/Minimum Spread </TableCell>
              <TableCell>Interest Rate/Maximum Spread </TableCell>
              <TableCell>Unit price</TableCell>
              <TableCell>Maximum Emission Volume</TableCell>
              <TableCell>Minimum Contracting Lot Size </TableCell>
              <TableCell>Validity of the Proposal </TableCell>
              <TableCell>Issuance and Expiration Date </TableCell>
              <TableCell>Interest Calculation Base </TableCell>
              <TableCell>Minimum Detention Period </TableCell>
              <TableCell>Minimum Date for Early Redemption</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="1">
              <TableCell>CDB20240316 </TableCell>
              <TableCell>CBD</TableCell>
              <TableCell>Pre-fixed rate (SELIC) </TableCell>
              <TableCell>11.75% </TableCell>
              <TableCell>1%</TableCell>
              <TableCell>3%</TableCell>
              <TableCell>R$ 1,000.00</TableCell>
              <TableCell>10,000 units </TableCell>
              <TableCell>1 unit </TableCell>
              <TableCell>12/31/2024</TableCell>
              <TableCell>01/04/2024-01/04/2027 </TableCell>
              <TableCell>Business days (252 days) </TableCell>
              <TableCell> 90 days </TableCell>
              <TableCell>
                <Button variant="outlined">edit</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePaginationCustom
        count={5}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      />
    </>
  );
}
