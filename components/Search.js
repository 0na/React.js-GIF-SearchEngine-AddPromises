Search = React.createClass({
  getInitialState() {
    return {
      searchingText: ""
    };
  },

  handleChange: function(event) {
    var searchingText = event.target.value;
    this.setState({ searchingText: searchingText });

    if (searchingText.length > 2) {
      this.props.onSearch(searchingText);
    }
  },

  handleKeyUp: function(event) {
    //metodę, która będzie rozpoznawała, że wciśnięty klawisz to Enter i również wyśle wiadomość do rodzica, aby ten jeszcze raz uruchomił funkcję wysyłającą zapytanie po gifa:
    if (event.keyCode === 13) {
      // Kod klawisza Enter to 13
      this.props.onSearch(this.state.searchingText); //Jeśli wciśniemy więc Enter, to wywołana zostanie funkcja
    }
  },

  render: function() {
    var styles = { fontSize: "1.5em", width: "90%", maxWidth: "350px" };

    return (
      <input
        type='text'
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp} //nasłuchiwanie na wciśnięcie, a właściwie na "odciśnięcie" klawisza Enter (onKeyUp):
        placeholder='Tutaj wpisz wyszukiwaną frazę'
        style={styles}
        value={this.state.searchTerm}
      />
    );
  }
});
