export default function Ingredients(props) {
  return (
    <div className="questionaire_ingredients">
      <form>
        <label htmlFor="first">Enter one or more ingredients!</label>
        <input
          type="text"
          name="first"
          placeholder="Cheese"
          className="ingredient_input"
          onChange={props.onChange}
        ></input>
        <input
          type="text"
          name="second"
          placeholder="Apple"
          className="ingredient_input"
          onChange={props.onChange}
        ></input>
        <input
          type="text"
          name="third"
          placeholder="Chicken"
          className="ingredient_input"
          onChange={props.onChange}
        ></input>
      </form>
    </div>
  );
}
