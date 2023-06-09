// I CREATED THIS FILE

import invariant from "tiny-invariant";

export function getEnv() {
  invariant(process.env.ADMIN_EMAIL, "env var Admin email not defined ");

  return {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  };
}

type ENV = ReturnType<typeof getEnv>;

// ADDED THIS SO TYPSCRIPT STO YELLING
declare global {
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}
