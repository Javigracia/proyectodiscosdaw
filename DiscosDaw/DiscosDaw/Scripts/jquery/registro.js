$(document).ready(function () {

    $("#datepicker").datepicker();
    clientForm = new clientForm();
    clientForm.validate();
});

function clientForm()
{
    this.sendData;
}

clientForm.prototype = {

    sendRequest: function () {
        var that = this;
        this.sendData = {
            "Nombre": $("form").find("#nick").val().trim(),
            "Email": $("form").find("#email").val().trim(),
            "Password": $("form").find("#Password").val(),
            "FechaNacimiento": $("form").find("#datepicker").val()
        };
        $.ajax({
            url: "/api/Clientes",
            dataType: 'json',
            type: 'POST',
            data: this.sendData,
            success: function (data) {
                toastr["success"]("Cliente Registrado");
            }.bind(this),
            error: function (xhr, status, err) {
                toastr["error"]("Ya existe un usuario con ese Nombre o Correo");
            }.bind(this)
        });
    },

    validate: function (element) {
        var that = this;
        $("form").validate({
            debug: false,
            rules:
            {
                "nick":
                {
                    required: true
                },
                "password":
                {
                    required: true,
                    number: true,
                    minlength: 4,
                    maxlength: 12
                },
                "email":
                {
                    required: true,
                    email: true
                }
            },
            messages:
            {
                "nick":
                {
                    required: "Usuario Requerido"
                },
                "password":
                {
                    required: "Contraseña Requerida",
                    number: "La contraseña tiene que ser numérica",
                    maxlength: "La contraseña no puede tener más de 12 caracteres",
                    minlength: "La contraseña no puede contener menos de 6 caracteres."
                },
                "passwordRepeat":
                {
                    required: "Contraseña Requerida",
                    maxlength: "La contyraseña no puede tener más de 12 caracteres",
                    minlength: "No puede contener menos de 4 caracteres.",
                    equalTo: "Las contraseñas no coinciden"
                },
                "email":
                {
                    required: "Correo Requerido",
                    email: "Introduzca una dirección de e-mail válida"
                }
            },
            submitHandler: function () {
                that.sendRequest();
            }
        });
    }
}