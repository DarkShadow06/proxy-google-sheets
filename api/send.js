export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwfJVaDZEvBpBtluwNvF8dqapvGDUIGAw28jLIfKnb9NXhhhnuG3dEgAHmfzHWrfhVw/exec', {
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
