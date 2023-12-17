import { Input } from '@/common/components';

export type FormInputField = React.ComponentProps<typeof Input>;
export function defineFormInputFields<T extends FormInputField>(formInputFields: T[]) {
  return {
    mapErrors(errors?: Record<string, string>) {
      if (!errors) return formInputFields;
      return formInputFields.map((field) => ({
        ...field,
        error: errors[field.name] ?? null,
      }));
    },
  };
}
