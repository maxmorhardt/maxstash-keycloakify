import { Typography } from '@mui/material';
import { I18n } from 'keycloakify/login/i18n';

interface LoginTitleProps {
  i18n: I18n;
}

export default function LoginTitle({ i18n }: LoginTitleProps) {
  const { msg } = i18n;

  return (
    <Typography variant="h5" textAlign="center" mb={3}>
      {msg('loginAccountTitle')}
    </Typography>
  );
}
