import { useState } from 'react';

import { Button } from '@mui/material';
import Table from '@mui/material/Table';
// Grid version 2
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TableContainer from '@mui/material/TableContainer';

import { useTable, TablePaginationCustom } from 'src/components/table';

import DistributorDialog from './distributor-dialog';

export default function IssuanceToolbar() {
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const openDistributorDialog = () => {
    setIsOpenDialog(!isOpenDialog);
  };

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
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="1">
              <TableCell>CDB20240316 </TableCell>
              <TableCell>CBD</TableCell>
              <TableCell>Pre-fixed rate (SELIC) </TableCell>
              <TableCell>11.75% </TableCell>
              <TableCell>
                <Button variant="outlined">edit</Button>
              </TableCell>
              <TableCell>
                <IconButton aria-label="distributor-dialog" onClick={openDistributorDialog}>
                  <MoreVertIcon />
                </IconButton>
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
      <DistributorDialog
        isOpenDialog={isOpenDialog}
        openDistributorDialog={openDistributorDialog}
      />
    </>
  );
}
