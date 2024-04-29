import { Component } from "react";
import { Button, Card, Placeholder } from "react-bootstrap";

class MovieCard extends Component {
  state = {
    movieObj: null,
    isLoading: true // usiamo lo stato di caricamento anche per determinare la renderizzazione condizionale del nostro elemento
  };

  fetchMovieData = async () => {
    console.log("FETCH");
    try {
      const resp = await fetch("http://www.omdbapi.com/?apikey=43a932c8&s=" + this.props.movieTitle);
      if (resp.ok) {
        const movieObj = await resp.json();

        console.log("setState");
        this.setState({ movieObj: movieObj.Search[0] });
      } else {
        throw new Error("Errore nel reperimento del dato del film");
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    // intercetta qualsiasi aggiornamento del componente (fase di UPDATE)
    // quindi ad ogni cambio di state o props ricevute

    // prevProps e prevState sono i due parametri propri di componentDidUpdate
    // sono ciò che lo differenzia da un comune render()

    // nel nostro caso vogliamo che this.fetchMovieData() venga invocato quando viene scelto un nuovo titolo in App.jsx
    // quindi quando il nostro componente MovieCard riceve nuove props corrispondenti a this.state.movieTitle di App

    console.log("componentDidUpdate()");
    console.log("PREV PROPS", prevProps.movieTitle);
    console.log("THIS PROPS", this.props.movieTitle);
    // quello che non vogliamo succeda è di invocare this.fetchMovies() più di una volta

    // creare una condizione di guardia è OBBLIGATORIO quando si usa componentDidUpdate
    // la condizione è necessaria ad evitare loop infiniti di aggiornamento causati dal setState che fa aggiornare il componente ugualmente.
    if (prevProps.movieTitle !== this.props.movieTitle) {
      console.log("movieTitle DID UPDATE, new fetch!");
      this.fetchMovieData(); // fetchMoviesData avverrà SOLO quando viene cambiato il titolo dalla select, che ci porta ad avere una nuova prop movieTitle
    } else {
      // se siamo qui è probabilmente per via di un setState avviato dentro this.fetchMoviesData che scatena un nuovo update,
      // ma rispetto a prima le props non saranno diverse questa volta e quindi abbiamo lo STOP.
      console.log("no new props! STOP");
    }
  }

  componentDidMount() {
    console.log("componentDidMount()");
    this.fetchMovieData();
  }

  render() {
    // this.fetchMovies() // non posso chiamare fetchMovies dentro render === LOOP INFINITO
    console.log("render()");
    return (
      <>
        {/* con lo stato di caricamento si determina la visualizzazione dell'elemento segnaposto, durante l'attesa,
       o la card vera e propria */}
        {this.state.isLoading ? (
          <Card>
            <Placeholder animation="glow">
              <Placeholder style={{ height: "450px", width: "100%" }} />
            </Placeholder>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
          </Card>
        ) : (
          <Card>
            {/*
             Il punto di domanda è una precauzione nel caso in cui il caricamento non ci fosse più
             ma avessimo un errore che impedisce l'arrivo del dato in movieObj.
             
             Per evitare errori usiamo l'"optional chaining operator" che permette di verificare 
            l'esistenza di movieObj prima di tentare l'accesso a proprietà dentro di esso */}
            <Card.Img variant="top" src={this.state.movieObj?.Poster} />
            <Card.Body>
              <Card.Title>{this.state.movieObj?.Title}</Card.Title>
              <Card.Text>
                {this.state.movieObj?.Year} — {this.state.movieObj?.Type}
              </Card.Text>
              <Button variant="primary"> {this.state.movieObj?.imdbID}</Button>
            </Card.Body>
          </Card>
        )}
      </>
    );
  }
}

export default MovieCard;
