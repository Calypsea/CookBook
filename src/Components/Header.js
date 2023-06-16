import "./Header.css";

export default function Header() {
  return (
    <header>
      <img
        className="header_logo"
        src={require("./images/Logo.png")}
        alt="logo"
      />
      <a href="/CookBook">CookBook</a>
    </header>
  );
}
