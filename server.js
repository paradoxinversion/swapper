const path = require("path");
const express = require("express");
const app = express();

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.resolve(__dirname, "dist")));
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, "dist/index.html"));
  });
}
app.listen(process.env.PORT || 3000, () =>
  console.log("Example app listening on port 3000!")
);
