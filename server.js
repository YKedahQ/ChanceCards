const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Define 16 cards (fixed order)
const cards = [
  { Chance_RecordId: 1, beschrijving: "Ga naar Start (Ontvang $200)." },
  { Chance_RecordId: 2, beschrijving: "Ga naar Kalverstraat." },
  { Chance_RecordId: 3, beschrijving: "Ga naar Neude. Als u langs Start komt, ontvangt u $200." },
  { Chance_RecordId: 4, beschrijving: "Ga verder naar het dichtstbijzijnde Nutsbedrijf." },
  { Chance_RecordId: 5, beschrijving: "Ga verder naar het dichtstbijzijnde Station." },
  { Chance_RecordId: 6, beschrijving: "Ga verder naar het dichtstbijzijnde Station." },
  { Chance_RecordId: 7, beschrijving: "Ga drie vakjes terug." },
  { Chance_RecordId: 8, beschrijving: "Ga direct naar de gevangenis. Ga niet langs Start." },
  { Chance_RecordId: 9, beschrijving: "Maak een rit naar Station Zuid. Als u langs Start komt, ontvangt u $200." },
  { Chance_RecordId: 10, beschrijving: "Ga naar de Heerestraat (Groningen). Als u langs Start komt, ontvangt u $200." },
  { Chance_RecordId: 11, beschrijving: "De bank betaalt u dividend van $50." },
  { Chance_RecordId: 12, beschrijving: "Uw bouwlening vervalt. Ontvang $150." },
  { Chance_RecordId: 13, beschrijving: "Betaal $25 per huis en $100 per hotel." },
  { Chance_RecordId: 14, beschrijving: "Betaal armenbelasting van $15." },
  { Chance_RecordId: 15, beschrijving: "U bent verkozen tot voorzitter. Betaal iedere speler $50." },
  { Chance_RecordIdD: 16, beschrijving: "Deze kaart mag u behouden tot u deze nodig heeft." }
];

// API endpoint → returns CSV with shuffled ORDERID
app.get('/generate-cards', (req, res) => {

  // Create shuffled ORDERIDs (1–16)
  const orderIds = Array.from({ length: cards.length }, (_, i) => i + 1)
    .sort(() => Math.random() - 0.5);

  // Build CSV
  let csv = "Chance_RecordId,Beschrijving,OrderId\n";

  cards.forEach((card, index) => {
    csv += `${card.Chance_RecordId},"${card.beschrijving}",${orderIds[index]}\n`;
  });

  // Set CSV header
  res.setHeader('Content-Type', 'text/csv');

  res.send(csv);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
