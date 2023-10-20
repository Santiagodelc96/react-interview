import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";
import Button from "@mui/material/Button";

function App() {
  const [events, setEvents] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiPackage = import.meta.env.VITE_PACKAGE;
  const apiResource = import.meta.env.VITE_RESOURCE;

  const handleEvent = () => {
    axios
      .get(
        `${apiBaseUrl}/${apiPackage}/v2/${apiResource}.json?apikey=${apiKey}`
      )
      .then((response) => {
        console.log(response);
        setEvents(response.data._embedded.events);
      });
  };

  return (
    <>
      <h1>Events</h1>
      <Button onClick={handleEvent}>Show available events</Button>
      <ul>
        {events.map((event) => {
          return (
            <li key={event.id}>
              <a href={event.url}>{event.name}</a>
              <img
                src={event.images[0].url}
                width={event.images[0].width}
                heigth={event.images[0].height}
              ></img>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
