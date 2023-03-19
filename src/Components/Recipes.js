
export default function Recipes(props){
    return(
        <div className="recipe">
            <img src={props.url} alt={props.name} className="recipe_img"/>
            <h2 className="recipe_title">{props.name}</h2>
            {/* <div dangerouslySetInnerHTML={{ __html: props.description }} className="recipe_instructions" /> */}
            {/* //grab ingredients somehow from the damn api and display those with ^^ */}
            <button className="main_button recipe_button">Show recipe</button>
        </div>
    )
}