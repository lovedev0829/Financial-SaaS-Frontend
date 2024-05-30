import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useBoolean } from 'src/hooks/use-boolean';

import { COMPANY_STATUS_OPTIONS } from 'src/utils/common';

import { deleteCompany, useGetCompanyies } from 'src/api/company';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import { useSettingsContext } from 'src/components/settings';
import { ConfirmDialog } from 'src/components/custom-dialog';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import CompanyTableRow from './company-table-row';
import CompanyTableToolbar from './company-table-toolbar';
import ComapnyQuickCreateForm from './company-quick-create-form';
import CompanyTableFiltersResult from './company-table-filters-result';

const TABLE_HEAD = [
  { id: 'company_name', label: 'Company', width: 220 },
  { id: 'company_code', label: 'Company Code', width: 300, minWidth: 140 },
  { id: 'cnpj', label: 'CNPJ', width: 220 },
  { id: 'institution_type', label: 'Institution', width: 200 },
  { id: 'company_address', label: 'Address', width: 220 },
  { id: 'business_email', label: 'Email', width: 180, minWidth: 140 },
  { id: 'cetip_account_num', label: 'Cetip Account', width: 180, minWidth: 140 },
  { id: 'status', label: 'Status', width: 100 },
  { id: 'created_at', label: 'Created Date', width: 200, minWidth: 140 },
  { id: '', width: 88 },
];

const defaultFilters = {
  companyName: '',
  status: 'all',
};

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...COMPANY_STATUS_OPTIONS];

export default function CompanyView() {
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  const table = useTable();

  const confirm = useBoolean();
  const quickCreate = useBoolean();

  const { companies, mutate } = useGetCompanyies();
  const [tableData, setTableData] = useState(companies);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 56 : 56 + 20;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleDeleteRow = useCallback(
    async (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      await deleteCompany(id.toString())
        .then(() => {
          enqueueSnackbar('Delete success!');
        })
        .catch(() => {
          enqueueSnackbar('Something went wrong');
        });

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, enqueueSnackbar, table, tableData]
  );

  const handleDeleteRows = useCallback(async () => {
    const selectedIds = table.selected.join(',');
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    await deleteCompany(selectedIds)
      .then(() => {
        enqueueSnackbar('Delete success!');
      })
      .catch(() => {
        enqueueSnackbar('Something went wrong');
      });

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: tableData.length,
      totalRowsFiltered: tableData.length,
    });
  }, [enqueueSnackbar, table, tableData]);

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

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
                onClick={quickCreate.onTrue}
              >
                Add New
              </Button>
            }
          />
          <Tabs
            value={filters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                    }
                    color={
                      (tab.value === 'active' && 'success') ||
                      (tab.value === 'inactive' && 'warning') ||
                      'default'
                    }
                  >
                    {['active', 'inactive'].includes(tab.value)
                      ? tableData.filter((company) => company.status === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>
          <CompanyTableToolbar filters={filters} onFilters={handleFilters} />
          {canReset && (
            <CompanyTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
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
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
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
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      <ComapnyQuickCreateForm
        open={quickCreate.value}
        onClose={quickCreate.onFalse}
        refreshTable={() => mutate()}
      />

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

function applyFilter({ inputData, comparator, filters }) {
  const { companyName, status } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (companyName) {
    inputData = inputData.filter(
      (company) => company.company_name.toLowerCase().indexOf(companyName.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((company) => company.status === status);
  }

  return inputData;
}
