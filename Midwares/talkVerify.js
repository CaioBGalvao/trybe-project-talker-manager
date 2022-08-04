const talkVerify = (request, response, next) => {
  const { talk } = request.body;

  const HTTP_BAD_DEFINED_STATUS = 400;
  if (talk === undefined) {
    return response.status(HTTP_BAD_DEFINED_STATUS)
      .json({ message: 'O campo "talk" é obrigatório' });
  }

  next();
};

module.exports = { talkVerify };