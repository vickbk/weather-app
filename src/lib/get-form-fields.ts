export default function getFormFields<T = Record<string, any>>(
  data: FormData
): T {
  const fields: T = {} as T;
  data.forEach((value, key) => {
    (fields as Record<string, any>)[key] = value;
  });
  return fields;
}
