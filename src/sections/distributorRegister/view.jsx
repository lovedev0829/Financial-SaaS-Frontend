import Container from '@mui/material/Container';
import { Card, Button, CardHeader } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useSettingsContext } from 'src/components/settings'; // Grid version 2

import { useState } from 'react';

import TableView from './table';
import Toolbar from './toolbar';
import AddDistributorModal from './modal';

export default function DistributorRegisterView() {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const settings = useSettingsContext();
  const openAddDistributorModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Card>
        <CardHeader
          title="Distributor Registration"
          action={
            <Button
              size="large"
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              onClick={openAddDistributorModal}
            >
              Add New
            </Button>
          }
        />
        <Toolbar />
        <TableView />
        <AddDistributorModal
          distributor={{}}
          isOpenAddModal={isOpenAddModal}
          openAddDistributorModal={openAddDistributorModal}
        />
      </Card>
    </Container>
  );
}
