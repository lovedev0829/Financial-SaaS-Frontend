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
              <TableCell>Distributor Identifier</TableCell>
              <TableCell>Company Name </TableCell>
              <TableCell> CNPJ</TableCell>
              <TableCell>Type of Institution </TableCell>
              <TableCell>Company's address</TableCell>
              <TableCell>Commercial phone </TableCell>
              <TableCell>Business Email</TableCell>
              <TableCell>Name of Legal Representative </TableCell>
              <TableCell>Legal Representative Contact </TableCell>
              <TableCell>Relationship Status </TableCell>
              <TableCell>Cetip Account Number </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="1">
              <TableCell>0001 </TableCell>
              <TableCell>Financial Distributor Example SA </TableCell>
              <TableCell>12.345.678/0001-90 </TableCell>
              <TableCell>Stock Broker </TableCell>
              <TableCell>(11) 1234-5678 </TableCell>
              <TableCell>Text contato@distribuidoraexemplo.com.br</TableCell>
              <TableCell>John Silva</TableCell>
              <TableCell>(11) 9876-5432 </TableCell>
              <TableCell>Text Not Started, Pending, Approved </TableCell>
              <TableCell>000000</TableCell>
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
