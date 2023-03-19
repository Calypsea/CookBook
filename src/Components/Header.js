import './Header.css';

export default function Header(){
    return(
        <header>
            <img className="header_logo"src={require('./images/Logo.png')} alt="logo" />
            <h2>CookBook</h2>
        </header>
    )
}