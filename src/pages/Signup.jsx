import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
  let navigate = useNavigate();

  //Body
  const [infos, setInfos] = useState();

  const [dataIsReceived, setDataIsReceived] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const [token, setToken] = useState("");

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleNewsletterChange = () => {
    setNewsletter(!newsletter);
  };

  const handleInfos = () => {
    setInfos({
      email: email,
      username: username,
      password: password,
      newsletter: newsletter,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          `https://lereacteur-vinted-api.herokuapp.com/user/signup`,
          infos
        );
        setToken(response.data.token);
        setDataIsReceived(true);
        navigate("/");
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchToken();
  };

  useEffect(() => {
    Cookies.set("token", token, { expires: 7 });
  }, [dataIsReceived, token]);

  return (
    <div className="signup-container">
      <h2>S'inscrire</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className="checkbox-container">
          <div className="newsletter-container">
            <input
              type="checkbox"
              value={newsletter}
              onClick={handleNewsletterChange}
            />
            <p>S'inscrire à notre newsletter</p>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <button className="button-buy" type="submit" onClick={handleInfos}>
          S'inscrire
        </button>
      </form>
      <a href="/login">Pas encore de compte ? Inscris-toi !</a>
    </div>
  );
};
export default Signup;
