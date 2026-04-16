const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Define 16 cards
const cards = [
  { id: 1, text: "Move forward 3 spaces" },
  { id: 2, text: "Go back 2 spaces" },
  { id: 3, text: "Skip your turn" },
  { id: 4, text: "Roll again" },
  { id: 5, text: "Swap position with another player" },
  { id: 6, text: "Go to start" },
  { id: 7, text: "Advance to nearest bonus tile" },
  { id: 8, text: "Lose 1 turn" },
  { id: 9, text: "Move forward 5 spaces" },
  { id: 10, text: "Go back 3 spaces" },
  { id: 11, text: "Double your next move" },
  { id: 12, text: "Teleport to any tile" },
  { id: 13, text: "Draw another card" },
  { id: 14, text: "Freeze another player" },
  { id: 15, text: "Gain shield (ignore next penalty)" },
  { id: 16, text: "Lose all bonuses" }
];

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// API endpoint
app.get('/generate-cards', (req, res) => {
  const shuffled = shuffle([...cards]);

  let html = `
    <html>
    <head>
      <title>Random Cards</title>
      <style>
        table { border-collapse: collapse; width: 50%; margin: auto; }
        th, td { border: 1px solid black; padding: 10px; text-align: center; }
        th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <h2 style="text-align:center;">Randomized Cards</h2>
      <table>
        <tr>
          <th>Card Number</th>
          <th>Description</th>
        </tr>
  `;

  shuffled.forEach(card => {
    html += `
      <tr>
        <td>${card.id}</td>
        <td>${card.text}</td>
      </tr>
    `;
  });

  html += `
      </table>
    </body>
    </html>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
