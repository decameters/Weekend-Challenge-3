console.log('JS loaded');

$(document).ready(onReady);

function onReady(){
    console.log('JQ loaded');
    $('#addTaskButton').on('click', addTask);
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
                var $newTask = $('<li>' + response[i].task + ' // '+ response[i].completed + ' // ' + '</li>');
                var $deleteTaskButton = $('<li><button class="deleteButton>Delete Task</button></li>');
                $deleteTaskButton.data('id', task.id);
                $newTask.append($deleteTaskButton);
                $('#viewTasks').append($newTask);
                }
            
        }
    })
}

function deleteTask(){
    
}

/* this all needs to be a table... not sure about the taskAddInput
since on this its already on the database... */

// function appendTasksToDOM(task){
    // var $newTaskListItem = $('<tr></tr>');

    // var $taskAddInput = $('#taskAddIn').val();
    // // $taskAddInput.val()
    // $newTaskListItem.append($taskAddInput);
// }