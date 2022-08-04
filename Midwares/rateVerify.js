const rateVerify = (request, response, next) => {
  const { talk } = request.body;
  const { rate } = talk;

  const HTTP_BAD_DEFINED_STATUS = 400;
  if (rate === undefined) {
    return response.status(HTTP_BAD_DEFINED_STATUS)
      .json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rate < 1 || rate > 5) {
    return response.status(HTTP_BAD_DEFINED_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = { rateVerify };