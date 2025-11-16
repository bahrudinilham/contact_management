import { app } from "./application/server.js";

const port = 3000;

app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});
