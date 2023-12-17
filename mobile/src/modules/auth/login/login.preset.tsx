import { defineFormInputFields } from '@/common/utils';
import type { FormInputField } from '@/common/utils';

export const getFormInputFields = () =>
  defineFormInputFields([
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email ...',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password ...',
    },
  ] satisfies FormInputField[]);
