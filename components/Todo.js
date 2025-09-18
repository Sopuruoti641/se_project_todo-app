import TodoCounter from "./TodoCounter.js";

class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._completed = data.completed;
    this._data = data;
    this._date = data.date;
    this._selector = selector;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;

      this._handleCheck(this._data.completed);
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      if (this._data.completed) {
        this._handleDelete(true);
      } else {
        this._handleDelete(false);
      }
      this._todoElement.remove();
      this._remove();
    });
  }

  _generateCheckedBox() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    const uniqueId = `todo-${this._data.id}`;
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = uniqueId;
    this._todoLabel.setAttribute("for", uniqueId);
  }

  _toggleCompletion() {
    this._completed = !this._completed;
  }

  _remove = () => {
    if (this._element) {
      this._element.remove();
    }
  };

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");

    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    this._generateCheckedBox();
    this._setEventListeners();

    if (this._data.date) {
      const dueDate = new Date(this._data.date);
      if (!isNaN(dueDate)) {
        this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      }
    }
    return this._todoElement;
  }
}

export default Todo;

// this._toggleCompletion();
// this._handleDelete(this._data.id);
// this._todoElement.remove();
// this._deleteBtnEl.addEventListener("click", this._handleDelete);
// this._todoCheckboxEl.addEventListener("change", () => {
// });
// this._toggleCompletion();
// this._handleDelete(this._data.id);
// this._todoElement.remove();
