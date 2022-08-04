const nameVerify = (request, response, next) => {
  const { name } = request.body;
  const HTTP_BAD_DEFINED_STATUS = 400;
  if (name === undefined) {
    return response.status(HTTP_BAD_DEFINED_STATUS)
      .json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return response.status(HTTP_BAD_DEFINED_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

module.exports = { nameVerify };