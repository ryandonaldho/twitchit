import React, { useState, useEffect } from "react";
import { twitch_helix_api_config } from "../../utils";
import axios from "axios";
import { connect } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import VideoCard from "./VideoCard";

const ChannelVideos = ({ channelId }) => {
  const [recentVods, setRecentVods] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [popularVideos, setPopularVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]);

  const getRecentVods = async (userId) => {
    const res = await axios.get(
      `https://api.twitch.tv/helix/videos?user_id=${userId}&type=archive&first=20&period=week`,
      twitch_helix_api_config
    );
    //console.log(res);
    setThumbnailSize(res.data.data, "308", "198");
    return res.data.data;
  };

  const getHighlights = async (userId) => {
    const res = await axios.get(
      `https://api.twitch.tv/helix/videos?user_id=${userId}&type=highlight&first=20`,
      twitch_helix_api_config
    );
    //console.log(res);
    setThumbnailSize(res.data.data, "308", "198");
    return res.data.data;
  };

  const getPopularVideos = async (userId) => {
    const res = await axios.get(
      `https://api.twitch.tv/helix/videos?user_id=${userId}&sort=trending&first=20`,
      twitch_helix_api_config
    );
    //console.log(res);
    setThumbnailSize(res.data.data, "308", "198");
    return res.data.data;
  };

  const getAllVideos = async (userId) => {
    const res = await axios.get(
      `https://api.twitch.tv/helix/videos?user_id=${userId}&type=archive&first=20`,
      twitch_helix_api_config
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
      console.log(recentVods);
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
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
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
      <h1>Videos</h1>
      <div>
        Recent Broadcast
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
            <VideoCard video={vod} />
          ))}
        </Carousel>
      </div>
      <div>
        Recent Highlights
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
            <VideoCard video={highlight} />
          ))}
        </Carousel>
      </div>
      <div>
        Popular Clips
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
            <VideoCard video={video} />
          ))}
        </Carousel>
      </div>
      <div>
        All videos
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
            <VideoCard video={video} />
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
