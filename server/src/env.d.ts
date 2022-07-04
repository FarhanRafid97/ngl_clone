declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      REDIS_URL: string;
      PORT: string;
      CORS: string;
      SESSION_SECRET: string;
    }
  }
}

export {}
