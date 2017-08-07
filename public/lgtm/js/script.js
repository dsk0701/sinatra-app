
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

    var file = evt.originalEvent.dataTransfer.files[0]
    $('#input-text-file').val(file.name)
});

dropArea.on('dragover',function(evt) {
    evt.preventDefault();
    dropArea.addClass('drag-drop-outside-over')
});

dropArea.on('dragenter',function(evt) {
    evt.preventDefault();
    console.log("dragenter");
});

dropArea.on('dragleave',function(evt) {
    evt.preventDefault();
    dropArea.removeClass('drag-drop-outside-over')
    console.log("dragleave");
});

// $('#button-upload').on('click',function(evt) {
//     console.log("button-upload::onclick");
//     // TODO: Call upload api and update screen.
// 
//     evt.preventDefault();
//     $(this.form).submit();
//     $(this.form).find("textarea, :text, select").val("");
//     return false;
// });

$('#form-upload').on('submit',function(evt) {
    console.log("form-upload::submit()");
    evt.preventDefault();

    $.ajax({
        url: 'http://localhost:4567/upload',
        type:'POST',
        // dataType: 'jsonp',
        data : { key : 'value' },
        timeout:10000,
        success: function(data) {
            // TODO: 成功表示する
            console.log("upload success");
            alert("ok");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // TODO: エラー表示する
            console.log("upload failed");
            alert("ng");
        }
    });
});

