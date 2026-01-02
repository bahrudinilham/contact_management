import { web } from "./application/web.js";

web.listen(process.env.PORT || 3000, () => {
  console.log("App start");
});
