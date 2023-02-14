import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  let navigate = useNavigate();

  //body
  const [infos, setInfos] = useState();

  //To wait the response
  const [dataIsReceived, setDataIsReceived] = useState(false);

  //infos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //token
  const [token, setToken] = useState("");

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleInfos = () => {
    setInfos({
      email: email,
      password: password,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          `https://lereacteur-vinted-api.herokuapp.com/user/login`,
          infos
        );
        setToken(response.data.token);
        setDataIsReceived(true);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchToken();
  };

  useEffect(() => {
    Cookies.set("token", token, { expires: 7 });
    if (dataIsReceived) {
      navigate("/publish");
    }
  }, [dataIsReceived, navigate, token]);

  return (
    <div className="signup-container">
      <h2>Se connecter</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="button-buy" type="submit" onClick={handleInfos}>
          Se connecter
        </button>
      </form>
      <a href="/signup">Pas encore de compte ? Inscris-toi !</a>
    </div>
  );
};
export default Login;
