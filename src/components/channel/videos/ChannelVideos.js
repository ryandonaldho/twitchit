import React, { useState, useEffect } from "react";
import { set_twitch_helix_api_config } from "../../../utils";
import axios from "axios";
import { connect } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import VideoCard from "./VideoCard";
import VideoPlayer from "./VideosPlayer";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  videoRow: {
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
});

const ChannelVideos = ({ channelId }) => {
  const classes = useStyles();
  const [recentVods, setRecentVods] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [popularVideos, setPopularVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]);

  let [videoPlayer, openVideoPlayer] = useState(false);
  let [videoId, setVideoId] = useState("");

  const handleOpenVideo = (videoId) => {
    setVideoId(videoId);
    openVideoPlayer(true);
  };

  const getRecentVods = async (userId) => {
    const res = await axios.get(
      `https://api.twitch.tv/helix/videos?user_id=${userId}&type=archive&first=20&period=week`,
      set_twitch_helix_api_config()
    );
    //console.log(res);
    setThumbnailSize(res.data.data, "308", "198");
    return res.data.data;
  };

  const getHighlights = async (userId) => {
    const res = await axios.get(
      `https://api.twitch.tv/helix/videos?user_id=${userId}&type=highlight&first=20`,
      set_twitch_helix_api_config()
    );
    //console.log(res);
    setThumbnailSize(res.data.data, "308", "198");
    return res.data.data;
  };

  const getPopularVideos = async (userId) => {
    const res = await axios.get(
      `https://api.twitch.tv/helix/videos?user_id=${userId}&sort=trending&first=20`,
      set_twitch_helix_api_config()
    );
    //console.log(res);
    setThumbnailSize(res.data.data, "308", "198");
    return res.data.data;
  };

  const getAllVideos = async (userId) => {
    const res = await axios.get(
      `https://api.twitch.tv/helix/videos?user_id=${userId}&type=archive&first=100`,
      set_twitch_helix_api_config()
    );
    //console.log(res);
    setThumbnailSize(res.data.data, "308", "198");
    return res.data.data;
  };

  const setThumbnailSize = (videos, width, height) => {
    videos.forEach((video) => {
      video.thumbnail_url = video.thumbnail_url.replace("%{width}", width);
      video.thumbnail_url = video.thumbnail_url.replace("%{height}", height);
    });
  };

  useEffect(() => {
    getRecentVods(channelId).then((recentVods) => {
      //console.log(recentVods);
      setRecentVods(recentVods);
    });
    getHighlights(channelId).then((highlights) => {
      setHighlights(highlights);
    });
    getPopularVideos(channelId).then((popularVideos) => {
      setPopularVideos(popularVideos);
    });
    getAllVideos(channelId).then((allVideos) => {
      setAllVideos(allVideos);
    });
  }, [channelId]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
  };

  return (
    <div>
      {videoPlayer && <VideoPlayer videoId={videoId} />}
      <Typography variant="h4">Videos</Typography>
      <div className={classes.videoRow}>
        <Typography variant="h6"> Recent Broadcast</Typography>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={false}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="image-item"
        >
          {recentVods.map((vod) => (
            <VideoCard
              key={vod.id}
              video={vod}
              handleOpenVideo={handleOpenVideo}
            />
          ))}
        </Carousel>
      </div>
      <div className={classes.videoRow}>
        <Typography variant="h6"> Highlights</Typography>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={false}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="image-item"
        >
          {highlights.map((highlight) => (
            <VideoCard
              key={highlight.id}
              video={highlight}
              handleOpenVideo={handleOpenVideo}
            />
          ))}
        </Carousel>
      </div>
      <div className={classes.videoRow}>
        <Typography variant="h6"> Popular Clips </Typography>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={false}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="image-item"
        >
          {popularVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              handleOpenVideo={handleOpenVideo}
            />
          ))}
        </Carousel>
      </div>
      <div className={classes.videoRow}>
        <Typography variant="h6"> All Videos</Typography>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={false}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="image-item"
        >
          {allVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              handleOpenVideo={handleOpenVideo}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  channelId: state.channel.currentChannelInfo.id,
});
export default connect(mapStateToProps, null)(ChannelVideos);
