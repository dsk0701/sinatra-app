
$(document).on('change', ':file', function() {
    var input = $(this),
    numFiles = input.get(0).files ? input.get(0).files.length : 1,
    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    $('#input-text-file').val(label)
});

var dropArea = $('#drag-drop-area')
dropArea.on('drop',function(evt) {
    evt.preventDefault();
    dropArea.removeClass('drag-drop-outside-over')

    var file = evt.originalEvent.dataTransfer.files[0];
    $('#input-text-file').val(file.name);
});

dropArea.on('dragover',function(evt) {
    evt.preventDefault();
    dropArea.addClass('drag-drop-outside-over');
});

dropArea.on('dragenter',function(evt) {
    evt.preventDefault();
    console.log("dragenter");
});

dropArea.on('dragleave',function(evt) {
    evt.preventDefault();
    dropArea.removeClass('drag-drop-outside-over');
    console.log("dragleave");
});

$('#button-upload').on('click',function(evt) {
    console.log("button-upload::click()");
});

$('#form-upload').on('submit',function(evt) {
    console.log("form-upload::submit()");
    evt.preventDefault();

    var file = $(':file');
    var files = file.get(0).files;

    var fd = new FormData();
    fd.append("file", files[0]);
    fd.append("dir", file.val());

    $.ajax({
        url: 'http://localhost:4567/upload',
        type:'POST',
        dataType: 'text',
        data : fd,
        processData : false,
        contentType : false,
        success: function(data) {
            // TODO: 成功表示する
            console.log("upload success");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // TODO: エラー表示する
            console.log("upload failed");
            alert("ng");
        }
    });
});

