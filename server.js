const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get('/data.json', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Ошибка чтения данных' });
  }
});

app.post('/data.json', async (req, res) => {
  try {
    await fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(req.body, null, 2));
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сохранения данных' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});