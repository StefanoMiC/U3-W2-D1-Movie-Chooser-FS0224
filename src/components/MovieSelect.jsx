import FormSelect from "react-bootstrap/FormSelect";

const MovieSelect = props => {
  return (
    <FormSelect
      aria-label="Default select example"
      value={props.movieTitle}
      onChange={e => props.changeMovieTitle(e.target.value)}
    >
      <option>Iron Man</option>
      <option>Dr. Strange</option>
      <option>Batman</option>
      <option>Black Panther</option>
      <option>Wonder Woman</option>
      <option>Venom</option>
      <option>Guardians of the Galaxy</option>
    </FormSelect>
  );
};

export default MovieSelect;
