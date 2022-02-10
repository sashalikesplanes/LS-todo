const Todo = require("./todo");
const TodoList = require("./todolist");

describe("TodoList", () => {
  let todo1, todo2, todo3, list;

  beforeEach(() => {
    todo1 = new Todo("buy milk");
    todo2 = new Todo("clean room");
    todo3 = new Todo("go to the gym");

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  describe("tests for all of the methods of the TodoList object", () => {
    const testCallbackThrowsReferenceError = (callback) => {
      expect(() => callback(-1)).toThrow(ReferenceError);
      expect(() => callback(-10)).toThrow(ReferenceError);
      expect(() => callback(3)).toThrow(ReferenceError);
      expect(() => callback(5)).toThrow(ReferenceError);
    };

    test("new todo list has size equal to the number of todos added", () => {
      expect(list.size()).toBe(3);
    });

    test("toArray produces a correct array of todos", () => {
      let testTodoArray = [todo1, todo2, todo3];
      expect(list.toArray()).toEqual(testTodoArray);
    });

    test("calling first returns the first todo", () => {
      expect(list.first()).toEqual(todo1);
    });

    test("calling last returns last todo", () => {
      expect(list.last()).toEqual(todo3);
    });

    test("shift removes an item from the todolist", () => {
      expect(list.shift()).toEqual(todo1);
      expect(list.size()).toBe(2);
      expect(list.toArray()).toEqual([todo2, todo3]);
    });

    test("pop removes an item from the todoList", () => {
      expect(list.pop()).toEqual(todo3);
      expect(list.size()).toBe(2);
      expect(list.toArray()).toEqual([todo1, todo2]);
    });

    test("expect isDone to return false if there undone todos and true if all done", () => {
      expect(list.isDone()).toBe(false);
      list.markDone("buy milk");
      expect(list.isDone()).toBe(false);
      list.markDone("clean room");
      expect(list.isDone()).toBe(false);
      list.markDone("go to the gym");
      expect(list.isDone()).toBe(true);
    });

    test("add method accepts a valid todo and throws type error if not instance of todo", () => {
      expect(() => list.add(new Todo("test"))).not.toThrow();
      expect(() => list.add(1)).toThrow(TypeError);
      expect(() => list.add("test")).toThrow(TypeError);
      expect(() => list.add(new TodoList("test"))).toThrow(TypeError);
    });

    test("expect itemAt to return correct item and to throw if invalid index", () => {
      expect(list.itemAt(0)).toEqual(todo1);
      expect(list.itemAt(1)).toEqual(todo2);
      expect(list.itemAt(2)).toEqual(todo3);
      testCallbackThrowsReferenceError(list.itemAt.bind(list));
    });

    test("expect itemAt to return correct item and to throw if invalid index", () => {
      expect(list.itemAt(0)).toEqual(todo1);
      expect(list.itemAt(1)).toEqual(todo2);
      expect(list.itemAt(2)).toEqual(todo3);
      testCallbackThrowsReferenceError(list.itemAt.bind(list));
    });

    test("mark done At marks an item done and raises erorr if invalid index", () => {
      list.markDoneAt(0);
      expect(list.itemAt(0).isDone()).toBe(true);
      expect(list.itemAt(1).isDone()).toBe(false);
      testCallbackThrowsReferenceError(list.markDoneAt.bind(list));
    });

    test("markUndoneAt marks an item undone and raises error if invalid index", () => {
      todo1.markDone();
      todo2.markDone();
      todo3.markDone();
      list.markUndoneAt(0);
      expect(todo1.isDone()).toBe(false);
      testCallbackThrowsReferenceError(list.markUndoneAt.bind(list));
    });

    test("markAllDone marks all todos as done", () => {
      list.markAllDone();
      expect(todo1.isDone()).toBe(true);
      expect(todo2.isDone()).toBe(true);
      expect(todo3.isDone()).toBe(true);
    });

    test("removeAt removes an item and throws error if invalid index", () => {
      list.removeAt(1);
      expect(list.toArray()).toEqual([todo1, todo3]);
      testCallbackThrowsReferenceError(list.removeAt.bind(list));
    });

    test("toString returns correct string representation (all undone)", () => {
      let string =
        "---- Today's Todos ----\n" +
        "[ ] buy milk\n" +
        "[ ] clean room\n" +
        "[ ] go to the gym";

      expect(list.toString()).toBe(string);
    });

    test("toString returns correct string representation (some done)", () => {
      todo1.markDone();
      todo2.markDone();
      let string =
        "---- Today's Todos ----\n" +
        "[X] buy milk\n" +
        "[X] clean room\n" +
        "[ ] go to the gym";

      expect(list.toString()).toBe(string);
    });

    test("toString returns correct string representation (all done)", () => {
      todo1.markDone();
      todo2.markDone();
      todo3.markDone();
      let string =
        "---- Today's Todos ----\n" +
        "[X] buy milk\n" +
        "[X] clean room\n" +
        "[X] go to the gym";

      expect(list.toString()).toBe(string);
    });

    test("for Each iterates over all of the todos", () => {
      const testTodoArr = [];
      list.forEach((todo) => testTodoArr.push(todo));
      expect(list.toArray()).toEqual([todo1, todo2, todo3]);
    });

    test("filter correctly removes todods", () => {
      const testTodoList = new TodoList(list.title);
      testTodoList.add(todo1);
      expect(
        list.filter((todo) => {
          return todo.getTitle() === "buy milk";
        })
      ).toEqual(testTodoList);
    });

    test("allDone returns all the done todos", () => {
      const testTodoList = new TodoList(list.title);
      testTodoList.add(todo1);
      todo1.markDone();
      expect(list.allDone()).toEqual(testTodoList);
    });

    test("allNotDone returns all the undone todos", () => {
      const testTodoList = new TodoList(list.title);
      testTodoList.add(todo2);
      testTodoList.add(todo3);
      todo1.markDone();
      expect(list.allNotDone()).toEqual(testTodoList);
    });

    test("markAllUndone marks all todos as undone", () => {
      todo1.markDone();
      todo3.markDone();
      list.markAllUndone();
      expect(todo1.isDone()).toBe(false);
      expect(todo2.isDone()).toBe(false);
    });

    test("mark done does nothing if the title is not in the list", () => {
      const testList = { ...list };
      list.markDone("non existent todo");
      expect(list).toEqual(testList);
    });
  });
});
