"use client";

import { startTransition } from "react";

export default function errorProneTransition<T = any>(
  callback: () => void,
  errorCallback?: (...args: T[]) => any,
  ...args: T[]
) {
  startTransition(() => {
    try {
      callback();
    } catch (error) {
      console.log(error);
      errorCallback && errorCallback(...args);
    }
  });
}
