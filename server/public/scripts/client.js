console.log('JS loaded');

$(document).ready(onReady);

function onReady(){
    console.log('JQ loaded');
    $('#addTaskButton').on('click', addTask);
    $('#viewTasks').on('click', '.deleteButton', deleteTask);
    $('#viewTasks').on('click', '.completeButton', markTaskAsComplete);
    
    getAllTasks()
}

// adds task to database
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

// gets tasks from database
function getAllTasks(){
    $.ajax({
        method: 'GET',
        url: '/todo',
        success: function (response) {
            console.log('GET response', response);
            $('#viewTasks').empty();
            for (var i = 0; i < response.length; i++) {
                var task = response[i];
                var $newTask = $('<tr><td>' + task.task + '</td><td>' + task.completed + '</td></tr>');
                
                var $completeButton = $('<tr><td><button class = "completeButton">Mark as Completed</button></td></tr>');
                $completeButton.data('id', task.id);
                $newTask.prepend($completeButton);

                var $deleteTaskButton = $('<tr><td><button class="deleteButton">X</button></td></tr>');
                $deleteTaskButton.data('id', task.id);
                $newTask.append($deleteTaskButton);
                $('#viewTasks').append($newTask);

                if (task.completed == "Yes!"){
                    $($completeButton).toggleClass('markComplete');
                }
            }
        }
    })
}

// changes DOM and database to completed
function markTaskAsComplete(){
    var taskToComplete = $(this).parent().parent().data().id;
    var taskCompleted = 'Yes!';
    var taskToMove = $(this).data().task;

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
}

// removes tasks from DOM and database
// confirms before deleting
function deleteTask(){
    var taskToDelete = $(this).parent().parent().data().id;
    
    if (confirm("Are you sure you want to delete this task?") == true) {
        $.ajax({
            method: 'DELETE',
            url: '/todo/' + taskToDelete,
            success: function (response){
                getAllTasks();
            }
        })
    }
}