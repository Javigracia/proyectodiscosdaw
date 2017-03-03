var Votar = React.createClass({

    getInitialState: function() {
        return {
            result: "",
            userId: document.getElementById("userId").innerHTML,
            diskId: "",
            puntuaciones: "",
            puntuacion: "",
            button: "Votar"
        };
    },

    componentDidMount: function() {
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

    onChangeDisk: function(event)
    {
        this.setState({ diskId: event.target.value });
        this.checkPuntuacion(event.target.value);
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
                    this.setState({ puntuacion: this.state.puntuaciones[contador].Puntuacion1, button: "Modificar Voto" });
                    encontrado = true;
                }
                else
                {
                    contador++;
                }
            }
            if (!encontrado)
            {
                this.setState({ puntuacion: "" , button: "Votar"});
            }
        }
    },

    votar: function(event)
    {
        event.preventDefault();
        var datos = {
            "Idcliente": this.state.userId,
            "iddisco": this.state.diskId,
            "Puntuacion1": this.state.puntuacion
        };

        if (this.state.button == "Votar")
        {
            $.ajax({
                url: this.props.url2,
                dataType: 'json',
                type: 'POST',
                data: datos,
                success: function (data) {
                    toastr["success"]("Voto Registrado");
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    },

    render: function () {
        var disksNames = [];
        for (var i = 0; i < this.state.result.length; i++)
        {
            disksNames.push(
                <option key={i} value={this.state.result[i].IdDisco }>
                        {this.state.result[i].Titulo}
                </option>
                );
        }
        return (
        <div>
            <form>
                <select id="listaDiscos" onChange={this.onChangeDisk}>
                    <option value="" selected disabled>Seleccion un Disco</option>
                    {disksNames}
                </select>
                <label htmlFor="valPuntuaciones">Valoración: </label>
                <input type="text" id="valPuntuacion" value={this.state.puntuacion} onChange={this.onChangePun} />
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