import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { CardHeader } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useBoolean } from 'src/hooks/use-boolean';

import { useGetCompanyies } from 'src/api/company';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import { useSettingsContext } from 'src/components/settings';
import { ConfirmDialog } from 'src/components/custom-dialog';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import CompanyTableRow from './company-table-row';

const TABLE_HEAD = [
  { id: 'company_id', label: 'Company Code', width: 300, minWidth: 140 },
  { id: 'company_name', label: 'Company', width: 220 },
  { id: 'cnpj', label: 'CNPJ', width: 220 },
  { id: 'institution_type', label: 'Institution', width: 200 },
  { id: 'company_address', label: 'Address', width: 220 },
  { id: 'business_email', label: 'Email', width: 180, minWidth: 140 },
  { id: 'cetip_account_num', label: 'Cetip Account', width: 180, minWidth: 140 },
  { id: 'status', label: 'Status', width: 100 },
  { id: 'created_at', label: 'Created Date', width: 200, minWidth: 140 },
  { id: '', width: 88 },
];

export default function CompanyView() {
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  const table = useTable();

  const confirm = useBoolean();
  const { companies, mutate } = useGetCompanyies();
  const [tableData, setTableData] = useState(companies);

  const dataInPage = tableData.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 56 : 56 + 20;

  const notFound = !tableData.length || !tableData.length;

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      enqueueSnackbar('Delete success!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, enqueueSnackbar, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    enqueueSnackbar('Delete success!');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: tableData.length,
      totalRowsFiltered: tableData.length,
    });
  }, [enqueueSnackbar, table, tableData]);

  useEffect(() => {
    setTableData(companies);
  }, [companies]);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Card>
          <CardHeader
            sx={{ marginBottom: '10px' }}
            title="Company Management"
            action={
              <Button
                size="large"
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
              >
                Add New
              </Button>
            }
          />
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {tableData
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <CompanyTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        refreshTable={() => mutate()}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={tableData.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
