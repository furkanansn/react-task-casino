import React from "react";
import axios from "axios";
import BASE_URL from "../const.js";
import Input from "../UI/Input/Input";
import classes from "../Login/Login.module.css";

import Card from "../UI/Card/Card";
import {MediaCard} from "@shopify/polaris"
const Home = (props) => {
  const [query, setQuery] = React.useState("");
  const [games, setGames] = React.useState([]);

  const getGames = async (query) => {
    
    axios
      .get(BASE_URL + "api/games?query=" + query, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("User")).jwt,
        },
      })
      .then((res) => {
        setGames(res.data.data);        
      });
  };

  React.useEffect(() => {
    getGames("");
  }, []);

  return (
    <Card className={classes.login}>
        <Input
          label="Search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            getGames(e.target.value);
          }}
          autoComplete="off"
        />

        {games.map((e) => {
          return (
            <MediaCard title={e.title} description={e.providerName}>
              <img
                alt=""
                width="30%"
                height="30%"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={e.thumb.url}
              />
            </MediaCard>
          );
        })}
      </Card>
  );
};

export default Home;
