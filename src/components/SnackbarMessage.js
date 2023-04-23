import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackbarMessage = ({ open, onClose, message }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity="error"
        variant="filled"
        sx={{
          backgroundColor: '#ff5a5f',
          color: 'white',
          borderRadius: '5px',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarMessage;