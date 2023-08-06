import { ChangeEvent, FormEvent, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MapContainer, TileLayer } from "react-leaflet";

import Sidebar from "../components/Sidebar";

import { useHistory } from "react-router-dom";
import MapMarker from "../components/MapMarker";
import api from "../services/api";
import "../styles/pages/create-orphanage.css";

export default function CreateOrphanage() {
    const history = useHistory();

    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [instructions, setInstructions] = useState("");
    const [opening_hours, setOpeningHours] = useState("");
    const [open_on_weekends, setOpenOnWeekends] = useState(true);
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return null;
        }

        const selectedImages = images.concat(Array.from(event.target.files));

        setImages(selectedImages);

        const selectedImagesPreview = selectedImages.map((image) => {
            return URL.createObjectURL(image);
        });

        setPreviewImages(selectedImagesPreview);

        console.log(previewImages);
    }

    async function handleSubmint(event: FormEvent) {
        event.preventDefault();

        const { latitude, longitude } = position;

        const data = new FormData();

        data.append("name", name);
        data.append("latitude", latitude.toString());
        data.append("longitude", longitude.toString());
        data.append("about", about);
        data.append("instructions", instructions);
        data.append("opening_hours", opening_hours);
        data.append("open_on_weekends", String(open_on_weekends));

        images.forEach((image) => {
            data.append("images", image);
        });

        await api.post("orphanages", data);

        alert("Cadastro realizado com sucesso!");

        history.push("/app");
    }

    return (
        <div id="page-create-orphanage">
            <Sidebar />

            <main>
                <form
                    onSubmit={handleSubmint}
                    className="create-orphanage-form"
                >
                    <fieldset>
                        <legend>Dados</legend>

                        <MapContainer
                            center={[-15.5948923, -56.0883017]}
                            style={{ width: "100%", height: 280 }}
                            zoom={14}
                        >
                            <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                            <MapMarker
                                position={position}
                                setPosition={setPosition}
                            />
                        </MapContainer>

                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="about">
                                Sobre <span>Máximo de 300 caracteres</span>
                            </label>
                            <textarea
                                id="name"
                                maxLength={300}
                                value={about}
                                onChange={(event) =>
                                    setAbout(event.target.value)
                                }
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="images">Fotos</label>

                            <div className="image-container">
                                {previewImages.map((image, index) => {
                                    return (
                                        <img
                                            key={index}
                                            className="image-preview"
                                            src={image}
                                            alt={image}
                                        />
                                    );
                                })}
                                <label htmlFor="image[]" className="new-image">
                                    <FiPlus size={24} color="#15b6d6" />

                                    <input
                                        onChange={handleSelectImage}
                                        multiple
                                        type="file"
                                        id="image[]"
                                    />
                                </label>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Visitação</legend>

                        <div className="input-block">
                            <label htmlFor="instructions">Instruções</label>
                            <textarea
                                id="instructions"
                                value={instructions}
                                onChange={(event) =>
                                    setInstructions(event.target.value)
                                }
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="opening_hours">
                                Horário de visitação
                            </label>
                            <input
                                id="opening_hours"
                                value={opening_hours}
                                onChange={(event) =>
                                    setOpeningHours(event.target.value)
                                }
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="open_on_weekends">
                                Atende fim de semana
                            </label>

                            <div className="button-select">
                                <button
                                    type="button"
                                    className={open_on_weekends ? "active" : ""}
                                    onClick={() => setOpenOnWeekends(true)}
                                >
                                    Sim
                                </button>
                                <button
                                    type="button"
                                    className={
                                        !open_on_weekends ? "active" : ""
                                    }
                                    onClick={() => setOpenOnWeekends(false)}
                                >
                                    Não
                                </button>
                            </div>
                        </div>
                    </fieldset>

                    <button className="confirm-button" type="submit">
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    );
}
