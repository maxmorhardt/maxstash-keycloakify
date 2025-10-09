import type { PageProps } from 'keycloakify/login/pages/PageProps';
import type { KcContext } from '../KcContext';
import AuthHeader from '../components/common/AuthHeader';
import AuthWrapper from '../components/common/AuthWrapper';
import LoginForm from '../components/login/LoginForm';
import RegisterInfo from '../components/login/RegisterInfo';
import SocialProviders from '../components/login/SocialProviders';
import type { I18n } from '../i18n';

export default function Login(props: PageProps<Extract<KcContext, { pageId: 'login.ftl' }>, I18n>) {
  const { kcContext, i18n, Template, doUseDefaultCss } = props;

  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    auth,
    registrationDisabled,
    messagesPerField,
  } = kcContext;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={{}}
      displayInfo={false}
      displayMessage={false}
      headerNode={null}
      socialProvidersNode={null}
      infoNode={null}
      documentTitle={'maxstash'}
    >
      <AuthWrapper>
        {/* login title */}
        <AuthHeader i18n={i18n} isLogin={true} />

        {/* login form */}
        <LoginForm
          i18n={i18n}
          realm={realm}
          url={url}
          login={login}
          messagesPerField={messagesPerField}
          auth={auth}
          usernameHidden={usernameHidden}
        />

        {/* social providers */}
        <SocialProviders realm={realm} social={social} />

        {/* register info */}
        <RegisterInfo
          i18n={i18n}
          url={url}
          realm={realm}
          registrationDisabled={registrationDisabled}
        />
      </AuthWrapper>
    </Template>
  );
}
