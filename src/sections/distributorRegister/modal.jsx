import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import CreateDistributorFrm from './createFrm';

export default function CreateDistributorView({
  isOpenAddModal,
  openAddDistributorModal,
  distributor,
}) {
  const handleClose = () => openAddDistributorModal(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 0.7,
    borderRadius: '15px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={isOpenAddModal} onClose={handleClose}>
      <Box sx={style}>
        <CreateDistributorFrm distributor={distributor} />
      </Box>
    </Modal>
  );
}

CreateDistributorView.propTypes = {
  isOpenAddModal: PropTypes.bool,
  openAddDistributorModal: PropTypes.func,
  distributor: PropTypes.object,
};
