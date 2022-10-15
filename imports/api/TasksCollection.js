// import Mongo to allow us to connect to database 
import { Mongo } from 'meteor/mongo';
 
// instantiates a new Mongo collection and exports it 
export const TasksCollection = new Mongo.Collection('tasks');