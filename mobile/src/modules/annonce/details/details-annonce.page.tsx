import * as React from 'react';
import { IonBadge, IonButton, IonText, useIonRouter, useIonToast } from '@ionic/react';
import { useParams } from 'react-router';

import { Layout } from '@/common/layout';
import { annoncesApi } from '@/common/apis/annonces';
import { annoncesDTOs } from '@/common/apis/annonces';
import { SERVER_BASE_URL } from '@/common/utils/http-client/http-client.config';
import { getCurrentLogginUserId } from '@/common/utils';

export function AnnonceDetailsScreen() {
  const params: { annonceId: string } = useParams();
  const ionRouter = useIonRouter();
  const [present] = useIonToast();
  const [annonce, setAnnonce] = React.useState<annoncesDTOs.Annonce | null>(null);

  // hook help to fetch data once the screen mounted - equivalent bahvior to ngOnInit on angular
  React.useEffect(() => {
    const asyncHandler = async () => {
      try {
        if (!params?.annonceId) return;
        const response = await annoncesApi.get(params.annonceId);
        setAnnonce(response.data);
      } catch (exception) {
        present({
          duration: 5000,
          color: 'danger',
          message: `Request Error: ${
            (exception as { error?: string })?.error ?? 'Internal Server Error'
          }`,
          position: 'top',
        });
      }
    };

    asyncHandler();
  }, [params?.annonceId]);

  const handleOnUpdateRedirectionClick = () => ionRouter.push(`/annonces/${params.annonceId}/edit`);
  const handleOnDeleteClick = async () => {
    // TODO: add loading and spinner support
    try {
      await annoncesApi.del(params.annonceId);
      await present({
        duration: 2500,
        color: 'success',
        message: `Deleted successfuly ...`,
        position: 'middle',
      });

      return ionRouter.push('/annonces');
    } catch (exception) {
      await present({
        duration: 2500,
        color: 'danger',
        message: `Request Error: ${
          (exception as { error?: string })?.error ?? 'Internal Server Error'
        }`,
        position: 'top',
      });
    }
  };

  return (
    <Layout title="Annonce Details">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        {annonce ? (
          <div>
            <img
              alt={annonce.title}
              crossOrigin="anonymous"
              src={`${SERVER_BASE_URL}/${annonce.photo}`}
            />
            <IonBadge slot="end">{annonce.category}</IonBadge>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <IonText>
                <h2>{annonce.title}</h2>
              </IonText>
              <IonText>
                <h3>
                  <strong>{annonce.price}$</strong>
                </h3>
              </IonText>
            </div>
            <hr style={{ backgroundColor: 'gray' }} />
            <IonText>
              <p>{annonce.description}</p>
            </IonText>
            <IonBadge color="medium" slot="end">
              created by : {annonce.owner.fullname}
            </IonBadge>
            {getCurrentLogginUserId() === annonce.owner._id ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '1rem',
                }}
              >
                <IonButton color="warning" onClick={handleOnUpdateRedirectionClick}>
                  Update
                </IonButton>
                <IonButton color="danger" onClick={handleOnDeleteClick}>
                  Delete
                </IonButton>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
