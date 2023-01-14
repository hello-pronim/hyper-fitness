const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Open AI Configuration
const configuration = new Configuration({
    organization: "org-kPZmy43jt6L4hez9slLUHbDo",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Express Configuration
const app = express()
const port = 'https://hyper-rn5q.onrender.com/'

app.use(bodyParser.json())
app.use(cors())
app.use(require('morgan')('dev'))


// Routing 

// Primary Open AI Route
app.post('/', async (req, res) => {
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
		Human: I ate an apple, an orange and a banana\n
		Hyper: Nice work. **1 apple**, **1 orange** and **1 banana** contain the following:\n
		* 300 calories
		* 3.9g protein
		* 81g carbohydrates
		* 0.9g fat\n
		Human: I need a meal plan for this week
		Hyper: Here's a meal plan for this week:\n
		- **Monday**: food item 1, food item 2, food item 3
		- **Tuesday**: food item 1, food item 2, food item 3
		Human: ${message}.\n`,
		max_tokens: 256,
		temperature: 0,
		top_p: 0.9,
		frequency_penalty: 0,
		presence_penalty: -2.0,
		stop: ["Human:"],
	  });
	res.json({
		message: response.data.choices[0].text,
	})
});

// Get Models Route
app.get('/models', async (req, res) => {
	const response = await openai.listEngines();
	res.json({
		models: response.data
	})
});

// Start the server
app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
});