$(window).on('load', function () {
    document.getElementById("my-form").reset(); 
});

$(document).ready(function () {
    $('#confirm').click(function () {
        var form1 = $("#my-form input[name='optradio1']:radio");
        var form2 = $("#my-form input[name='optradio2']:radio");
        var email = $("#email").val();
        var invocador = $("#invocador").val();
        var region = $("#sel1").val();
        if(form1.is(':checked') && form2.is(':checked') && email!= "" && region!= "default" && invocador!=""){
            $("#volver").attr("disabled", false);
            $("#message .modal-body").text('Has completado la encuesta con exito.¡Gracias!');
            $("#message").modal({backdrop: 'static', keyboard: false});
        }else{
            $("#message .modal-body").text('Rellene todos los campos obligatorios.');
            $("#message").modal({backdrop: 'static', keyboard: false});
        }
    });
});