declare namespace NodeJS {
  interface ProcessEnv {
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    ACCESS_TOKEN: string;
    PORT: string;
    MONGO_DB_PATH: string;
  }
}
