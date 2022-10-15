<script>
  import { TasksCollection } from '../api/TasksCollection';
  import Task from './Task.svelte';
  // import task form so we have access and can ask users for new tasks in the main app 
  import TaskForm from './TaskForm.svelte';

  // remembers whether or not the hideCompleted box was checked 
  let hideCompleted = false;

  // a function which selects all the tasks such that isChecked isn't true (all the undone tasks)
  const hideCompletedFilter = { isChecked: { $ne: true } };

  let incompleteCount;
  let pendingTasksTitle = '';
  let tasks = [];

  // render the tasks saved in the database
  // $m is Svelte's in-built feature which allows us to maintain our tasks 
  $m: {
    // if hideCompleted is true, then call the hidecompletedFilter function to find all tasks which are undone and find/retrieve only those from the database 
    // make sure to sort the tasks so the newest ones are first 
    tasks = TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch();

    // if hideCompleted is true, then call the hidecompletedFilter function to find all tasks which are undone and find/retrieve only those from the database
    // then count how many there are (that's the number of undone tasks)
    // set to a variable called incompleteCount
    incompleteCount = TasksCollection.find(hideCompletedFilter).count();

    // display number of undone tasks 
    pendingTasksTitle = `${incompleteCount ? ` (${incompleteCount})` : ''}`;
  }

  // sets the hideCompleted variable to something 
  const setHideCompleted = (value) => {
    hideCompleted = value;
  };
</script>

<!-- html code for the app --> 
<div class="app">
  <header>
    <div class="app-bar">
      <div class="app-header">
        <!-- the title and the number of undone tasks next to it --> 
        <h1>📝️ To Do List {pendingTasksTitle}</h1>
      </div>
    </div>
  </header>

  <div class="main">
    <TaskForm />
    <div class="filter">
      <!-- if we click the hide completed button, call the setHideCompleted function which instantiates hideCompleted with the opposite of what it currently is --> 
      <!-- if hideCompleted is now True, then change the button to 'Show All', else change to 'Hide Completed' -->
      <button on:click={() => setHideCompleted(!hideCompleted)}>
        {hideCompleted ? 'Show All' : 'Hide Completed'}
      </button>
    </div>
    <!-- display each of the tasks --> 
    <ul class="tasks">
      {#each tasks as task (task._id)}
        <Task task={task} />
      {/each}
    </ul>
  </div>
</div>