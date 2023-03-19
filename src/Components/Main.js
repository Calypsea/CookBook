
import './Main.css';

export default function Main(props){

    const styles = {
        display: !props.display && "none"
    }
    
    return(
        <main style={styles}>
            <div className="main_content">
                <div className="main_title">
                    <ul className="main_list">
                        <li>Unsure of what to eat today?</li>
                        <li>Don’t know how to use up remaining products?</li>
                        <li className="bold">You’re in luck!</li>
                    </ul>
                    <button className="main_button" onClick={props.startFunc}>Get Started!</button>
                    
                </div>
                
                    <img className="main_image"src={require('./images/food-table.jpg')} alt="food"/>
                
            </div>
        </main>
    )
}