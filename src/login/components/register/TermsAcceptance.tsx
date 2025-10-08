import { kcSanitize } from 'keycloakify/lib/kcSanitize';
import { I18n } from 'keycloakify/login/i18n';
import { KcContext } from 'keycloakify/login/KcContext';
import { KcClsx } from 'keycloakify/login/lib/kcClsx';

interface TermsAcceptanceProps {
	i18n: I18n;
  kcClsx: KcClsx;
  messagesPerField: Pick<KcContext['messagesPerField'], 'existsError' | 'get'>;
  areTermsAccepted: boolean;
  onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}

export default function TermsAcceptance({
	i18n,
	kcClsx,
	messagesPerField,
	areTermsAccepted,
	onAreTermsAcceptedValueChange
}: TermsAcceptanceProps) {
  const { msg } = i18n;

  return (
    <>
      <div className="form-group">
        <div className={kcClsx('kcInputWrapperClass')}>
          {msg('termsTitle')}
          <div id="kc-registration-terms-text">{msg('termsText')}</div>
        </div>
      </div>
      <div className="form-group">
        <div className={kcClsx('kcLabelWrapperClass')}>
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            className={kcClsx('kcCheckboxInputClass')}
            checked={areTermsAccepted}
            onChange={(e) => onAreTermsAcceptedValueChange(e.target.checked)}
            aria-invalid={messagesPerField.existsError('termsAccepted')}
          />
          <label htmlFor="termsAccepted" className={kcClsx('kcLabelClass')}>
            {msg('acceptTerms')}
          </label>
        </div>
        {messagesPerField.existsError('termsAccepted') && (
          <div className={kcClsx('kcLabelWrapperClass')}>
            <span
              id="input-error-terms-accepted"
              className={kcClsx('kcInputErrorMessageClass')}
              aria-live="polite"
              dangerouslySetInnerHTML={{
                __html: kcSanitize(messagesPerField.get('termsAccepted')),
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
