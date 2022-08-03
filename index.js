const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_BAD_REQUEST_STATUS = 400;

const PORT = '3000';

function emailVerify(email) {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email === undefined) {
    return undefined
  }
  if (email.match(validRegex)) {
    return true;
  }
  return false;
}

function passwordVerify(password) {
  if (password === undefined) {
    return undefined;
  }
  if (password.length >= 6) {
    return true
  }
  return false;
}

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

async function talkerReader() {
  try {
    const data = await fs.readFile('./talker.json', 'utf-8');
    return JSON.parse(data)
  } catch (err) {
    console.log(err.message);
  }
}

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const responseJson = await talkerReader()
  if (responseJson.lenght === 0) {
    return response.status(HTTP_OK_STATUS).json([]);
  }
  return response.status(HTTP_OK_STATUS).json(responseJson);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const responseJson = await talkerReader()
  const talkerById = responseJson.find((talker) => talker.id === Number(id));
  if (talkerById === undefined) {
    return response.status(HTTP_NOT_FOUND_STATUS).send({ message: "Pessoa palestrante não encontrada" });
  }
  return response.status(HTTP_OK_STATUS).json(talkerById);
});

app.post('/login', (request, response) => {
  const { email, password } = request.body;
  const emailStatus = emailVerify(email);
  const passwordStatus = passwordVerify(password);
  if (emailStatus === undefined) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({ "message": "O campo \"email\" é obrigatório" });
  }
  if (emailStatus === false) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({ "message": "O \"email\" deve ter o formato \"email@email.com\"" });
  }
  if (passwordStatus === undefined) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({
      "message": "O campo \"password\" é obrigatório"
    });
  }
  if (passwordStatus === false) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({
      "message": "O \"password\" deve ter pelo menos 6 caracteres"
    });
  }
  const generatedToken = generateToken()
  return response.status(HTTP_OK_STATUS).json({ token: generatedToken });
});


app.listen(PORT, () => {
  console.log('Online');
});
