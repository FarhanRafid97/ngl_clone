import { FieldError } from '../generated/graphql';

export const errorHandler = (errors: FieldError) => {
  const errorMap: Record<string, string> = {};

  errorMap[errors.field] = errors.message;
  console.log('errormap', errorMap);
  //   console.log(errors, errorMap);
  return errorMap;
};
