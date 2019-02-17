module.exports = (req, res) => {
  const referrer = req.session.referrer;
  delete req.session.referrer;
  res.status(200).send(referrer);
};
