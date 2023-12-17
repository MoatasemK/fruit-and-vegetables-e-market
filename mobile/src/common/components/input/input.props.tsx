import type { IonInput } from '@ionic/react';

type InputPropsBase = {
  label: string;
  name: string;
  error?: string;
  field?: React.ReactNode;
};

export type InputProps = InputPropsBase &
  Pick<
    Omit<React.ComponentProps<typeof IonInput>, keyof InputPropsBase>,
    'type' | 'placeholder' | 'clearInput' | 'min' | 'max' | 'value'
  >;
