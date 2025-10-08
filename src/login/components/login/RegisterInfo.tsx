import { Box, Link, Typography } from '@mui/material';
import { I18n } from 'keycloakify/login/i18n';
import { KcContext } from 'keycloakify/login/KcContext';

interface RegisterInfoProps {
  i18n: I18n;
  url: KcContext.Login['url'];
  realm: KcContext.Login['realm'];
  registrationDisabled: boolean | undefined;
}

export default function RegisterInfo({
  i18n,
  url,
  realm,
  registrationDisabled,
}: RegisterInfoProps) {
  const { msg } = i18n;

  if (!realm.password || !realm.registrationAllowed || registrationDisabled) {
    return;
  }

  return (
    <Box textAlign="center" mt={2}>
      <Typography component="span" variant="body2">
        {msg('noAccount')}{' '}
        <Link tabIndex={8} href={url.registrationUrl}>
          {msg('doRegister')}
        </Link>
      </Typography>
    </Box>
  );
}
