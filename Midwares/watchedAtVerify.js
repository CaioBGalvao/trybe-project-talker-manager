const watchedAtVerify = (request, response, next) => {
  const { talk } = request.body;
  const { watchedAt } = talk;
  const dateReg = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  // ref: Victor Vidal https://github.com/tryber/sd-020-a-project-talker-manager/tree/victor-vidal-sd-020-a-project-talker-manager
  
  const HTTP_BAD_DEFINED_STATUS = 400;
  if (watchedAt === undefined) {
    return response.status(HTTP_BAD_DEFINED_STATUS)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!watchedAt.match(dateReg)) {
    return response.status(HTTP_BAD_DEFINED_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = { watchedAtVerify };