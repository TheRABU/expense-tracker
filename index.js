import app from "./app/app.js";
import { connectDatabase } from "./app/db/dbConnect.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started successfully");
  connectDatabase();
});
