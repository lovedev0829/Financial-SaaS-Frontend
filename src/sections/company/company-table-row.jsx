import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';

import CompanyQuickEditForm from './company-quick-edit-form';

// ----------------------------------------------------------------------

export default function CompanyTableRow({ row, selected, onSelectRow, onDeleteRow, refreshTable }) {
  const {
    company_code,
    company_nick_name,
    cnpj,
    institution_type,
    company_address,
    business_email,
    status,
    cetip_account_num,
    created_at,
  } = row;
  const confirm = useBoolean();

  const quickEdit = useBoolean();
  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{company_nick_name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{company_code}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{cnpj}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{institution_type}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{company_address}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{business_email}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{cetip_account_num}</TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={(status === 'active' && 'success') || (status === 'inactive' && 'warning')}
          >
            {status}
          </Label>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{created_at}</TableCell>
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Quick Edit" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove User" placement="top" arrow>
            <IconButton
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <CompanyQuickEditForm
        currentCompany={row}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
        refreshTable={refreshTable}
      />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

CompanyTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
  refreshTable: PropTypes.func,
};
