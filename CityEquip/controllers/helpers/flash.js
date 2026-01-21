module.exports = (req, message, type = "info") => {
  if (!req.session.flashes) {
    req.session.flashes = {};
  }
  if (!req.session.flashes[type]) {
    req.session.flashes[type] = [];
  }
  req.session.flashes[type].push(message);
};
