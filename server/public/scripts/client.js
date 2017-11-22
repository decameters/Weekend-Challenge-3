console.log('JS loaded');

$(document).ready(onReady);

function onReady(){
    console.log('JQ loaded');
    $('#addTaskButton').on('click', addTask);
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
            // run next function here
        }
    })
}

function getAllTasks(){

}