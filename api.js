const express = require('express');
const ping = require('ping');
const config = require('./config.json');

const app = express();

// Route pour tester le ping ICMP de chaque hôte
app.get('/ping', (req, res) => {
  const results = {};
  config.hosts.forEach(host => {
    ping.sys.probe(host, isAlive => {
      results[host] = isAlive;
      console.log(`Host ${host} is ${isAlive ? 'alive' : 'dead'}`);
    });
  });

  // Attendre 1 seconde avant de renvoyer la réponse pour permettre à tous les tests de se terminer
  setTimeout(() => {
    res.json(results);
  }, 1000);
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log(`Server listening on port ${3000}`);
});
