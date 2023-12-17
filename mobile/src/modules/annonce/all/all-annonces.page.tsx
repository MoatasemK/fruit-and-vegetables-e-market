import * as React from 'react';

import { Layout } from '@/common/layout';
import { annoncesApi } from '@/common/apis/annonces';
import { annoncesDTOs } from '@/common/apis/annonces';

import { Annonce } from './components';
import {
  IonButton,
  IonRadio,
  IonRadioGroup,
  IonSearchbar,
  useIonRouter,
  useIonToast,
} from '@ionic/react';
import { isAuthenticated } from '@/common/components/protected-route/protected-route.util';

export function AllAnnoncesScreen() {
  const [present] = useIonToast();
  const ionRouter = useIonRouter();
  const [annonces, setAnnonces] = React.useState<annoncesDTOs.Annonce[]>([]);
  const [searchMeta, setSearchMeta] = React.useState<{
    searching: boolean;
    results: annoncesDTOs.Annonce[];
  }>({
    searching: false,
    results: [],
  });
  const [filterMeta, setFilterMeta] = React.useState<'all' | 'fruit' | 'vegetable'>('all');

  // hook help to fetch data once the screen mounted - equivalent bahvior to ngOnInit on angular
  React.useEffect(() => {
    const asyncHandler = async () => {
      try {
        const response = await annoncesApi.getAll();
        setAnnonces(response.data);
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
  }, []);

  const handleOnSearch = (event: Event) => {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target?.value?.toLowerCase() || '';
    const results = annonces.filter((annonce) => annonce.title.toLowerCase().indexOf(query) > -1);

    setSearchMeta({
      searching: true,
      results,
    });
  };
  const handleOnSearchClear = () =>
    setSearchMeta({
      searching: false,
      results: [],
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnFilerChange = (event: any) => setFilterMeta(event.detail.value);
  const handleOnAnnonceRedirectionClick = () => ionRouter.push('/annonces/add');

  return (
    <Layout title="Home">
      <IonSearchbar
        debounce={500}
        showClearButton="focus"
        onIonClear={handleOnSearchClear}
        placeholder="Search ..."
        onIonInput={handleOnSearch}
      />
      {isAuthenticated() ? (
        <IonButton
          expand="block"
          shape="round"
          color="secondary"
          onClick={handleOnAnnonceRedirectionClick}
        >
          Add Annonce
        </IonButton>
      ) : null}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
      >
        <h3 style={{ textAlign: 'center' }}>Filter by categroy:</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          <IonRadioGroup value="all" onIonChange={handleOnFilerChange}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <IonRadio value="all">All</IonRadio>
              <IonRadio value="fruit">Fruit</IonRadio>
              <IonRadio value="vegetable">Vegetable</IonRadio>
            </div>
          </IonRadioGroup>
        </div>
      </div>
      <hr style={{ backgroundColor: 'gray', width: '80%' }} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        {
          // pick the right data based on the filter and search logic ...
          (searchMeta.searching ? searchMeta.results : annonces)
            .filter((annonce) => {
              if (filterMeta === 'all') return true;
              return annonce.category === filterMeta;
            })
            .map((annonce) => (
              <Annonce key={annonce._id} data={annonce} />
            ))
        }
      </div>
    </Layout>
  );
}
