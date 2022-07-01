import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import Map, { Source, Layer } from "react-map-gl";

const App = () => {
  const [lng, setLng] = useState(77.57425723529988);
  const [lat, setLat] = useState(13.014748000724378);
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lng,
    zoom: 10,
    bearing: 0,
  });
  const [allData, setAllData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);

  const data = useMemo(() => {
    return allData;
  }, [allData]);

  useEffect(() => {
    fetch("https://kyupid-api.vercel.app/api/areas")
      .then((resp) => resp.json())
      .then((json) => {
        setAllData(json);
        console.log(json);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);

  const onHover = useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event;

    const hoveredFeature = features && features[0];

    // prettier-ignore
    setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
    console.log(hoveredFeature && { feature: hoveredFeature, x, y });
  }, []);

  const layerStyle = {
    id: "data",
    type: "fill",
    paint: {
      "fill-color": {
        // property: 'percentile',
        stops: [
          [0, "#3288bd"],
          [1, '#66c2a5'],
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

  return (
    <div>
      <Map
        mapboxAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
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
