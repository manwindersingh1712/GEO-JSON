import React, { useEffect, useState, useMemo, useCallback } from "react";
import Map, { Source, Layer } from "react-map-gl";
import Console from "./components/console";
import Modal from "./components/modal";
import Navbar from "./components/navbar";

const App = () => {
  const [lng] = useState(77.57425723529988);
  const [lat] = useState(13.014748000724378);
  const [viewport] = useState({
    latitude: lat,
    longitude: lng,
    zoom: 10,
    bearing: 0,
  });
  const [mapCoordinates, setmapCoordinates] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(true);

  //user data
  const [userData, setUserData] = useState(null);
  const [userInSpecificArea, setUserInSpecificArea] = useState(null);

  const [areaId, setAreaId] = useState(null);

  const users = useMemo(() => {
    return userData;
  }, [userData]);

  const data = useMemo(() => {
    return mapCoordinates;
  }, [mapCoordinates]);

  const layerStyle = {
    id: "data",
    type: "fill",
    paint: {
      "fill-color": {
        // property: 'percentile',
        stops: [
          [0, "#3288bd"],
          [1, "#66c2a5"],
          // [2, '#abdda4'],
          // [3, '#e6f598'],
          // [4, '#ffffbf'],
          // [5, '#fee08b'],
          // [6, '#fdae61'],
          // [7, '#f46d43'],
          // [8, '#d53e4f']
        ],
      },
      "fill-opacity": 0.5,
    },
  };

  const onHover = useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event;

    const hoveredFeature = features && features[0];
    setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
  }, []);

  useEffect(() => {
    fetch("https://kyupid-api.vercel.app/api/areas")
      .then((resp) => resp.json())
      .then((json) => {
        setmapCoordinates(json);
      })
      .catch((err) => console.error("Could not load coordinates", err));

    fetch("https://kyupid-api.vercel.app/api/users")
      .then((resp) => resp.json())
      .then((json) => {
        setUserData(json.users);
        // console.log(json.users);
      })
      .catch((err) => console.error("Could not load user daetails", err));
  }, []);

  useEffect(() => {
    if (!hoverInfo) {
      setUserInSpecificArea(null);
      setAreaId(null);
      return;
    }
    const properties = hoverInfo.feature.properties;
    const area_id_on_map = properties.area_id;

    if (areaId === area_id_on_map) return;

    setAreaId(area_id_on_map);
    if (properties.area_id) {
      setIsConsoleOpen(true);
    }

    const users_in_area = users.filter((d) => {
      return d.area_id === area_id_on_map;
    });

    setUserInSpecificArea(users_in_area);
  }, [hoverInfo]);

  useEffect(() => {
    if (isModalOpen) {
      setIsConsoleOpen(false)
    }
  }, [isModalOpen, isConsoleOpen])

  return (
    <div>
      <Navbar
        isConsoleOpen={isConsoleOpen}
        setIsConsoleOpen={setIsConsoleOpen}
      />
      <Console
        isConsoleOpen={isConsoleOpen}
        setIsConsoleOpen={setIsConsoleOpen}
        user={userInSpecificArea}
        setIsModalOpen={setIsModalOpen}
      />
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
      <Map
        mapboxAccessToken="pk.eyJ1IjoibWFud2luZGVyc2luZ2giLCJhIjoiY2w1MHM4aWVmMDZ6ODNvb2xoaHgxaW56NSJ9.OLpR6_6ziTpsMUomgz_Btw"
        initialViewState={viewport}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        interactiveLayerIds={["data"]}
        onMouseMove={onHover}
      >
        <Source type="geojson" data={data}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </div>
  );
};

export default App;
