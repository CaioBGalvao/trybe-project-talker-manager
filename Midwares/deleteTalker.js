const fs = require('fs/promises');

const deleteTalker = async (request, response, _next) => {
  const HTTP_NO_CONTENT_STATUS = 204;

  const { id } = request.params;

  const data = await fs.readFile('./talker.json', 'utf-8');
  const dataParceada = JSON.parse(data); // <<<< object
  const numberId = Number(id);
  dataParceada.splice(numberId - 1, 1);
  await fs.writeFile('./talker.json', JSON.stringify(dataParceada)); // <<<< Necessitava transformar em string
  return response.status(HTTP_NO_CONTENT_STATUS).end();
};

module.exports = { deleteTalker };