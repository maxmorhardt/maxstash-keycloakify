import { Box, Card, CardContent } from '@mui/material';
import type { UserProfileFormFieldsProps } from 'keycloakify/login/UserProfileFormFieldsProps';
import { getKcClsx } from 'keycloakify/login/lib/kcClsx';
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import type { JSX } from 'keycloakify/tools/JSX';
import type { LazyOrNot } from 'keycloakify/tools/LazyOrNot';
import { clsx } from 'keycloakify/tools/clsx';
import { useLayoutEffect, useState } from 'react';
import type { KcContext } from '../KcContext';
import TermsAcceptance from '../components/register/TermsAcceptance';
import type { I18n } from '../i18n';

type RegisterProps = PageProps<Extract<KcContext, { pageId: 'register.ftl' }>, I18n> & {
  UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
  doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
  const {
    kcContext,
    i18n,
    doUseDefaultCss,
    Template,
    classes,
    UserProfileFormFields,
    doMakeUserConfirmPassword,
  } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const {
    messageHeader,
    url,
    messagesPerField,
    recaptchaRequired,
    recaptchaVisible,
    recaptchaSiteKey,
    recaptchaAction,
    termsAcceptanceRequired,
  } = kcContext;

  const { msg, msgStr, advancedMsg } = i18n;

  const [isFormSubmittable, setIsFormSubmittable] = useState(false);
  const [areTermsAccepted, setAreTermsAccepted] = useState(false);

  useLayoutEffect(() => {
    const onSubmitRecaptcha = () => {
      const form = document.getElementById('kc-register-form') as HTMLFormElement | null;
      form?.requestSubmit();
    };

    (window as typeof window & { onSubmitRecaptcha?: () => void }).onSubmitRecaptcha =
      onSubmitRecaptcha;

    return () => {
      delete (window as typeof window & { onSubmitRecaptcha?: () => void }).onSubmitRecaptcha;
    };
  }, []);

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={messageHeader !== undefined ? advancedMsg(messageHeader) : msg('registerTitle')}
      displayMessage={messagesPerField.exists('global')}
      displayRequiredFields
    >
      <Box display="flex" justifyContent="center" mt={4}>
        <Card
          sx={{
            width: '100%',
            maxWidth: 480,
            borderRadius: 3,
            boxShadow: 4,
            p: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <CardContent>
            <form
              id="kc-register-form"
              className={kcClsx('kcFormClass')}
              action={url.registrationAction}
              method="post"
            >
              <UserProfileFormFields
                kcContext={kcContext}
                i18n={i18n}
                kcClsx={kcClsx}
                onIsFormSubmittableValueChange={setIsFormSubmittable}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
              />
              {termsAcceptanceRequired && (
                <TermsAcceptance
                  i18n={i18n}
                  kcClsx={kcClsx}
                  messagesPerField={messagesPerField}
                  areTermsAccepted={areTermsAccepted}
                  onAreTermsAcceptedValueChange={setAreTermsAccepted}
                />
              )}
              {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
                <div className="form-group">
                  <div className={kcClsx('kcInputWrapperClass')}>
                    <div
                      className="g-recaptcha"
                      data-size="compact"
                      data-sitekey={recaptchaSiteKey}
                      data-action={recaptchaAction}
                    ></div>
                  </div>
                </div>
              )}
              <div className={kcClsx('kcFormGroupClass')}>
                <div id="kc-form-options" className={kcClsx('kcFormOptionsClass')}>
                  <div className={kcClsx('kcFormOptionsWrapperClass')}>
                    <span>
                      <a href={url.loginUrl}>{msg('backToLogin')}</a>
                    </span>
                  </div>
                </div>

                {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
                  <div id="kc-form-buttons" className={kcClsx('kcFormButtonsClass')}>
                    <button
                      className={clsx(
                        kcClsx(
                          'kcButtonClass',
                          'kcButtonPrimaryClass',
                          'kcButtonBlockClass',
                          'kcButtonLargeClass'
                        ),
                        'g-recaptcha'
                      )}
                      data-sitekey={recaptchaSiteKey}
                      data-callback="onSubmitRecaptcha"
                      data-action={recaptchaAction}
                      type="submit"
                    >
                      {msg('doRegister')}
                    </button>
                  </div>
                ) : (
                  <div id="kc-form-buttons" className={kcClsx('kcFormButtonsClass')}>
                    <input
                      disabled={
                        !isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)
                      }
                      className={kcClsx(
                        'kcButtonClass',
                        'kcButtonPrimaryClass',
                        'kcButtonBlockClass',
                        'kcButtonLargeClass'
                      )}
                      type="submit"
                      value={msgStr('doRegister')}
                    />
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Template>
  );
}