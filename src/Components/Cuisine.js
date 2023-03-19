export default function MealType(props){
    const styles = {
        background: props.chosen && "#a7e5b5" ,
        border: props.chosen && "5px solid #a7e5b5"
        
    }
    return(
        <div className="Meal_Component">
            <img onClick={props.choose} style={styles} className="Meal_Component_Img" src={require(`${props.url}`)} alt={props.name} />
            <p className="Meal_Component_Text">{props.name}</p>
        </div>
    )
}