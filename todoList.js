const Todo = require("./todo");

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError("can only add Todo objects");
    }
    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw ReferenceError(`invalid index: ${index}`);
    }
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every((todo) => todo.isDone());
  }

  pop() {
    return this.todos.pop();
  }

  shift() {
    return this.todos.shift();
  }

  removeAt(index) {
    this._validateIndex(index);
    return [this.todos.splice(index, 1)];
  }

  toString() {
    const title = `---- ${this.title} ----`;
    const list = this.todos.map((todo) => String(todo)).join("\n");
    return `${title}\n${list}`;
  }

  forEach(callback) {
    this.todos.forEach(callback);
  }

  filter(callback) {
    const newTodoList = new TodoList(this.title);
    this.todos.forEach((todo) => {
      if (callback(todo)) newTodoList.add(todo);
    });
    return newTodoList;
  }

  findByTitle(title) {
    return this.filter((todo) => todo.getTitle() === title).first();
  }

  allDone() {
    return this.filter((todo) => todo.isDone());
  }

  allNotDone() {
    return this.filter((todo) => !todo.isDone());
  }

  markDone(title) {
    const todo = this.findByTitle(title);
    if (todo) todo.markDone();
  }

  markAllDone() {
    this.forEach((todo) => todo.markDone());
  }

  markAllUndone() {
    this.forEach((todo) => todo.markUndone());
  }

  toArray() {
    return [...this.todos];
  }
}

module.exports = TodoList;
