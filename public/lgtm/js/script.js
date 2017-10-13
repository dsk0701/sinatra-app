$(document).ready(function() {
    $('.alert-success').hide();
    $('.alert-danger').hide();
});

$('#file-selection').on('change', function() {
    var input = $(this),
    numFiles = input.get(0).files ? input.get(0).files.length : 1,
    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    $('#input-text-file').val(label)
});

var dropArea = $('#drag-drop-area')
dropArea.on('drop',function(evt) {
    evt.preventDefault();
    dropArea.removeClass('drag-drop-outside-over');

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

    $('.alert-success').hide();
    $('.alert-danger').hide();

    var form = $(this);
    var button = form.find('button[type="submit"]');

    var fd = new FormData();
    var files = $(':file').get(0).files;  // FileList
    fd.append("file", files[0]);

    $.ajax({
        url: '/new',
        type:'POST',
        dataType: 'json',
        data : fd,
        processData : false,
        contentType : false,
        beforeSend: function(xhr, settings) {
            // ボタンを無効化し、二重送信を防止
            button.attr('disabled', true);
        },
        complete: function(xhr, textStatus) {
            // ボタンを有効化し、再送信を許可
            button.attr('disabled', false);
        },
        success: function(data) {
            // フォームをクリアする
            form[0].reset();
            $('.alert-success').show();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('.alert-danger').show();
        }
    });
});

$('.carousel-item').on('click', function () {
    document.execCommand('copy');
});

window.addEventListener("copy" , function(e){
    e.preventDefault();

    // DataTransfer オブジェクトを取得する
    var data_transfer = (e.clipboardData) || (window.clipboardData);
    console.log("location.protocol: " + location.protocol);
    console.log("location.host: " + location.host);
    console.log("location.href: " + location.href);
    data_transfer.setData('text', location.protocol + "//"+ location.host + $('.carousel-item.active > img').attr('src'));
    $.toast({
        text: 'Copied!',
        bgColor: '#FF1356',
        showHideTransition: 'fade', // fade, slide or plain
        allowToastClose: false,
        loader: false,
        hideAfter: 2000,
        textAlign: 'center',
        position: 'top-center'
    });
});
