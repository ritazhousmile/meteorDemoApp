import { Meteor } from 'meteor/meteor';
import { Tasks } from '/imports/api/TasksCollection.js';

Meteor.publish('tasks', function () {
    const userId = this.userId;
    if(!userId) {
        return this.ready();
    }
    return Tasks.find({ userId });
});