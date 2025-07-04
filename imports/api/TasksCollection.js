import { Mongo } from "meteor/mongo";

export const Tasks = new Mongo.Collection('tasks');

// Allow client-side operations
Tasks.allow({
  insert: function () {
    return true; // Allow all inserts
  },
  update: function () {
    return true; // Allow all updates
  },
  remove: function () {
    return true; // Allow all removes
  }
});