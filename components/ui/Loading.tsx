import { FC } from 'react';
import { Box, CircularProgress, Modal, Typography } from '@mui/material';

interface Props {
  visible: boolean;
}

const Loading: FC<Props> = ({ visible }) => {
  return (
    <Modal
      open={visible}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CircularProgress thickness={2} color="info" size={75} />
        </Box>
      </Box>
    </Modal>
  );
};

export default Loading;
