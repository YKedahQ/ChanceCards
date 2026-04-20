const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Define 16 cards (fixed order)
const cards = [
  { ChanceCardID: 1, beschrijving: "Ga naar Start (Ontvang $200)." },
  { ChanceCardID: 2, beschrijving: "Ga naar Kalverstraat." },
  { ChanceCardID: 3, beschrijving: "Ga naar Neude. Als u langs Start komt, ontvangt u $200." },
  { ChanceCardID: 4, beschrijving: "Ga verder naar het dichtstbijzijnde Nutsbedrijf." },
  { ChanceCardID: 5, beschrijving: "Ga verder naar het dichtstbijzijnde Station." },
  { ChanceCardID: 6, beschrijving: "Ga verder naar het dichtstbijzijnde Station." },
  { ChanceCardID: 7, beschrijving: "Ga drie vakjes terug." },
  { ChanceCardID: 8, beschrijving: "Ga direct naar de gevangenis. Ga niet langs Start." },
  { ChanceCardID: 9, beschrijving: "Maak een rit naar Station Zuid. Als u langs Start komt, ontvangt u $200." },
  { ChanceCardID: 10, beschrijving: "Ga naar de Heerestraat (Groningen). Als u langs Start komt, ontvangt u $200." },
  { ChanceCardID: 11, beschrijving: "De bank betaalt u dividend van $50." },
  { ChanceCardID: 12, beschrijving: "Uw bouwlening vervalt. Ontvang $150." },
  { ChanceCardID: 13, beschrijving: "Betaal $25 per huis en $100 per hotel." },
  { ChanceCardID: 14, beschrijving: "Betaal armenbelasting van $15." },
  { ChanceCardID: 15, beschrijving: "U bent verkozen tot voorzitter. Betaal iedere speler $50." },
  { ChanceCardID: 16, beschrijving: "Deze kaart mag u behouden tot u deze nodig heeft." }
];

// API endpoint → returns CSV with shuffled ORDERID
app.get('/generate-cards', (req, res) => {

  // Create shuffled ORDERIDs (1–16)
  const orderIds = Array.from({ length: cards.length }, (_, i) => i + 1)
    .sort(() => Math.random() - 0.5);

  // Build CSV
  let csv = "ChanceCardID,Beschrijving,OrderId\n";

  cards.forEach((card, index) => {
    csv += `${card.ChanceCardID},"${card.beschrijving}",${orderIds[index]}\n`;
  });

  // Set CSV header
  res.setHeader('Content-Type', 'text/csv');

  res.send(csv);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
