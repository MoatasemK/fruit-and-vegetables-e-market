import * as React from 'react';
import { IonInput, IonItem, IonLabel, IonText } from '@ionic/react';

import { InputProps as Props } from './input.props';

export function Input(props: Props) {
  const { error, label, name, type = 'text', field, ...inputFieldProps } = props;

  return (
    <>
      <IonItem>
        <IonLabel position="stacked">{label}</IonLabel>
        {field ?? <IonInput name={name} type={type} {...inputFieldProps} />}
      </IonItem>
      {error && (
        <IonText color="danger" className="ion-padding-start">
          <small>{error}</small>
        </IonText>
      )}
    </>
  );
}
