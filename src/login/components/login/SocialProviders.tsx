import { Box, Button, Divider, Stack } from '@mui/material';
import { kcSanitize } from 'keycloakify/lib/kcSanitize';
import { KcContext } from 'keycloakify/login/KcContext';
import { FaFacebook, FaGithub, FaGoogle, FaMicrosoft, FaTwitter } from 'react-icons/fa';

interface SocialProvidersProps {
  realm: KcContext.Login['realm'];
  social?: KcContext.Login['social'];
}

export default function SocialProviders({ realm, social }: SocialProvidersProps) {
  if (!realm.password || !social?.providers?.length) {
    return;
  }

	const providerIcons: Record<string, JSX.Element> = {
		google: <FaGoogle />,
		github: <FaGithub />,
		facebook: <FaFacebook />,
		microsoft: <FaMicrosoft />,
		twitter: <FaTwitter />,
	};

  return (
    <Box mt={4}>
      <Divider sx={{ my: 3 }}>or</Divider>

      <Stack
        direction="column"
        spacing={1}
        alignItems="stretch"
      >
        {social.providers.map((...[p]) => (
          <Button
            key={p.alias}
            variant="outlined"
            href={p.loginUrl}
  					startIcon={providerIcons[p.alias.toLowerCase()] ?? undefined}
						sx={{
							textTransform: 'none',
							width: '100%',
							'& .MuiButton-startIcon': {
								mr: 0.5,
							},
						}}
          >
            <span
              dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
              style={{ marginLeft: p.iconClasses ? 8 : 0 }}
            />
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
