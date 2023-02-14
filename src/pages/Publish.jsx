import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import Dropzone from "../components/Dropzone";

const Publish = () => {
  const [file, setFile] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [clotheState, setClotheState] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [exchangeInterest, setExchangeInterest] = useState(false);

  const token = Cookies.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("picture", file);
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("condition", clotheState);
    formData.append("city", place);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);

    try {
      console.log(formData);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(JSON.stringify(response.data));
    } catch (error) {
      console.log(error.data.response);
    }
  };

  return (
    <div className="grey">
      <form className="sell-container" onSubmit={handleSubmit}>
        <h2>Vends ton article</h2>
        <div>
          <input
            type="file"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
          />
        </div>

        {/* <div className="dropzone">
        <Dropzone file={file} setFile={setFile} />
      </div> */}

        <div className="text-selection">
          <div className="text-input">
            <p className="text-p">Titre</p>
            <input
              type="text"
              placeholder="ex: Chemise Sézane verte"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="text-input">
            <p className="text-p">Décris ton article</p>
            <input
              type="text"
              placeholder="ex: porté quelquesfois, taille correctement"
              value={desc}
              onChange={(event) => {
                setDesc(event.target.value);
              }}
            />
          </div>
        </div>

        <div className="text-selection">
          <div className="text-input">
            <p className="text-p">Marque</p>
            <input
              type="text"
              placeholder="ex: Zara"
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
          </div>
          <div className="text-input">
            <p className="text-p">Taille</p>
            <input
              type="text"
              placeholder="ex: L/40/42"
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>
          <div className="text-input">
            <p className="text-p">Couleur</p>
            <input
              type="text"
              placeholder="ex: Fushia"
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
          <div className="text-input">
            <p className="text-p">Etat</p>
            <input
              type="text"
              placeholder="ex: Neuf avec étiquette"
              value={clotheState}
              onChange={(event) => {
                setClotheState(event.target.value);
              }}
            />
          </div>
          <div className="text-input">
            <p className="text-p">Lieu</p>
            <input
              type="text"
              placeholder="ex: Paris"
              value={place}
              onChange={(event) => {
                setPlace(event.target.value);
              }}
            />
          </div>
        </div>

        <div className="text-selection">
          <div id="price-border" className="text-input">
            <p className="text-p">Prix</p>
            <input
              type="text"
              placeholder="0,00 €"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
          <div className="checkbox-exchange">
            <input
              type="checkbox"
              value={exchangeInterest}
              onChange={(event) => {
                setExchangeInterest(!exchangeInterest);
              }}
            />
            <span>Je suis intéressé(e) par les échanges</span>
          </div>
        </div>
        <div className="button-validation">
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </div>
  );
};

export default Publish;
