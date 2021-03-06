import React, { useState } from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Collapse from "@material-ui/core/Collapse";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { useLocation } from "react-router-dom";

// based on reference https://material-ui.com/components/cards/#card

//locals
import { useStyles } from "../../utils";

const Post = ({
  author,
  title,
  posted_on,
  image,
  description,
  comment,
  like,
  likeAction,
  commentAction,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const location = useLocation();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {author && author[0]}
          </Avatar>
        }
        title={title}
        subheader={`${author} em ${posted_on && posted_on.slice(0, 10)}`}
      />

      <CardMedia className={classes.media} image={image} title="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      {location.pathname !== "/timeline" && (
        <>
          <CardActions disableSpacing>
            {location.pathname !== "/feed" && (
              <>
                <IconButton aria-label="add to favorites" onClick={likeAction}>
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  aria-label="add to favorites"
                  onClick={commentAction}
                >
                  <ChatBubbleOutlineIcon />
                </IconButton>
              </>
            )}
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography variant="body2" color="textSecondary" component="p">
              {like && like.length > 0 && (
                <Typography paragraph>Likes : {like && like.length}</Typography>
              )}
              {comment &&
                comment.map((comment, i) => {
                  return (
                    <div div key={i}>
                      <Typography paragraph>
                        {comment.author.username} : {comment.comment}
                      </Typography>
                      {comment.commented_on}
                    </div>
                  );
                })}
            </Typography>
          </Collapse>
        </>
      )}
    </Card>
  );
};

export default Post;
