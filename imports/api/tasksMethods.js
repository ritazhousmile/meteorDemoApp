import { Meteor } from 'meteor/meteor';
import { Tasks } from '/imports/api/TasksCollection.js';

Meteor.methods({
    async 'tasks.insert'(text) {
        // Allow anonymous users for now
        console.log('Server: Inserting task:', text);
        try {
            const result = await Tasks.insertAsync({ text, createdAt: new Date(), userId: this.userId   });
            console.log('Server: Task inserted with ID:', result);
            return result;
        } catch (error) {
            console.error('Server: Error inserting task:', error);
            throw error;
        }
    },
    async 'tasks.toggleChecked'(_id, isChecked) {
        return Tasks.updateAsync(_id, { $set: { isChecked: !isChecked } });
    },
    async 'tasks.delete'(_id) {
        return Tasks.removeAsync(_id);
    },
});