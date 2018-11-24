$(window).on('load', function () {
    $('img').on('click', function () {
        var src = $(this).attr('src');
        $("#imagen").attr('src', src);
        $("#agrandar").modal();
    });
    setTimeout(function () {
        $("#encuesta").modal({ backdrop: 'static', keyboard: false });
    },4000);
});

$(document).ready(function () {
    $('#checking').click(function () {
        console.log($('#customRange').val())
        if($('#customRange').val()>=50){
            $("#message .modal-body").text('¡Dale caña a la música!');
            $("#message").modal({backdrop: 'static', keyboard: false});
            setTimeout(function(){
                $("#my-form").submit();
            }, 2000);
        }else{
            $("#message .modal-body").text('Hay gusto para todos, no te desanimes.');
            $("#message").modal({backdrop: 'static', keyboard: false});
            setTimeout(function(){
                $("#my-form").submit();
            }, 2000);
        }
    });
});

