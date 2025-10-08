import { Box, Typography } from '@mui/material';
import { I18n } from 'keycloakify/login/i18n';

interface LoginTitleProps {
  i18n: I18n;
}

export default function LoginTitle({ i18n }: LoginTitleProps) {
  const { msg } = i18n;

  return (
    <>
      <Box display={'flex'} justifyContent={'center'}>
        <Box
          component="img"
          src="maxstash.png"
          alt="maxstash"
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            objectFit: 'contain',
          }}
        />
      </Box>

      <Typography variant="h5" textAlign="center" mb={3} mt={2}>
        {msg('loginAccountTitle')}
      </Typography>
    </>
  );
}
