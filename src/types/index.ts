export interface Config {
  port: number;
  nodeEnv: string;
  googleClientId: string;
  googleClientSecret: string;
  sessionSecret: string;
  clientUrl: string;
  dbUrl: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  googleId: string;
}
