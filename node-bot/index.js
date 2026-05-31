let express = require("express");
let app = express();
let bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.json()); 
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.post("/new-message", function(req, res) {
	const { message } = req.body

	
	if (!message || message.text.toLowerCase().indexOf("marco") < 0) {
		return res.end()
	}

	axios
		.post(
			"https://api.telegram.org/bot777845702:AAFdPS_taJ3pTecEFv2jXkmbQfeOqVZGER/sendMessage",
			{
				chat_id: message.chat.id,
				text: "Polo!!",
			}
		)
		.then((response) => {
			console.log("Message posted");
			res.end("ok");
		})
		.catch((err) => {
			console.log("Error :", err);
			res.end("Error :" + err);
		});
});


app.listen(3000, function() {
	console.log("Telegram app listening on port 3000!");
});