const ageVerify = (request, response, next) => {
  const { age } = request.body;
  const HTTP_BAD_DEFINED_STATUS = 400;

  if (age === undefined) {
    return response.status(HTTP_BAD_DEFINED_STATUS)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) <= 18) {
    return response.status(HTTP_BAD_DEFINED_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

module.exports = { ageVerify };
