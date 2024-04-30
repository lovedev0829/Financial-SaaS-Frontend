import { Button } from '@mui/material';
// Grid version 2
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function IssuanceToolbar() {
  const popover = usePopover();
  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{
        p: 2.5,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        flexGrow={1}
        sx={{ width: 1 }}
        justifyContent="flex-end"
      >
        <TextField
          sx={{ width: 1 }}
          placeholder="Search for academic programs name here"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{ width: 0.7 }}
          placeholder="Issuance Identification"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
        <Select xs={12} value={0} id="assetSubtype" sx={{ width: 0.2 }}>
          <MenuItem value={0} selected>
            Asset Subtype
          </MenuItem>
          <MenuItem value={10}>LCI</MenuItem>
          <MenuItem value={20}>LCA</MenuItem>
          <MenuItem value={30}>CDB</MenuItem>
        </Select>
        <Select xs={12} value={0} id="assetSubtype" sx={{ width: 0.3 }}>
          <MenuItem value={0} selected>
            Interest Rate Indexer
          </MenuItem>
          <MenuItem value={10}>LCI</MenuItem>
          <MenuItem value={20}>LCA</MenuItem>
          <MenuItem value={30}>CDB</MenuItem>
        </Select>
        <Button
          sx={{ width: 0.15, height: '53px' }}
          size="large"
          variant="outlined"
          onClick={popover.onOpen}
          startIcon={<ArrowCircleDownIcon />}
        >
          Export
        </Button>
      </Stack>
      <CustomPopover
        arrow="top-center"
        sx={{ width: 140 }}
        open={popover.open}
        onClose={popover.onClose}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          Export as.csv
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          Export as.xlsx
        </MenuItem>
      </CustomPopover>
    </Stack>
  );
}
