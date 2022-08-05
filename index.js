const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const crypto = require('crypto');
const { emailVerify } = require('./Midwares/emailVerify');
const { passwordVerify } = require('./Midwares/passwordVerify');
const { tokenVerify } = require('./Midwares/tokenVerify');
const { nameVerify } = require('./Midwares/nameVerify');
const { ageVerify } = require('./Midwares/ageVerify');
const { talkVerify } = require('./Midwares/talkVerify');
const { watchedAtVerify } = require('./Midwares/watchedAtVerify');
const { rateVerify } = require('./Midwares/rateVerify');
const { addIdToJson } = require('./Midwares/addIdToJson');
const { modifyTalker } = require('./Midwares/modifyTalker');
const { deleteTalker } = require('./Midwares/deleteTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NOT_FOUND_STATUS = 404;

const PORT = '3000';

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

async function talkerReader() {
  try {
    const data = await fs.readFile('./talker.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
}

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const responseJson = await talkerReader();
  if (responseJson.lenght === 0) {
    return response.status(HTTP_OK_STATUS).json([]);
  }
  return response.status(HTTP_OK_STATUS).json(responseJson);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const responseJson = await talkerReader();
  const talkerById = responseJson.find((talker) => talker.id === Number(id));
  if (talkerById === undefined) {
    return response.status(HTTP_NOT_FOUND_STATUS)
      .send({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(HTTP_OK_STATUS).json(talkerById);
});

app.post('/talker',
  tokenVerify, nameVerify, ageVerify,
  talkVerify, watchedAtVerify,
  rateVerify, addIdToJson, (_request, response) => response.status(HTTP_CREATED_STATUS));

app.put('/talker/:id',
  tokenVerify, nameVerify, ageVerify,
  talkVerify, watchedAtVerify,
  rateVerify, modifyTalker, (_request, response) => response.status(HTTP_OK_STATUS));

app.delete('/talker/:id',
  tokenVerify, deleteTalker, (_request, response) => response.status(HTTP_OK_STATUS));

app.post('/login', emailVerify, passwordVerify, (_request, response) => {
  const generatedToken = generateToken();
  return response.status(HTTP_OK_STATUS).json({ token: generatedToken });
});

app.listen(PORT, () => {
  console.log('Online');
});
