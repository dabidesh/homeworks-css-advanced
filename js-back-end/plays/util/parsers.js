// Може да обработва грешките само от mongoose
// Mоже и от валидатора, ако са на повече места!

const parseError = (err) => {
  if (err.name == 'ValidationError') {
    return Object.values(err.errors).map(e => e.properties.message);
  } else {
    return [err.message];
  }
};

module.exports = parseError;