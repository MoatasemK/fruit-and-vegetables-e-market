import * as React from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonSpinner,
  useIonRouter,
  useIonToast,
  useIonViewWillLeave,
} from '@ionic/react';

import { authApi, authDTOs } from '@/common/apis/auth';
import { Input } from '@/common/components';
import { Layout } from '@/common/layout';
import { zodValidator } from '@/common/utils';

import { getFormInputFields } from './register.preset';

export function RegisterScreen() {
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [disableSubmission, setDisableSubmission] = React.useState(true);
  const [formErrors, setFormErrors] = React.useState({});
  const [present] = useIonToast();
  const ionRouter = useIonRouter();

  // hook help to cleanup the form when unmount action invoked
  useIonViewWillLeave(() => {
    formRef.current?.reset();
    setFormErrors({});
  }, []);

  // hook help to re-sync the disable button state
  React.useEffect(() => {
    if (submitting) {
      // optimization to prevent setting state when it's already have the correct result
      if (disableSubmission === true) return;
      return setDisableSubmission(true);
    }

    // optimization to prevent setting state when it's already have the correct result
    if (disableSubmission === false) return;
    return setDisableSubmission(false);
  }, [submitting]);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // 1. prevent submitting a form
    event.preventDefault();
    // 2. remove all displayed errors
    setFormErrors({});
    // 3. extract form body from the form element during the submit
    const formBody = Object.fromEntries(new FormData(event.currentTarget));
    // 4. validate the form body by using zod validator and the register schema
    const result = zodValidator(formBody, authDTOs.registerPayloadSchema);
    // 5. handle the validation failure by set errors inside the state
    if (!result.success) return setFormErrors(result.errors);

    try {
      // 6. mark subitting indicator as true to display the spinner component
      setSubmitting(true);
      // 7. call the backend to register the account
      await authApi.register(result.data);
      // 8. success case: reset form values after submit request and redirect to login screen
      return ionRouter.push('/login');
    } catch (exception) {
      // 9. failed case: set error to display toast banner
      present({
        duration: 5000,
        color: 'danger',
        message: `Request Error: ${
          (exception as { error?: string })?.error ?? 'Internal Server Error'
        }`,
        position: 'top',
      });
    } finally {
      // 10. after handling both cases, go back again to display the submit button
      setSubmitting(false);
    }
  };

  const handleOnInput = (event: React.FormEvent<HTMLFormElement>) => {
    // 1. disable submit button when we don't entering any values
    const formBody = Object.fromEntries(new FormData(event.currentTarget));
    if (
      Object.keys(formBody)
        .map((formBodyKey) => formBody[formBodyKey])
        .filter(Boolean).length > 0
    ) {
      // optimization to prevent setting state when it's already have the correct result
      if (disableSubmission === false) return;
      setDisableSubmission(false);
    } else {
      // optimization to prevent setting state when it's already have the correct result
      if (disableSubmission === true) return;
      setDisableSubmission(true);
    }

    // 2. remove displayed errors once the user start entering again
    if (Object.keys(formErrors).length === 0) return;
    return setFormErrors({});
  };

  const handleOnLoginRedirectionClick = () => ionRouter.push('/login');

  return (
    <Layout title="Create Account">
      <IonCard className="ion-padding">
        <IonCardContent>
          <form
            noValidate
            className="ion-padding"
            ref={formRef}
            onSubmit={handleOnSubmit}
            onInput={handleOnInput}
          >
            {getFormInputFields()
              .mapErrors(formErrors)
              .map((fieldProps, index) => (
                <Input key={index} {...fieldProps} />
              ))}

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <IonButton
                disabled={disableSubmission}
                className="ion-margin-top"
                expand="block"
                shape="round"
                type="submit"
              >
                {submitting ? <IonSpinner /> : <>Register</>}
              </IonButton>
              <IonButton
                fill="outline"
                color="medium"
                expand="block"
                shape="round"
                type="button"
                onClick={handleOnLoginRedirectionClick}
              >
                Login
              </IonButton>
            </div>
          </form>
        </IonCardContent>
      </IonCard>
    </Layout>
  );
}
