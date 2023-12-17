import * as React from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import { useLocation } from 'react-router';

import { isAuthenticated } from '@/common/components/protected-route/protected-route.util';

import { LayoutProps as Props } from './layout.props';

export function Layout(propos: Props) {
  const { children, title } = propos;
  const ionRouter = useIonRouter();
  const location = useLocation();
  const handleOnLogout = () => {
    localStorage.clear();
    ionRouter.push('/login');
  };
  const handleOnLoginRedirectionClick = () => ionRouter.push('/login');
  const handleOnRegisterRedirectionClick = () => ionRouter.push('/register');
  const handleOnAnnoncesRedirectionClick = () => ionRouter.push('/annonces');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {location.pathname === '/home' ? null : <IonBackButton defaultHref="/home" />}
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            {isAuthenticated() ? (
              <IonButton
                fill="outline"
                color="danger"
                style={{ marginRight: '1rem' }}
                onClick={handleOnLogout}
              >
                Logout
              </IonButton>
            ) : (
              <>
                {location.pathname === '/register' ? null : (
                  <IonButton
                    fill="outline"
                    color="primary"
                    style={{ marginRight: '1rem' }}
                    onClick={handleOnRegisterRedirectionClick}
                  >
                    Register
                  </IonButton>
                )}
                {location.pathname === '/login' ? null : (
                  <IonButton
                    fill="outline"
                    color="primary"
                    style={{ marginRight: '1rem' }}
                    onClick={handleOnLoginRedirectionClick}
                  >
                    Login
                  </IonButton>
                )}
                {location.pathname === '/annonces' || location.pathname === '/home' ? null : (
                  <IonButton
                    fill="outline"
                    color="primary"
                    style={{ marginRight: '1rem' }}
                    onClick={handleOnAnnoncesRedirectionClick}
                  >
                    Home
                  </IonButton>
                )}
              </>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {children}
      </IonContent>
    </IonPage>
  );
}
