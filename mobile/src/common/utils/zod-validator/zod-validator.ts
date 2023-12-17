import type * as z from 'zod';

type Primitive = bigint | boolean | null | number | string | symbol | undefined;

// File type added because it's exist on the FormData type and to make typescript happy!
type PlainObject = Record<string, Primitive | File | object>;

/**
 * validation errors type
 */
type ValidationErrors = Record<string, string>;

/**
 * zodValidator reslut type
 */
type ZodValidatorResult<Data extends PlainObject, Errors extends PlainObject> =
  | {
      success: true;
      data: Data;
      errors: null;
    }
  | {
      success: false;
      data: null;
      errors: Errors;
    };

/**
 * Utility to validate object based on the zod schema
 */
export function zodValidator<T extends PlainObject>(
  value: FormData | URLSearchParams | PlainObject,
  schema: z.ZodType<T>,
): ZodValidatorResult<T, ValidationErrors> {
  const safeValue =
    value instanceof FormData || value instanceof URLSearchParams
      ? Object.fromEntries(value.entries())
      : value;
  const result = schema.safeParse(safeValue);
  if (result.success) return { data: result.data, errors: null, success: true };

  const validationErrors: ValidationErrors = result.error.issues.reduce(
    (prevErrors: ValidationErrors, currentError: z.ZodIssue) => {
      const { path, message } = currentError;
      const fieldName = path[0];
      return { ...prevErrors, [fieldName]: message };
    },
    {},
  );

  return { data: null, errors: validationErrors, success: false };
}
