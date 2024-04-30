import Container from '@mui/material/Container';
import { Card, Button, CardHeader } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useSettingsContext } from 'src/components/settings'; // Grid version 2

import { useState } from 'react';

import TableView from './table';
import Toolbar from './toolbar';
import AddIssuanceRouterModal from './modal';

export default function IssuanceRouterView() {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const settings = useSettingsContext();
  const openAddIssuanceRouterModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Card>
        <CardHeader
          title="Route your Issuance for a Distributor"
          action={
            <Button
              size="large"
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              onClick={openAddIssuanceRouterModal}
            >
              Add New
            </Button>
          }
        />
        <Toolbar />
        <TableView />
        <AddIssuanceRouterModal
          isOpenAddModal={isOpenAddModal}
          openAddIssuanceModal={openAddIssuanceRouterModal}
        />
      </Card>
    </Container>
  );
}
