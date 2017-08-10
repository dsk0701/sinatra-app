
$('#file-selection').on('change', function() {
    var input = $(this),
    numFiles = input.get(0).files ? input.get(0).files.length : 1,
    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    $('#input-text-file').val(label)
});

var dropArea = $('#drag-drop-area')
dropArea.on('drop',function(evt) {
    evt.preventDefault();
    dropArea.removeClass('drag-drop-outside-over')

    var files = evt.originalEvent.dataTransfer.files; // FileList
    $('#input-text-file').val(files[0].name);
    $('#file-selection').get(0).files = files;  // input type=file にセット
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

$('#form-upload').on('submit',function(evt) {
    console.log("form-upload::submit()");
    evt.preventDefault();

    var files = $(':file').get(0).files;  // FileList
    upload(files[0])
});

function upload(file) {
    var fd = new FormData();
    fd.append("file", file);

    $.ajax({
        url: 'http://localhost:4567/upload',
        type:'POST',
        dataType: 'json',
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
};

