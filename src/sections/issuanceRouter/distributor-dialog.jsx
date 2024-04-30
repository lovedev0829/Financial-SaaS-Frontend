import * as React from 'react';
import PropTypes from 'prop-types';

import Table from '@mui/material/Table';
import Dialog from '@mui/material/Dialog';
// Grid version 2
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';

import Label from 'src/components/label';
import { useTable, TablePaginationCustom } from 'src/components/table';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    with: '900px',
  },
}));

export default function DistributorDialog(props) {
  const { isOpenDialog, openDistributorDialog } = props;
  const table = useTable({ defaultOrderBy: 'orderNumber' });

  return (
    <BootstrapDialog
      fullWidth
      maxWidth="sm"
      open={isOpenDialog}
      onClose={openDistributorDialog}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const { email } = formJson;
          console.log(email);
          openDistributorDialog();
        },
      }}
    >
      <DialogContent>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Distributor Name</TableCell>
                <TableCell>Staus</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key="1">
                <TableCell>Banco Daycoval </TableCell>
                <TableCell>
                  <Label variant="filled" color="success">
                    Pending
                  </Label>
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
      </DialogContent>
    </BootstrapDialog>
  );
}

DistributorDialog.propTypes = {
  isOpenDialog: PropTypes.bool,
  openDistributorDialog: PropTypes.func,
};
