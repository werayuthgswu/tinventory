const Category = require('../models/Category');

module.exports = {
  showCreateForm: (req, res) => {
    res.render('categories/create');
  },

  createCategory: (req, res) => {
    const { name } = req.body;
    Category.create(name);
    res.redirect('/categories/new');
  }
};
