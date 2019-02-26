// komponent App (rodzic komponenta Gif)
var GIPHY_PUB_KEY = "Yoouazi2G1SlnVS2Cirm0RreyDqDmtD2";
var GIPHY_API_URL = "https://api.giphy.com/v1/";

App = React.createClass({
  getInitialState() {
    return {
      loading: false,
      searchingText: "", ////klucz, który odbierany jest od komponentu Search
      gif: {}
    };
  },

  // getGif: function(searchingText, callback) {
  //   // 1.Na wejście metody getGif przyjmujemy dwa parametry: wpisywany tekst (searchingText) i funkcję, która ma się wykonać po pobraniu gifa (callback).
  //   var url =
  //     GIPHY_API_URL +
  //     "gifs/random?api_key=" +
  //     GIPHY_PUB_KEY +
  //     "&tag=" +
  //     searchingText; // 2.Konstruujemy adres URL dla API Giphy (pełną dokumentację znajdziesz pod tym adresem).
  //   var xhr = new XMLHttpRequest(); // 3.Wywołujemy całą sekwencję tworzenia zapytania XHR do serwera i wysyłamy je.
  //   xhr.open("GET", url);
  //   xhr.onload = function() {
  //     if (xhr.status === 200) {
  //       var data = JSON.parse(xhr.responseText).data; // 4.W obiekcie odpowiedzi mamy obiekt z danymi. W tym miejscu rozpakowujemy je sobie do zmiennej data, aby nie pisać za każdym razem response.data.
  //       var gif = {
  //         // 5.Układamy obiekt gif na podstawie tego, co otrzymaliśmy z serwera
  //         url: data.fixed_width_downsampled_url,
  //         sourceUrl: data.url
  //       };
  //       callback(gif); // 6.Przekazujemy obiekt do funkcji callback, którą przekazaliśmy jako drugi parametr metody getGif.
  //     }
  //   };
  //   xhr.send();
  // },

  getGif: function(searchingText) {
    return new Promise((resolve, reject) => {
      //albo var promise = new Promise ??????
      //a na koncu return promise ??
      var url =
        GIPHY_API_URL +
        "/v1/gifs/random?api_key=" +
        GIPHY_PUB_KEY +
        "&tag=" +
        searchingText;
      var xhr = new XMLHttpRequest();

      xhr.open("GET", url);
      xhr.onload = function() {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText).data;
          var gif = {
            url: data.fixed_width_downsampled_url,
            sourceUrl: data.url
          };
          resolve(gif); //zamiast callback(gif). jako drugi parametr metody getGif.
        }
      };
      xhr.send();
    });

    // else return reject ???
    //   return promise;
  },

  //http://www.algosmart.pl/obietnice-powtorka-przed-reactjs-5/
  handleSearch: function(searchingText) {
    this.setState({
      loading: true
    });
    this.getGif(searchingText).then(gif => {
      this.setState({
        loading: false,
        gif: gif,
        searchingText: searchingText
      });
      //   }.bind(this)
    });
  },

  // handleSearch: function(searchingText) {
  //   // 1.Pobierz na wejściu wpisywany tekst
  //   this.setState({
  //     loading: true // 2.Zasygnalizuj, że zaczął się proces ładowania.
  //   });
  //   this.getGif(
  //     searchingText,
  //     function(gif) {
  //       //tu zmiana na then.
  //       // 3.Rozpocznij pobieranie gifa.
  //       this.setState({
  //         // 4.Na zakończenie pobierania:
  //         loading: false, // a.przestań sygnalizować ładowanie,
  //         gif: gif, // b.ustaw nowego gifa z wyniku pobierania,
  //         searchingText: searchingText // c ustaw nowy stan dla wyszukiwanego tekstu.
  //       });
  //     }.bind(this)
  //   );
  // },

  render: function() {
    var styles = {
      margin: "0 auto",
      textAlign: "center",
      width: "90%"
    };

    return (
      <div style={styles}>
        <h1> Wyszukiwarka GIFow! </h1>{" "}
        <p>
          Znajdź gifa na <a href="http://giphy.com"> giphy </a>. Naciśnij enter,
          aby pobrać kolejne gify.
        </p>
        <Search onSearch={this.handleSearch} />
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
});
