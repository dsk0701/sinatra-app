
$(document).on('change', ':file', function() {
    var input = $(this),
    numFiles = input.get(0).files ? input.get(0).files.length : 1,
    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    $('#input-text-file').val(label)
});

var dropArea = $('#drag-drop-area')
dropArea.on('drop',function(evt){
    evt.preventDefault();
    dropArea.removeClass('drag-drop-outside-over')

    var file = evt.originalEvent.dataTransfer.files[0]
    $('#input-text-file').val(file.name)
});

dropArea.on('dragover',function(evt){
    evt.preventDefault();
    dropArea.addClass('drag-drop-outside-over')
});

dropArea.on('dragenter',function(evt){
    evt.preventDefault();
    console.log("dragenter");
});

dropArea.on('dragleave',function(evt){
    evt.preventDefault();
    dropArea.removeClass('drag-drop-outside-over')
    console.log("dragleave");
});

