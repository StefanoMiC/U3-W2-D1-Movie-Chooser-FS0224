import { Component } from "react";
import { Button, Card, Placeholder } from "react-bootstrap";

class MovieCard extends Component {
  state = {
    movieObj: null,
    isLoading: true
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
    console.log("componentDidUpdate()");
    console.log("PREV PROPS", prevProps.movieTitle);
    console.log("THIS PROPS", this.props.movieTitle);

    if (prevProps.movieTitle !== this.props.movieTitle) {
      console.log("movieTitle DID UPDATE, new fetch!");
      this.fetchMovieData();
    } else {
      console.log("no new props! STOP");
    }
  }

  componentDidMount() {
    console.log("componentDidMount()");
    this.fetchMovieData();
  }

  render() {
    console.log("render()");
    return (
      <>
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
