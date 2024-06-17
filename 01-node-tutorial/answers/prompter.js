const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

// Function to parse the body of the POST request
const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// Declare variables to store the random number and feedback message
let randomNumber = Math.floor(Math.random() * 100) + 1;
let message = "Guess a number between 1 and 100:";

// HTML form with string interpolation to display feedback message
const form = () => {
  return `
  <body>
    <p>${message}</p>
    <form method="POST">
      <input name="guess" type="number" min="1" max="100"></input>
      <button type="submit">Submit</button>
    </form>
  </body>
  `;
};

// Create HTTP server
const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);

  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      
      // Logic to handle the user's guess
      if (body["guess"]) {
        const guess = parseInt(body["guess"], 10);
        if (isNaN(guess)) {
          message = "Please enter a valid number.";
        } else if (guess < randomNumber) {
          message = "Your guess is too low. Try again:";
        } else if (guess > randomNumber) {
          message = "Your guess is too high. Try again:";
        } else {
          message = "Congratulations! You guessed the correct number!";
          randomNumber = Math.floor(Math.random() * 100) + 1; // Reset the game with a new number
        }
      } else {
        message = "Please enter a number.";
      }

      // Redirect to the main page
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);

console.log("The server is listening on port 3000.");