/* eslint-disable */
import React, {useState, useEffect, useRef} from 'react';
import {Map} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import {PolygonLayer} from '@deck.gl/layers';
import {TripsLayer} from '@deck.gl/geo-layers';

import { invoke } from '@tauri-apps/api';
const timer = require('./timepicker.js');
let timepicker;
let startTime = Date.now();
let lastRAFTimestamp = 0;
let intervalId;
// Source data CSV
const DATA_URL = {
  BUILDINGS:
    '/buildings.json', // eslint-disable-line
  TRIPS: '/trips-v7-timestamps.json' // eslint-disable-line
};

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [-74.05, 40.7, 8000]
});

const lightingEffect = new LightingEffect({ambientLight, pointLight});

const material = {
  ambient: 0.1,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [60, 64, 70]
};

const DEFAULT_THEME = {
  buildingColor: [74, 80, 87],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  material,
  effects: [lightingEffect]
};

const INITIAL_VIEW_STATE = {
  longitude: -74,
  latitude: 40.72,
  zoom: 13,
  pitch: 45,
  bearing: 0
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

const landCover = [
  [
    [-74.0, 40.7],
    [-74.02, 40.7],
    [-74.02, 40.72],
    [-74.0, 40.72]
  ]
];

export default function App({
  buildings = DATA_URL.BUILDINGS,
  trips = DATA_URL.TRIPS,
  trailLength = 180,
  initialViewState = INITIAL_VIEW_STATE,
  mapStyle = MAP_STYLE,
  theme = DEFAULT_THEME,
  loopLength = 1800, // unit corresponds to the timestamp in source data
  animationSpeed = 1
}) {

  const domElementRef = useRef(null);
  // now we can call our Command!
  // Right-click the application background and open the developer tools.
  // You will see "Hello, World!" printed in the console!
  invoke('greet', { name: 'World' })
  // `invoke` returns a Promise
  .then((response) => console.log(response))


  const [time, setTime] = useState(0);
  const [animation] = useState({});
  const lastRAFTimestamp = useRef(0);

  useEffect(() => {

    if (domElementRef.current) {
      // Your code to execute when the DOM element is available
      if(!timepicker) {
        timepicker = timer.Timepicker();
        document.getElementById('timepicker').appendChild(timepicker.getElement());
        timepicker.show();
      }

    }

    const animate = (rAFTimestamp=0) => {
      setTime(t => (t + animationSpeed) % loopLength);
        if (timepicker) {
            var elapsedMilliseconds = rAFTimestamp - lastRAFTimestamp.current;
            timepicker.moveClockDateForward(elapsedMilliseconds);
        }
        lastRAFTimestamp.current = rAFTimestamp;
        animation.id = window.requestAnimationFrame(animate);
    };

    animation.id = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(animation.id);
      clearInterval(intervalId);
    };
  }, [animation, animationSpeed, loopLength, domElementRef.current]);

  const world_time_starting_point = 1678217326000;

  const layers = [
    // This is only needed when using shadow effects
    new PolygonLayer({
      id: 'ground',
      data: landCover,
      getPolygon: f => f,
      stroked: false,
      getFillColor: [0, 0, 0, 0]
    }),
    new TripsLayer({
      id: 'trips',
      data: trips,
      getPath: d => d.path,
      getTimestamps: d => d.timestamps.map(p => p - world_time_starting_point),
      getColor: d => (d.vendor === 0 ? theme.trailColor0 : theme.trailColor1),
      opacity: 0.3,
      widthMinPixels: 2,
      rounded: true,
      trailLength,
      currentTime: time,

      shadowEnabled: false
    }),
    new PolygonLayer({
      id: 'buildings',
      data: buildings,
      extruded: true,
      wireframe: false,
      opacity: 0.5,
      getPolygon: f => f.polygon,
      getElevation: f => f.height,
      getFillColor: theme.buildingColor,
      material: theme.material
    })
  ];

  return (
    <DeckGL
      layers={layers}
      effects={theme.effects}
      initialViewState={initialViewState}
      controller={true}
    >
      <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle} preventStyleDiffing={true} />
      <div ref={domElementRef} id="timepicker"></div>
    </DeckGL>
    
  );
}
