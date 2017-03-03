var Votar = React.createClass({

    getInitialState: function() {
        return {
            result: "",
            userId: document.getElementById("userId").innerHTML,
            diskId: "",
            puntuaciones: "",
            puntuacion: ""
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

    onChange: function(event)
    {
        this.setState({ diskId: event.target.value })
        this.checkPuntuacion(event.target.value);
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
                    this.setState({ puntuacion: this.state.puntuaciones[contador].Puntuacion1 });
                    encontrado = true;
                }
                else
                {
                    contador++;
                }
            }
            if (!encontrado)
            {
                this.setState({ puntuacion: "" });
            }
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
            <p>Id disco: {this.state.diskId}</p>
            <select id="listaDiscos" onChange={this.onChange}>
                <option value="" selected disabled>Seleccion un Disco</option>
                {disksNames}
            </select>
            <p id="valPuntuacion">Puntuacion: {this.state.puntuacion}</p>
        </div>
        );
}
});
ReactDOM.render(
  <Votar url1="/api/Vdisco" url2="/api/Puntuaciones"/>,
  document.getElementById('content')
);