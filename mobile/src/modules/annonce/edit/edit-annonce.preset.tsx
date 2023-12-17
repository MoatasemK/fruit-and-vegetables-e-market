import * as React from 'react';

import { defineFormInputFields } from '@/common/utils';
import type { FormInputField } from '@/common/utils';
import { IonButton, IonItem, IonSelect, IonSelectOption } from '@ionic/react';

export const getFormInputFields = () =>
  defineFormInputFields([
    {
      label: 'Title',
      name: 'title',
      placeholder: 'Enter your title ...',
    },
    {
      label: 'Description',
      name: 'description',
      placeholder: 'Enter your description ...',
    },
    {
      label: 'Price',
      name: 'price',
      type: 'number',
      min: 1,
      max: 100,
      placeholder: 'Enter your price ...',
    },
    {
      label: 'Photo',
      name: 'photo',
      field: (() => {
        const inputFileRef = React.useRef<HTMLInputElement | null>(null);
        const handleOnClick = () => {
          inputFileRef.current?.click();
        };

        return (
          <span style={{ marginTop: '0.25rem' }}>
            <input
              ref={inputFileRef}
              style={{ display: 'none', pointerEvents: 'none' }}
              name="photo"
              type="file"
            />
            <IonButton onClick={handleOnClick}>Upload photo ...</IonButton>
          </span>
        );
      })(),
    },
    {
      label: 'Category',
      name: 'category',
      field: (
        <IonItem style={{ marginTop: '0.5rem' }}>
          <IonSelect name="category" value="fruit" placeholder="Pick your category ...">
            <IonSelectOption value="fruit">Fruit</IonSelectOption>
            <IonSelectOption value="vegetable">Vegetable</IonSelectOption>
          </IonSelect>
        </IonItem>
      ),
    },
  ] satisfies FormInputField[]);
