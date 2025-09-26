"use client";

import { startTransition } from "react";

export default function errorProneTransition<T>(
  callback: () => void,
  errorCallback?: (...args: T[]) => any,
  ...args: T[]
) {
  startTransition(() => {
    try {
      callback();
    } catch (error) {
      console.log(error);
      errorCallback?.(...args);
    }
  });
}

// Calling an action within a try catch block to catch all error types
export function formErrorProneAction<
  Action extends (...args: any) => any,
  ErrorParams
>(
  action: Action,
  errorCallback?: (...args: ErrorParams[]) => any,
  ...errorArgs: ErrorParams[]
) {
  return async (...args: Parameters<typeof action>) => {
    try {
      return await action(...args);
    } catch (error: any) {
      errorCallback?.(...errorArgs);
      return { error: error.message, fullError: error };
    }
  };
}
