import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';

// a functino which inserts a task into TasksCollection 
const insertTask = taskText => TasksCollection.insert({ text: taskText });

// when the app starts up, if there are no tasks yet, insert a task called "Add a task!"
Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      'Add a task!'
    ].forEach(insertTask)
  }
});