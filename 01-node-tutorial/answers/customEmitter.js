const EventEmitter = require("events");
const emitter = new EventEmitter();

// Handler for 'greet' event
emitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

// Handler for 'timer' event
emitter.on("timer", (msg) => {
  console.log(`Timer event received with message: ${msg}`);
});

// Handler for 'countdown' event that triggers another event
emitter.on("countdown", (number) => {
  console.log(`Countdown: ${number}`);
  if (number > 0) {
    setTimeout(() => {
      emitter.emit("countdown", number - 1);
    }, 1000);
  } else {
    emitter.emit("finished");
  }
});

// Handler for 'finished' event
emitter.on("finished", () => {
  console.log("Countdown finished!");
});

// Emit 'greet' event
emitter.emit("greet", "Olga");

// Emit 'timer' event every 2 seconds
setInterval(() => {
  emitter.emit("timer", "Hello from timer!");
}, 2000);

// Start a countdown from 5
emitter.emit("countdown", 5);

// Async function to wait for 'specialEvent'
const waitForEvent = () => {
  return new Promise((resolve) => {
    emitter.on("specialEvent", (msg) => resolve(msg));
  });
};

const doWait = async () => {
  const msg = await waitForEvent();
  console.log("We got a special event! Here it is: ", msg);
};

doWait();

// Emit 'specialEvent' after 3 seconds
setTimeout(() => {
  emitter.emit("specialEvent", "This is a special event!");
}, 3000);