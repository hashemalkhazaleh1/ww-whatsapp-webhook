const https = require("https");

const TOKEN = process.env.WA_TOKEN;
const PHONE_NUMBER_ID = "1170395012834827";
const TO = "14196562881";

const data = JSON.stringify({
  messaging_product: "whatsapp",
  to: TO,
  type: "template",
  template: {
    name: "order_confirmation",
    language: { code: "ar" },
    components: [
      {
        type: "body",
        parameters: [
          { type: "text", text: "أحمد" },
          { type: "text", text: "35" }
        ]
      }
    ]
  }
});

const options = {
  hostname: "graph.facebook.com",
  path: `/v20.0/${PHONE_NUMBER_ID}/messages`,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${TOKEN}`,
    "Content-Length": data.length
  }
};

const req = https.request(options, (res) => {
  let body = "";
  res.on("data", (chunk) => (body += chunk));
  res.on("end", () => console.log("Response:", body));
});

req.on("error", (e) => console.error("Error:", e));
req.write(data);
req.end();
