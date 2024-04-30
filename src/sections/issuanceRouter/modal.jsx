import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import CreateIssuanceRouterFrm from './createFrm';

export default function CreateIssuanceView({ isOpenAddModal, openAddIssuanceModal, issuance }) {
  const handleClose = () => openAddIssuanceModal(false);

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
        <CreateIssuanceRouterFrm issuance={issuance} />
      </Box>
    </Modal>
  );
}

CreateIssuanceView.propTypes = {
  isOpenAddModal: PropTypes.bool,
  openAddIssuanceModal: PropTypes.func,
  issuance: PropTypes.object,
};
