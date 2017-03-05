var Votar = React.createClass({

    getInitialState: function() {
        return {
            result: "",
            userId: document.getElementById("userId").innerHTML,
            diskId: "",
            puntuaciones: "",
            puntuacion: "",
            button: "Votar",
            punId: ""
        };
    },

    obtenerValores: function()
    {
        $.ajax({
            url: this.props.url1,
            dataType: 'json',
            success: function (data) {
                this.setState({ result: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        $.ajax({
            url: this.props.url2,
            dataType: 'json',
            success: function (data) {
                this.setState({ puntuaciones: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function() {
        this.obtenerValores();
    },

    onChangeDisk: function(event)
    {
        var valor = "";
        if (event.target.value.trim() != "")
        {
            var opciones = document.getElementById("listaDiscos").children;
            var contador = 0;
            var encontrado = false;
            while (!encontrado && contador < opciones.length) {
                if (opciones[contador].getAttribute("value") == event.target.value.trim()) {
                    this.setState({ diskId: opciones[contador].getAttribute("data-idDisk") });
                    valor = opciones[contador].getAttribute("data-idDisk");
                    encontrado = true;
                }
                else {
                    contador++;
                }
            }
            this.checkPuntuacion(valor);
        }
        else
        {
            this.setState({ diskId: "" });
        }
        this.validarDisco(event.target.value.trim());
    },

    onChangePun: function(event)
    {
        this.setState({ puntuacion: event.target.value.trim() });
        this.validarPuntuacion(event.target.value.trim());
    },

    checkPuntuacion: function(diskId)
    {
        if (this.state.puntuaciones != '')
        {
            var contador = 0;
            var encontrado = false;
            while (!encontrado && contador < this.state.puntuaciones.length)
            {
                if ((this.state.puntuaciones[contador].Idcliente == this.state.userId) && (this.state.puntuaciones[contador].iddisco == diskId))
                {
                    this.setState({ puntuacion: this.state.puntuaciones[contador].Puntuacion1, button: "Modificar Voto", punId: this.state.puntuaciones[contador].Id });
                    encontrado = true;
                }
                else
                {
                    contador++;
                }
            }
            if (!encontrado)
            {
                this.setState({ puntuacion: "", button: "Votar", punId: ""});
            }
        }
    },

    votado: function(id)
    {
        this.setState({ button: "Modificar", punId: id });
    },


    validarPuntuacion: function(puntuacion)
    {
        $("#errorPuntuacion").text("");
        var correcto = false;

        if(puntuacion == "")
        {
            $("#errorPuntuacion").text("Introduzca una puntuación");
        }
        else
        {
            if (isNaN(puntuacion))
            {
                $("#errorPuntuacion").text("Introduzca una puntuación numérica");
            }
            else
            {
                if (puntuacion < 0 || puntuacion > 10)
                {
                    $("#errorPuntuacion").text("Introduzca una puntuación entre 0 y 10");
                }
                else {
                    puntuacion = "" + puntuacion;
                    if (puntuacion.indexOf(".") != -1 || puntuacion.indexOf(",") != -1)
                    {
                        $("#errorPuntuacion").text("La puntuación tiene que ser un número entero");
                    }
                    else
                    {
                        correcto = true;
                    }
                }
            }
        }
        return correcto;
    },

    validarDisco(disco)
    {
        $("#errorDisco").text("");
        $("#errorPuntuacion").text("");
        var correcto = false;

        if(disco == "")
        {
            $("#errorDisco").text("Seleccione un Disco");
        }
        else
        {
            var contador = 0;
            var encontrado = false;
            while (!encontrado && contador < this.state.result.length)
            {
                if (this.state.result[contador].Titulo == disco)
                {
                    encontrado = true;
                    correcto = true;
                }
                else
                {
                    contador++;
                }
            }
            if (!correcto)
            {
                $("#errorDisco").text("No existe un disco con ese nombre en nuestra lista");
            }
        }
        return correcto;
    },

    verificarDatos: function()
    {
        var valido = false;
        var disco = $("#discoSeleccionado").val().trim();
        var puntuacion = $("#valPuntuacion").val().trim();
        
        if (this.validarDisco(disco) & this.validarPuntuacion(puntuacion))
        {
            valido = true;
        }
        return valido;
    },

    votar: function(event)
    {
        event.preventDefault();
        if (this.verificarDatos())
        {
            var that = this;
            if (this.state.button == "Votar") {
                var datos = {
                    "Idcliente": this.state.userId,
                    "iddisco": this.state.diskId,
                    "Puntuacion1": this.state.puntuacion
                };
                $.ajax({
                    url: this.props.url2,
                    dataType: 'json',
                    type: 'POST',
                    data: datos,
                    success: function (data) {
                        toastr["success"]("Voto Registrado");
                        that.obtenerValores();
                        that.votado(data.Id);
                    }.bind(this),
                    error: function (xhr, status, err) {
                        toastr["error"]("Los datos proporcionados no son correctos");
                    }.bind(this)
                });
            }
            else {
                var datos = {
                    "Id": this.state.punId,
                    "Idcliente": this.state.userId,
                    "iddisco": this.state.diskId,
                    "Puntuacion1": this.state.puntuacion
                };
                $.ajax({
                    url: this.props.url2 + "/" + this.state.punId,
                    dataType: 'json',
                    type: 'PUT',
                    data: datos,
                    success: function (data) {
                        toastr["success"]("Modificación del voto realizada");
                        that.obtenerValores();
                    }.bind(this),
                    error: function (xhr, status, err) {
                        toastr["error"]("Los datos proporcionados no son correctos");
                    }.bind(this)
                });
            }
        }
    },

    render: function ()
    {
        var disksNames = [];
        for (var i = 0; i < this.state.result.length; i++)
        {
            disksNames.push(
                <option key={i} data-idDisk={this.state.result[i].IdDisco} value={this.state.result[i].Titulo}/>
                );
        }
        return (
        <div>
            <form>
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="discoSeleccionado">Disco: </label>
                        <input type="text" name="disco" id="discoSeleccionado" list="listaDiscos" onChange={this.onChangeDisk} />
                        <span id="errorDisco" className="alert-danger"></span>
                        <datalist id="listaDiscos">
                            {disksNames}
                        </datalist>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="valPuntuaciones">Valoración: </label>
                        <input type="text" id="valPuntuacion" name="puntuacion" value={this.state.puntuacion} onChange={this.onChangePun} />
                        <span id="errorPuntuacion" className="alert-danger"></span>
                    </div>

                <div className="col-md-4"></div>
                </div>
                <div className="row">
                    <div className="col-md-1">
                        <button className="btn btn-primary btn-lg" onClick={this.votar}>{this.state.button}</button>
                    </div>
                </div>
            </form>
        </div>
        );
    }
});
ReactDOM.render(
  <Votar url1="/api/Vdisco" url2="/api/Puntuaciones"/>,
  document.getElementById('content')
);