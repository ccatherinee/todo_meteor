<script>
    // need to import TasksCollection to save new task to database 
    import { TasksCollection } from '../api/TasksCollection';

    let newTask = '';

    // function which will insert our new task 
    const handleSubmit = () => {
        // insert a task into the collection
        // each task remembers its text and when it was created 
        TasksCollection.insert({
            text: newTask,
            createdAt: new Date(), // current time
        });

        // clear form
        newTask = '';
    }
</script>

<!-- html to create a form which allows users to submit new tasks --> 
<!-- add "on:submit|preventDefault={handleSubmit}" to form tag in order to execute handleSubmit function when form is submitted --> 
<!-- form takes text and has placeholder "Type to add new tasks" --> 
<!-- bind whatever is input into the task form to the variable newTask --> 
<form class="task-form" on:submit|preventDefault={handleSubmit}>
    <input
            type="text"
            name="text"
            placeholder="Type to add new tasks"
            bind:value={newTask}
    />
    <button type="submit">Add Task</button>
</form>