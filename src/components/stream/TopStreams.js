import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { useEffect } from "react";
import StreamCard from "./StreamCard";
import { set_twitch_helix_api_config } from "../../utils";

const TopStreams = () => {
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState("");
  const [gamesMap, setGamesMap] = useState(new Map());

  const setThumbnailSize = (streams, width, height) => {
    streams.forEach((stream) => {
      stream.thumbnail_url = stream.thumbnail_url.replace("{width}", width);
      stream.thumbnail_url = stream.thumbnail_url.replace("{height}", height);
    });
  };

  // sets the lists of game ids for the current streams given
  const getGameIdList = (streams) => {
    let game_ids = new Set();
    streams.forEach((stream) => {
      game_ids.add(stream.game_id);
    });
    return Array.from(game_ids);
  };

  const getGames = async (queryString) => {
    let res = await axios.get(
      `https://api.twitch.tv/helix/games?id=${queryString}`,
      set_twitch_helix_api_config()
    );
    return res;
  };

  // updates to the state a map that associates game id to game name
  const createGameMap = async (streams) => {
    let list = getGameIdList(streams);
    // create queryString
    let queryString = list.join("&id=");
    let res = await getGames(queryString);
    // creates the map and then sets the state
    // adds to current game Map so that it's not overwritten
    let newGameMap = new Map(gamesMap);
    let games = res.data.data;
    games.forEach((game) => {
      newGameMap.set(game.id, game.name);
    });
    //console.log(newGameMap);
    setGamesMap(newGameMap);
  };

  const getLiveStreams = async (nextCursor = "") => {
    let res;
    if (nextCursor === "") {
      res = await axios.get(
        `https://api.twitch.tv/helix/streams?first=30`,
        set_twitch_helix_api_config()
      );
    } else {
      res = await axios.get(
        `https://api.twitch.tv/helix/streams?first=20&after=${nextCursor}`,
        set_twitch_helix_api_config()
      );
    }
    setThumbnailSize(res.data.data, "440", "248");
    createGameMap(res.data.data);
    return res;
  };
  useEffect(() => {
    console.log("topstream!");
    getLiveStreams().then((res) => {
      //console.log(res.data.data);
      setItems(res.data.data);
      setCursor(res.data.pagination.cursor);
    });
  }, []);

  const fetchMoreData = () => {
    // add 20 more records in 1 second
    setTimeout(() => {
      getLiveStreams(cursor).then((res) => {
        setItems(items.concat(res.data.data));
        setCursor(res.data.pagination.cursor);
      });
    }, 1000);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          {items.map((stream, index) => (
            <Grid item key={index}>
              <StreamCard
                stream={stream}
                game_name={gamesMap.get(stream.game_id)}
              />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};

export default TopStreams;
