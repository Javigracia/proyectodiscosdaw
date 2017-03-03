var ListaDiscos = React.createClass({

    getInitialState: function() {
        return { result: '' };
    },

    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (data) {
                this.setState({ result: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    render: function () {
        var disks = [];
        for (var i = 0; i < this.state.result.length; i++)
        {
            var agno = this.state.result[i].Agno || "N/A";
            disks.push(
                <tr key={i}>
                    <td>{this.state.result[i].Titulo}</td>
                    <td>{this.state.result[i].Interprete}</td>
                    <td>{agno}</td>
                    <td>{this.state.result[i].mediaPuntuacion}</td>
                </tr>
                );
        }
        return (
        <table className="infoDiscos">
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Intérprete</th>
                    <th>Año</th>
                    <th>Valoración</th>
                </tr>
            </thead>
            <tbody>
                {disks}
            </tbody>
        </table>
        );
}
});
ReactDOM.render(
  <ListaDiscos url="/api/Vdisco"/>,
  document.getElementById('content')
);