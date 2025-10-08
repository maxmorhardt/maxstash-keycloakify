import { Suspense, lazy } from 'react';
import type { ClassKey } from 'keycloakify/login';
import type { KcContext } from './KcContext';
import { useI18n } from './i18n';
import DefaultPage from 'keycloakify/login/DefaultPage';
import Template from 'keycloakify/login/Template';
import { createTheme, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';

const UserProfileFormFields = lazy(() => import('keycloakify/login/UserProfileFormFields'));
const Login = lazy(() => import('./pages/Login'));

const doMakeUserConfirmPassword = true;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;
  const { i18n } = useI18n({ kcContext });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
			<GlobalStyles
				styles={{
					'.kcFormHeaderClass': { display: 'none !important' },
					'.kcHeaderClass': { display: 'none !important' },
					'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-internal-autofill-selected, input:invalid:-webkit-autofill': {
						WebkitBoxShadow: '0 0 0 1000px transparent inset !important',
						WebkitTextFillColor: 'white !important',
						transition: 'background-color 5000s ease-in-out 0s !important',
						caretColor: 'white !important',
					},
				}}
			/>

      <Suspense>
        {(() => {
          switch (kcContext.pageId) {
            case 'login.ftl':
              return (
                <Login
                  {...{ kcContext, i18n, classes }}
                  Template={Template}
                  doUseDefaultCss={false}
                />
              );
            default:
              return (
                <DefaultPage
                  kcContext={kcContext}
                  i18n={i18n}
                  classes={classes}
                  Template={Template}
                  doUseDefaultCss={true}
                  UserProfileFormFields={UserProfileFormFields}
                  doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
              );
          }
        })()}
      </Suspense>
    </ThemeProvider>
  );
}

const classes = {} satisfies { [key in ClassKey]?: string };
