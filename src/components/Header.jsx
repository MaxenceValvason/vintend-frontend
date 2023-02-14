import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = ({ setSearch }) => {
  let navigate = useNavigate();

  const logout = () => {
    Cookies.remove("token");
    navigate("/");
  };
  return (
    <header>
      <div className="header-container">
        <div
          className="img"
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src="https://lereacteur-vinted.netlify.app/static/media/logo.10b0caad793dd0a8ea72.png"
            alt=""
          />
        </div>
        <input
          type="text"
          placeholder="Recherche des articles"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <div className={Cookies.get("token") ? "display-none" : ""}>
          <div className="logs">
            <button
              className="button-login-signup"
              onClick={() => {
                navigate("/signup");
              }}
            >
              S'inscrire
            </button>
            <button
              className="button-login-signup"
              onClick={() => {
                navigate("/login");
              }}
            >
              Se connecter
            </button>
          </div>
        </div>
        <div className={!Cookies.get("token") ? "display-none" : null}>
          <button className="button-logout" onClick={logout}>
            Se déconnecter
          </button>
        </div>
        <button
          className="button-login-signup button-sold"
          onClick={() => {
            if (Cookies.get("token")) {
              navigate("/publish");
            } else {
              navigate("/login");
            }
          }}
        >
          Vends tes articles
        </button>
      </div>
    </header>
  );
};
export default Header;
