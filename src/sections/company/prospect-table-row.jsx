import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { useBoolean } from 'src/hooks/use-boolean';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';

import ProspectQuickEditForm from './prospect-quick-edit-form';

// ----------------------------------------------------------------------

export default function UserTableRow({ row, selected, onSelectRow, onDeleteRow, refreshTable }) {
  const {
    first_name,
    last_name,
    avatar,
    email,
    company_id,
    company,
    cnpj,
    call_phone,
    site,
    company_role,
    status,
    created_at,
  } = row;

  const fullName = `${first_name} ${last_name}`;

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={fullName} src={avatar} sx={{ mr: 2 }} />

          <ListItemText
            primary={fullName}
            secondary={email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{company_id}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{company}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{cnpj}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{call_phone}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{site}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{company_role}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'approved' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'rejected' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{created_at}</TableCell>
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Quick Edit" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <SettingsOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Quick Edit" placement="top" arrow>
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

      <ProspectQuickEditForm
        currentUser={row}
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

UserTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
  refreshTable: PropTypes.func,
};
