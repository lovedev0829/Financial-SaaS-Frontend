import Container from '@mui/material/Container';
import { Card, Button, CardHeader } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useSettingsContext } from 'src/components/settings'; // Grid version 2

import { useState } from 'react';

import TableView from './table';
import Toolbar from './toolbar';
import AddIssuanceModal from './modal';

export default function IssuanceRegisterView() {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const settings = useSettingsContext();
  const openAddIssuanceModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Card>
        <CardHeader
          title="Issuance Registration"
          action={
            <Button
              size="large"
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              onClick={openAddIssuanceModal}
            >
              Add New
            </Button>
          }
        />
        <Toolbar />
        <TableView />
        <AddIssuanceModal
          isOpenAddModal={isOpenAddModal}
          openAddIssuanceModal={openAddIssuanceModal}
        />
      </Card>
    </Container>
  );
}
