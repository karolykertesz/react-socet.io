const { v4: uuid_v4 } = require("uuid");

class User {
  constructor(assignedTo, notes, priority, title) {
    this.id = uuid_v4();
    this.assignedTo = assignedTo;
    this.dueDate = new Date().toLocaleDateString("HU-hu", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    this.notes = notes;
    this.priority = priority;
    this.title = title;
  }
}
module.exports = User;
