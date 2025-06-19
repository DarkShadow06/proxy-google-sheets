export default async function handler(req, res) {
  // Aggiungi header CORS SEMPRE (anche per preflight)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Gestione richiesta preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Gestione POST vera
  if (req.method === 'POST') {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxvKGM-EqNjULb_PY21rSjoERMv8RcaEpPrkE2r3L2Ya1WVENNZtnybp-_9uMWB4pCP/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
      });

      const data = await response.text();
      res.status(200).send(data);
    } catch (error) {
      res.status(500).json({ error: 'Errore nel proxy: ' + error.message });
    }
  } else {
    res.status(405).send('Solo POST ammesso');
  }
}
