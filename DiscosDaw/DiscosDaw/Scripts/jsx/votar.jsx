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
        this.validar();
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
    },

    onChangePun: function(event)
    {
        this.setState({ puntuacion: event.target.value.trim() });
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

    votar: function(event)
    {
        event.preventDefault();
        var that = this;

        if (this.state.button == "Votar")
        {
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
        else
        {
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
                <input type="text" name="disco" id="discoSeleccionado" list="listaDiscos" onChange={this.onChangeDisk} />
                <datalist id="listaDiscos">
                    {disksNames}
                </datalist>
                <label htmlFor="valPuntuaciones">Valoración: </label>
                <input type="text" id="valPuntuacion" name="puntuacion" value={this.state.puntuacion} onChange={this.onChangePun} />
                <button onClick={this.votar}>{this.state.button}</button>
            </form>
        </div>
        );
    }
});
ReactDOM.render(
  <Votar url1="/api/Vdisco" url2="/api/Puntuaciones"/>,
  document.getElementById('content')
);