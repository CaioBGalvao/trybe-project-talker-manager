const fs = require('fs/promises');

const modifyTalker = async (request, response, _next) => {
  const HTTP_OK_STATUS = 200;

  const { id } = request.params;

  const data = await fs.readFile('./talker.json', 'utf-8');
  const dataParceada = JSON.parse(data); // <<<< object

  const numberId = Number(id);
  const dataToInsert = { id: numberId, ...request.body };
  dataParceada[id - 1] = dataToInsert;
  
  await fs.writeFile('./talker.json', JSON.stringify(dataParceada)); // <<<< Necessitava transformar em string
  return response.status(HTTP_OK_STATUS).json(dataToInsert);
};

module.exports = { modifyTalker };