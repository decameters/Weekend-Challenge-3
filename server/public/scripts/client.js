console.log('JS loaded');

$(document).ready(onReady);

function onReady(){
    console.log('JQ loaded');
    $('#addTaskButton').on('click', addTask);
    $('#viewTasks').on('click', '.deleteButton', deleteTask);
    $('#viewTasks').on('click', '.completeButton', markTaskAsComplete);
    getAllTasks()
}

function addTask(){
    var addTaskIn = $('#taskAddIn').val();
    $.ajax({
        method: 'POST',
        url: '/todo',
        data: {
            task: addTaskIn
        },
        success: function (response) {
            console.log('response', response);
            $('#taskAddIn').val('');
            getAllTasks();
        }
    })
}

function getAllTasks(){
    $.ajax({
        method: 'GET',
        url: '/todo',
        success: function (response) {
            console.log('GET response', response);
            $('#viewTasks').empty();
            for (var i = 0; i < response.length; i++) {
                var task = response[i];
                var $newTask = $('<tr><td>' + response[i].task + '</td><td>' + response[i].completed + '</td></tr>');
                
                var $completeButton = $('<tr><td><button class = "completeButton">Mark as Completed</button></td></tr>');
                $completeButton.data('id', task.id);
                $newTask.prepend($completeButton);

                var $deleteTaskButton = $('<tr><td><button class="deleteButton">X</button></td></tr>');
                $deleteTaskButton.data('id', task.id);
                $newTask.append($deleteTaskButton);
                $('#viewTasks').append($newTask);
                }
            
        }
    })
}

function markTaskAsComplete(){
    var taskToComplete = $(this).parent().parent().data().id;
    console.log('task completed was clicked, task ID was', taskToComplete);
    var taskCompleted = 'Yes.';

    $.ajax({
        method: 'PUT',
        url: '/todo/' + taskToComplete,
        data: {
            completed: taskCompleted
        },
        success: function(response){
            console.log('mark task as complete', response);
            
            getAllTasks();

        }
    })
    
    // var $taskCompleteButton = $('button class="completeButton">Mark As Complete</button>');
    // $taskCompleteButton.data('id', task.id);
    
    
}

function deleteTask(){
    var taskToDelete = $(this).parent().parent().data().id;
    // console.log('delete task was clicked, task ID was', taskToDelete);
    $.ajax({
        method: 'DELETE',
        url: '/todo/' + taskToDelete,
        success: function (response){
            getAllTasks();
        }
    })
}

/* this all needs to be a table... not sure about the taskAddInput
since on this its already on the database... */

// function appendTasksToDOM(task){
    // var $newTaskListItem = $('<tr></tr>');

    // var $taskAddInput = $('#taskAddIn').val();
    // // $taskAddInput.val()
    // $newTaskListItem.append($taskAddInput);
// }