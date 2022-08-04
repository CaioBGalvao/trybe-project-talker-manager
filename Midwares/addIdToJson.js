const fs = require('fs/promises');

const addIdToJson = async (request, response, _next) => {
  const HTTP_CREATED_STATUS = 201;

  const data = await fs.readFile('./talker.json', 'utf-8');
  const dataParceada = JSON.parse(data); // <<<< object
  const id = dataParceada.length + 1;
  const newObject = { id, ...request.body };
  dataParceada.push(newObject);
  await fs.writeFile('./talker.json', JSON.stringify(dataParceada)); // <<<< Necessitava transformar em string
  return response.status(HTTP_CREATED_STATUS).json(newObject);
};

module.exports = { addIdToJson };