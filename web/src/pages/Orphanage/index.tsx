import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import Sidebar from "../components/Sidebar";

import { MapIcon } from "../components/utils/MapIcon";

import api from "../../services/api";

import "./styles.css";
import { useParams } from "react-router-dom";

interface Orphanage {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api
      .get(`/orphanages/${params.id}`)
      .then((response) => setOrphanage(response.data));
  }, [params.id]);

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img
            src={orphanage?.images[activeImageIndex].url}
            alt={`${orphanage?.name}-ImagePrincipal`}
          />

          <div className="images">
            {orphanage?.images.map((image, index) => {
              return (
                <button
                  className={activeImageIndex === index ? "active" : ""}
                  type="button"
                  key={image.id}
                >
                  <img
                    src={image.url}
                    alt={`${orphanage?.name}-Image0${image.id}`}
                    onClick={() => {
                      setActiveImageIndex(index);
                    }}
                  />
                </button>
              );
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage?.name}</h1>
            <p>{orphanage?.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage?.latitude || 0, orphanage?.longitude || 0]}
                zoom={16}
                style={{ width: "100%", height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`${process.env.REACT_APP_MAPBOX_MAP}&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={MapIcon}
                  position={[
                    orphanage?.latitude || 0,
                    orphanage?.longitude || 0,
                  ]}
                />
              </Map>

              <footer>
                <a
                  href={`https://google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para Visita</h2>
            <p>{orphanage?.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage?.opening_hours}
              </div>
              {orphanage?.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF6690" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}
