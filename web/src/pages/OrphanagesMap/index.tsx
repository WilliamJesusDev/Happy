import React, { useEffect, useState } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

import mapMarker from "../../assets/map-marker.svg";

import { MapIcon } from "../components/utils/MapIcon";

import api from "../../services/api";

import "./styles.css";

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    api.get("/orphanages").then((response) => setOrphanages(response.data));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      );
    }
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarker} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita {":)"}</p>
        </header>

        <footer>
          <strong>São Paulo</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[position.latitude, position.longitude]}
        zoom={16}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={`${process.env.REACT_APP_MAPBOX_MAP}&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={MapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={300}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
