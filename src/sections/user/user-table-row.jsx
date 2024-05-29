import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import { endpoints } from 'src/utils/axios';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { SERVER_URL } from '../../config-global';
import UserQuickEditForm from './user-quick-edit-form';

export default function UserTableRow({ row, selected, onSelectRow, onDeleteRow, refreshTable }) {
  const { first_name, last_name, avatar, email, role, status, created_at } = row;
  const confirm = useBoolean();

  const quickEdit = useBoolean();
  const popover = usePopover();
  const fullName = `${first_name} ${last_name}`;

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={fullName}
            src={`${SERVER_URL}${endpoints.user.avatarUrl}/${avatar}`}
            sx={{ mr: 2 }}
          />

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
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{email}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{role}</TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'enabled' && 'success') ||
              (status === 'disabled' && 'warning') ||
              (status === 'blocked' && 'error') ||
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

      <UserQuickEditForm
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
