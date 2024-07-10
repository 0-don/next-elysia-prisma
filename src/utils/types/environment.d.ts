declare namespace NodeJS {
  export interface ProcessEnv {
    SECRET: string;
    NEXT_PUBLIC_URL: string;
    DATABASE_URL: string;
  }
}
