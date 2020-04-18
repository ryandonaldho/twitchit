import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getChannelInfo,
  getChannelFollowing,
  getTotalFollowers,
} from "../../actions/channelActions";
import TwitchPlayer from "./TwitchPlayer";
import TwitchChat from "./TwitchChat";
import ChannelInfo from "./ChannelInfo";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import SplitPane, { Pane } from "react-split-pane";
// TODO Create Split Pane for chat/video like twitch

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: "20px",
  },
  main: {
    width: "100%",
    height: "100%",
  },
  chatDiv: {
    right: "0",
    width: "25%",
    height: "90%",
    position: "fixed",
    bottom: "0",
    overflow: "hidden",
  },
  mainDiv: {
    height: "90vh",
    overflowY: "scroll",
    overflowX: "hidden",
    width: "75%",
  },
  grid: {
    width: "100%",
    margin: "0",
  },
}));

const ChannelProfile = (props) => {
  const classes = useStyles();

  const channel = props.match.params.channelname;

  const [player, openPlayer] = useState(true);
  const [playerBtnText, setplayerBtnText] = useState("Close");

  const togglePlayer = () => {
    openPlayer(!player);
    playerBtnText === "Open"
      ? setplayerBtnText("Close")
      : setplayerBtnText("Open");
  };

  useEffect(() => {
    props.getChannelInfo(channel);
    props.getChannelFollowing(props.channelId);
    props.getTotalFollowers(props.channelId);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [props.channelId]);
  return (
    <div className={classes.main}>
      <div className={classes.chatDiv}>
        <TwitchChat channel={channel} />{" "}
      </div>
      <div className={classes.mainDiv}>
        <Grid
          container
          className={classes.grid}
          spacing={3}
          direction="row"
          justify="center"
          alignItems="center"
        >
          {props.channelInfo && <ChannelInfo />}

          <Grid item xs={12}>
            <button onClick={togglePlayer}>{playerBtnText} Stream</button>
            {player && <TwitchPlayer channel={channel} />}
          </Grid>
          <Grid item xs={6}>
            Test 1
          </Grid>
          <Grid item xs={6}>
            Test 2
          </Grid>
          <Grid item xs={6}>
            Test 3
          </Grid>
          <Grid item xs={6}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            rerum, eligendi asperiores est accusantium commodi molestiae
            voluptates voluptatem, dolor eaque delectus illum hic optio quidem
            natus alias, suscipit facilis neque deserunt! Deserunt quibusdam
            numquam eos recusandae adipisci laudantium perferendis accusamus
            inventore animi ipsa veniam itaque, provident amet similique
            incidunt placeat rerum assumenda ullam natus odit! Facilis assumenda
            consequuntur, sint esse dignissimos ipsum necessitatibus ratione
            iste eligendi? Sapiente, reiciendis iste. Quibusdam ducimus aliquam
            deleniti pariatur provident. Nihil natus, sint tenetur, ex libero id
            voluptates quia optio fugit sit repellendus hic excepturi corporis?
            Rerum in, fuga porro unde deleniti sint repellendus quas accusamus
            velit est harum voluptate possimus! Enim asperiores eius obcaecati
            animi at sequi optio, voluptas veritatis in quod a veniam. Tempore
            eum asperiores dolor aliquam itaque ad veniam ipsa dolorum
            doloremque voluptatibus consequuntur deserunt maiores nostrum qui
            nemo cum impedit, unde dolore distinctio atque aspernatur eaque id
            sint! Ab voluptatem quidem excepturi ea porro veniam non, eum iste
            suscipit magni earum vero odit temporibus dolorum velit repudiandae
            nobis sit expedita recusandae praesentium maiores cupiditate quam
            optio! Cum amet facilis neque at eligendi! Amet nisi possimus
            explicabo expedita repellendus molestias distinctio dolorum. Aliquid
            perspiciatis optio doloremque magni laudantium numquam animi nisi
            perferendis dignissimos accusamus odio, error, et blanditiis
            consectetur eligendi, eveniet vero! Harum labore, eum voluptatum
            molestiae repudiandae sit aliquid, ullam vero inventore perspiciatis
            odio vel voluptates aspernatur dignissimos dolor obcaecati, animi
            blanditiis asperiores unde quos earum libero provident! Odio, rerum
            facilis. Eveniet, dolorum! Recusandae velit hic molestias
            consequatur maiores aliquam harum, libero, et explicabo deleniti
            pariatur dolorum doloribus praesentium neque ipsa laudantium odit
            optio voluptatum id. Delectus numquam sit vitae laudantium a, quod
            sunt esse praesentium ipsum porro, itaque reprehenderit, et
            assumenda eligendi? Animi unde vel obcaecati ab voluptas ullam
            pariatur ea. Deleniti aliquam ipsam repudiandae nesciunt
            perspiciatis. Numquam aliquam explicabo alias voluptates facilis, ex
            cum ipsum pariatur! Corporis aliquid doloribus, rerum unde ad
            provident quae incidunt sapiente. Voluptatem ipsam quasi, molestiae
            qui iste labore dolor, quo nesciunt accusamus quisquam nisi?
            Exercitationem facere, numquam quo esse explicabo sapiente
            necessitatibus doloribus consectetur. Ipsa voluptatibus error
            praesentium vitae dolore eum ipsum eaque hic dolorem unde molestias
            optio, sapiente, iusto dignissimos cumque reiciendis suscipit
            consequatur exercitationem porro magnam aspernatur reprehenderit
            numquam. Quaerat quae, quod inventore illum non repudiandae
            cupiditate veniam in culpa harum natus, reiciendis, repellat atque
            doloremque sed nesciunt eos assumenda perferendis alias! Veniam
            omnis fuga culpa distinctio quae aliquam deleniti quos facere,
            voluptatem possimus ex ad quod aut, unde aspernatur, corporis
            reiciendis. Consequatur soluta culpa illum labore possimus eaque
            nisi, magni deserunt consectetur porro perferendis. Id, sed quo
            molestias voluptates et natus, nostrum placeat odit minima ab
            consectetur accusamus! Maxime et saepe incidunt natus alias at unde
            dolores, quam repellendus itaque quasi enim laboriosam tempore
            aliquam quis corrupti consequatur veritatis? Doloribus beatae,
            nostrum hic consectetur quasi quos neque, deserunt voluptatibus quia
            illum deleniti? Laboriosam odit laudantium est unde magni aperiam ab
            dolorum placeat doloremque, ducimus accusamus, assumenda quibusdam
            repudiandae maxime. Adipisci nisi ex accusamus at cupiditate
            eligendi, aperiam harum quia blanditiis numquam quasi quod
            dignissimos autem, sed eveniet laborum quis eum deserunt fugit,
            recusandae minus! Accusamus ab laboriosam rerum blanditiis
            laudantium omnis eaque optio itaque earum quam minus reprehenderit
            iusto, doloribus sapiente enim molestias inventore nam pariatur.
            Impedit expedita sed vero cumque totam saepe, autem, officia
            accusantium quaerat veritatis ratione perspiciatis ad! Repellendus
            et doloribus eos tempora, ipsum autem totam expedita recusandae
            suscipit itaque molestias perspiciatis aliquid voluptas. Assumenda
            reiciendis quaerat modi odit veniam. Odit culpa tempore, voluptas
            distinctio numquam at dolorum, ad eveniet alias atque inventore
            possimus amet doloremque vero quas itaque saepe, quod voluptatibus
            magni dolorem. Eum, aperiam, perferendis beatae numquam repellat
            dicta adipisci porro impedit ab voluptatibus odio soluta maxime
            nihil id natus iure. Ad, vero? Minus nihil accusantium nulla
            delectus hic porro eum, facere dolorem nam voluptas, consequatur
            maxime quaerat, aspernatur beatae dicta veritatis. Modi
            necessitatibus dolorem amet dolore? Odit obcaecati modi, excepturi
            itaque molestias at asperiores mollitia officiis commodi nihil a
            minima adipisci, id optio non atque esse nemo maxime provident
            vitae. Nam soluta amet nostrum suscipit asperiores eligendi esse
            nemo voluptates libero rem quisquam eius repellat exercitationem,
            beatae velit labore deleniti dicta quo quidem. Quam nisi atque
            recusandae voluptatibus nostrum dicta autem aperiam sit veritatis.
            Veritatis aliquid pariatur eos laborum ipsum qui, dolore beatae
            magni dolorem sed eligendi ad, ab voluptates. Non quibusdam quas
            maxime. Obcaecati incidunt, veritatis rem laboriosam necessitatibus
            ipsa eaque magnam voluptas neque quod, sequi quas autem consequuntur
            illo sit reprehenderit provident in magni cumque id nesciunt!
            Dignissimos sequi impedit molestiae voluptates rerum illo nobis enim
            amet totam illum voluptas repudiandae, commodi, ut nam dolor ipsam
            rem non repellat, dolores perferendis! Eius quis error, expedita
            illo ea nostrum unde itaque possimus maiores totam explicabo laborum
            earum aliquam quos nam vitae doloremque? Quod sed iste eveniet velit
            ducimus animi, repudiandae officiis culpa error, blanditiis aliquam
            possimus quos nobis vitae a quasi. Eligendi earum, odit corrupti
            voluptatibus cumque vero labore perferendis itaque ab cupiditate
            ipsum amet sint maxime voluptatum quisquam ad sit molestiae et! Iure
            rerum laborum id eligendi, sed porro nesciunt ducimus voluptatem
            alias delectus distinctio nisi quidem autem excepturi veritatis
            error ea minus veniam eius velit fugit voluptas? Obcaecati est esse
            minima nesciunt voluptas quos, suscipit earum fugit nisi temporibus,
            hic, a quia adipisci facilis! Doloribus at, sunt magnam, dolore
            facilis recusandae sit officiis accusantium dolor neque in. Sequi
            tempore libero quas corporis sunt provident fugiat, amet at itaque
            magni. Nihil adipisci dicta porro magni, enim assumenda ex dolor
            laudantium saepe molestiae repudiandae earum, animi amet? Explicabo
            architecto, molestiae asperiores excepturi quia voluptates totam hic
            dolores magni, cumque possimus quam esse dicta mollitia maxime nemo
            veritatis beatae earum blanditiis? Nihil consequatur accusantium
            quae, illum distinctio, aliquam sit quis vero perspiciatis qui
            officiis nostrum deleniti eius provident voluptatibus? Temporibus
            illum eum reiciendis nostrum, error consequatur expedita? Quis cum
            distinctio et quod accusantium deleniti illum excepturi ab
            perspiciatis modi necessitatibus laudantium recusandae aliquid est
            impedit dolorum quo voluptas qui, quas alias nisi veritatis neque.
            Autem vero corrupti provident deleniti necessitatibus consequatur
            rerum sequi dicta.
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  channelId: state.channel.currentChannelId,
  channelInfo: state.channel.currentChannelInfo,
});

export default connect(mapStateToProps, {
  getChannelInfo,
  getChannelFollowing,
  getTotalFollowers,
})(ChannelProfile);
