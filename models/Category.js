let categories = ['Electronics', 'Clothing', 'Books'];

module.exports = {
  getAll: () => categories,
  create: (name) => {
    if (!categories.includes(name)) {
      categories.push(name);
      return true;
    }
    return false;
  }
};
