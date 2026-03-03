import * as dotenv from "dotenv";
import buildApp from "./app";

dotenv.config();

const start = async () => {
  const app = await buildApp();
  try {
    await app.listen({ port: 8000, host: "0.0.0.0" });
    console.log(`Server listening on http://localhost:8000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
