import app from "./app.js";
import connectTODB from "./db/db.js";

const PORT = process.env.PORT || 8000;

connectTODB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} `);
});
