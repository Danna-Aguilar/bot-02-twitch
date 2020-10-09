const tmi = require("tmi.js");

const options = {
  options: {
    debug: true,
  },
  connection: {
    reconnect: true,
  },
  identity: {
    username: 'dpagrm',
    password: 'oauth:2t9no7c61zx28v1w2gh7oghaajlbra',
  },
  channels: ['dpagrm'],
};

const client = new tmi.client(options);

client.connect();

client.on('connected', (address, port) => {
  client.action(
    ('dpagrm',`Hello, Gamers! Connected to ${address}:${port}`
  ));
});

client.on("chat", (target, ctx, message, self) => {
  // ignore messages from the bot
  if (self) return;

  const commandName = message.trim();

  console.log(target);
  console.log(ctx);

  if (commandName === "hello") {
    client.say(target, `Welcome ${ctx.username}!`);
  } else if (commandName === "!game") {
    client.action("dpagrm", "dpagrm is playing Hacknet.");
  } else if (commandName === "!dice") {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`)
  }
});

function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}