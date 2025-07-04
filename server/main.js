import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { Tasks } from '/imports/api/TasksCollection.js';
import '/imports/api/TasksPublications.js';
import { Accounts } from 'meteor/accounts-base';
import '/imports/api/tasksMethods.js';

// Constants
const SEED_USERNAME = 'meteor';
const SEED_PASSWORD = 'password';

// Helper functions
const insertTask = async (taskText) => {
  await Tasks.insertAsync({
    text: taskText,
    createdAt: new Date(),
  });
};

const insertLink = async ({ title, url }) => {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
};

// Server startup
Meteor.startup(async () => {
  console.log('Server starting - Tasks collection imported:', !!Tasks);
  console.log('Server starting - TasksPublications imported');

  // Create seed user if it doesn't exist
  if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    const user = await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
    console.log('User:', user);
  }

  // If the Tasks collection is empty, add some data
  if (await Tasks.find().countAsync() === 0) {
    await insertTask('First Task');
  }

  // If the Links collection is empty, add some data
  if (await LinksCollection.find().countAsync() === 0) {
    await insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app',
    });

    await insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    await insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    await insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }

  // Publish the entire Links collection to all clients
  Meteor.publish("links", function () {
    return LinksCollection.find();
  });
});
