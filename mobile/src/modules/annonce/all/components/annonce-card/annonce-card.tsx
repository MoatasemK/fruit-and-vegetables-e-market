import * as React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonText,
  useIonRouter,
} from '@ionic/react';

import { SERVER_BASE_URL } from '@/common/utils/http-client/http-client.config';
import { getCurrentLogginUserId } from '@/common/utils';

import { AnnonceProps as Props } from './annonce-card.props';

export function Annonce(props: Props) {
  const ionRouter = useIonRouter();
  const { data } = props;
  const handleOnClick = () => ionRouter.push(`/annonces/${data._id}`);

  return (
    <IonCard style={{ width: '18rem' }} onClick={handleOnClick}>
      {getCurrentLogginUserId() === data.owner._id ? (
        <div
          title="my annonce"
          style={{ backgroundColor: 'blue', width: '100%', height: '1rem' }}
        />
      ) : null}
      <img alt={data.title} crossOrigin="anonymous" src={`${SERVER_BASE_URL}/${data.photo}`} />
      <IonCardHeader>
        <IonCardTitle>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <IonText>
              <h2>{data.title}</h2>
            </IonText>
            <IonText>
              <h3>
                <strong>{data.price}$</strong>
              </h3>
            </IonText>
          </div>
        </IonCardTitle>
        <IonCardSubtitle color="tertiary">{data.category}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>{data.description} ...</IonCardContent>
    </IonCard>
  );
}
