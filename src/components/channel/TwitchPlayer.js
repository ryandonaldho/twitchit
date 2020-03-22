import React, { Component } from "react";
const EMBED_URL = "https://embed.twitch.tv/embed/v1.js";

// https://stackoverflow.com/questions/48724108/using-twitch-embedded-video-with-reactjs
class TwitchPlayer extends Component {
  loadTwitchPlayer() {
    const script = document.createElement("script");
    script.setAttribute("src", EMBED_URL);
    script.addEventListener("load", () => {
      let embed = new window.Twitch.Embed(this.props.channel, {
        ...this.props
      });
    });
    document.body.appendChild(script);
  }

  componentDidMount() {
    this.loadTwitchPlayer();
  }
  render() {
    console.log("twitchplayerRender" + this.props.channel);
    return <div id={this.props.channel} />;
  }
}

TwitchPlayer.defaultProps = {
  width: "940",
  height: "480"
};

export default TwitchPlayer;
