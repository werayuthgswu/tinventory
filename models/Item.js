let items = [];
let nextId = 1;

class Item {
  constructor(name, category, detail) {
    this.id = nextId++;
    this.name = name;
    this.category = category;
    this.detail = detail;
    this.comments = [];
  }

  addComment(comment) {
    this.comments.push({
      id: Date.now(),
      text: comment,
      timestamp: new Date()
    });
  }
}

module.exports = {
  getAll: () => items,
  getById: (id) => items.find(item => item.id == id),
  create: (name, category, detail) => {
    const item = new Item(name, category, detail);
    items.push(item);
    return item;
  },
  addComment: (itemId, comment) => {
    const item = items.find(item => item.id == itemId);
    if (item) {
      item.addComment(comment);
      return true;
    }
    return false;
  }
};
