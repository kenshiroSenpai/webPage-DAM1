$(window).on('load', function () {
    document.getElementById("my-form").reset();
    $("#check").val("");
    $("#mayorDeEdad .modal-body").text('¿Eres mayor de edad?');
    $("#mayorDeEdad").modal({ backdrop: 'static', keyboard: false });
    //Check if the user have 18 age old or more.
    check.addEventListener('keyup', function (event) {
        if (check.checkValidity()) {
            boton18.disabled = false;
        } else {
            boton18.disabled = true;
        }
    });

});

$(document).ready(function () {
    $('#checking').click(function () {
        var form1 = $("#my-form input[name='wins1']:radio");
        var form2 = $("#my-form input[name='wins2']:radio");
        var form3 = $("#my-form input[name='wins3']:radio");
        var form4 = $("#my-form input[name='wins4']:radio");
        if (form1.is(':checked') && form2.is(':checked') && form3.is(':checked') && form4.is(':checked')) {
            $("#message .modal-body").text('Se ha rellenado correctamente.');
            $("#message").modal({ backdrop: 'static', keyboard: false });
            setTimeout(function () {
                $("#my-form").submit();
            }, 2000);
        } else {
            $("#message .modal-body").text('Rellene todos los campos.');
            $("#message").modal();
        }
    });

});
