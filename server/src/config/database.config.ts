import { registerAs } from "@nestjs/config";

export type DatabaseConfig = {
  mongoDB: {
    uri: string;
  };
};

export default registerAs("database", (): DatabaseConfig => {
  return {
    mongoDB: {
      uri: process.env.MONGO_URI,
    },
  };
});
