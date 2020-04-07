import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { useEffect } from "react";
import StreamCard from "./StreamCard";

let twitchClientId;

twitchClientId = process.env.REACT_APP_TWITCH_CLIENT_ID;
const config = {
  headers: {
    "Client-ID": twitchClientId,
    accept: "application/vnd.twitchtv.v5+json"
  }
};

const TopStreams = () => {
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState("");

  const setThumbnailSize = (streams, width, height) => {
    streams.forEach(stream => {
      stream.thumbnail_url = stream.thumbnail_url.replace("{width}", width);
      stream.thumbnail_url = stream.thumbnail_url.replace("{height}", height);
    });
  };

  const getLiveStreams = async (nextCursor = "") => {
    let res;
    if (nextCursor === "") {
      res = await axios.get(
        `https://api.twitch.tv/helix/streams?first=20`,
        config
      );
    } else {
      res = await axios.get(
        `https://api.twitch.tv/helix/streams?first=20&after=${nextCursor}`,
        config
      );
    }
    setThumbnailSize(res.data.data, "440", "248");
    return res;
  };

  useEffect(() => {
    getLiveStreams().then(res => {
      console.log(res.data.data);
      setItems(res.data.data);
      setCursor(res.data.pagination.cursor);
    });
  }, []);

  const fetchMoreData = () => {
    // add 20 more records in 1.5 secs
    setTimeout(() => {
      getLiveStreams(cursor).then(res => {
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
              <StreamCard stream={stream} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};

export default TopStreams;
