$(document).ready(function () {

    kbGen = new KeyboardGenerator();
    kbGen.virtualRandomKeyboard();
    $("#virtualKeyboard").click(kbGen.write);
    $("#clearKey").click(kbGen.clearKey);
});

function KeyboardGenerator() {
    
}

KeyboardGenerator.prototype = {

    virtualRandomKeyboard: function () {
        var numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var botones = $("button");

        for (var i = 1; i < botones.length; i++) {
            var rnd = Math.floor(Math.random() * numeros.length);

            botones[i].value = numeros[rnd];
            botones[i].textContent = numeros[rnd];
            numeros.splice(rnd, 1);
        }
    },

    write: function (event) {
        if (event.target.tagName === "BUTTON" && $("#Password").val().length < 12) {
            var valor = $("#Password").val();
            $("#Password").val(valor + event.target.value);
            $("#passwordUser").val(valor + event.target.value);
        }
    },

    clearKey: function () {
        $("#Password").val("");
        $("#passwordUser").val("");
    }
}