const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


let messages = [
  { id: 1, text: 'Hello world!', sender_name: 'kimmo' },
  { id: 2, text: 'Hi there!', sender_name: 'olavi' }
];


app.get('/allMessages', (req, res) => {
  res.json(messages);
});

app.get('/singleMessage/:id', (req, res) => {
  const message = messages.find(m => m.id === parseInt(req.params.id));
  if (message) {
    res.json(message);
  } else {
    res.status(404).send('Message not found');
  }
});

app.post('/newMessage', (req, res) => {
  const newMessage = { id: Date.now(), text: req.body.text };
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

app.delete('/deleteMessage/:id', (req, res) => {
  const index = messages.findIndex(m => m.id === parseInt(req.params.id));
  if (index !== -1) {
    messages.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Message not found');
  }
});

app.put('/modifyMessage', (req, res) => {
  const { id, text } = req.body;
  const message = messages.find(m => m.id === id);
  if (message) {
    message.text = text;
    res.json(message);
  } else {
    res.status(404).send('Message not found');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
