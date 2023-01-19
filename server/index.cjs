require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Open AI Configuration
const configuration = new Configuration({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Express Configuration
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(require("morgan")("dev"));

// Routing

// Primary Open AI Route
app.post("/", async (req, res) => {
  const { message, currentModel, temperature } = req.body;
  const response = await openai.createCompletion({
    model: `${currentModel}`,
    prompt: `Hyper: Hey. I'm Hyper, your fitness coach. You can use me to track your food and generate exercises.\n
		Human: I ate 1 banana\n
		Hyper: Good choice! **1 banana** contains the following:\n
		* 105 calories
		* 1.3g protein
		* 27g carbohydrates
		* 0.3g fat\n
		Human: ${message}.\n`,
    max_tokens: 256,
    temperature: 0.7,
    top_p: 0.9,
    frequency_penalty: 0,
    presence_penalty: -2.0,
    stop: ["Human:"],
  });
  res.json({
    message: response.data.choices[0].text,
  });
});

// Get Models Route
app.get("/models", async (req, res) => {
  const response = await openai.listEngines();
  res.json({
    models: response.data,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
