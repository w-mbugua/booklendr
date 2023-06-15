import { FieldError } from '@/generated/gql/graphql';

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }: FieldError) => {
    errorMap[field] = message;
  });

  return errorMap;
};
