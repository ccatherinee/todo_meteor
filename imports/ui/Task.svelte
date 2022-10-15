<script>
  import { TasksCollection } from '../api/TasksCollection';

  export let task;

  // the function which is called when user clicks the checkbox of a task 
  const toggleChecked = () => {
    // uses the task id to find which task was the one who's checkbox was toggled 
    // finds the task with task id and sets its checked property to the opposite of its current value
    TasksCollection.update(task._id, {
      $set: { isChecked: !task.isChecked }
    });
  };

  // use task id to find which task's remove button was clicked 
  // remove the task with task id from database 
  const deleteThisTask = () => {
    TasksCollection.remove(task._id);
  };
</script>

<!-- a checkbox element to task component --> 
<!-- when clicked, call the function toggleChecked (explained above) --> 
<li>
    <input
            type="checkbox"
           readonly
           checked={!!task.isChecked}
           on:click={toggleChecked}
    />
    <span>{ task.text }</span>
    <!-- add a delete button --> 
    <!-- call the function deleteThisTask when clicked (explained above) --> 
    <button class="delete" on:click={deleteThisTask}>&times;</button>
</li>