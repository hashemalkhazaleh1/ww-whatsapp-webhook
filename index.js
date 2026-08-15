const express = require("express");
const app = express();
const verificationToken = "ww_verify_2026";
app.use(express.json());
app.get("/", (_req, res) => {
  res.sendStatus(200);
});
app.get("/webhook", (req, res) => {
  const { "hub.mode": mode, "hub.verify_token": verifyToken, "hub.challenge": challenge } =
    req.query;
  if (mode === "subscribe" && verifyToken === verificationToken) {
    return res.status(200).type("text/plain").send(String(challenge ?? ""));
  }
  return res.sendStatus(403);
});
app.post("/webhook", (req, res) => {
  console.log(req.body);
  return res.sendStatus(200);
});
const port = Number(process.env.PORT);
if (!Number.isInteger(port) || port <= 0) {
  throw new Error("PORT environment variable must be a positive integer.");
}
app.listen(port, "0.0.0.0", () => {
  console.log(`Webhook server listening on port ${port}`);
});
