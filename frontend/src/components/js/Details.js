import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { rest_list } from "./Listing";
import ImageGrid from "./ImageGrid";
import Carousel from 'react-material-ui-carousel';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '85vh',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));



export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const items = ["Good Food! Good Food! Good Food! Good Food! Good Food! Good Food! Good Food! Good Food! Good Food! Good Food!","Decent!","Bad Food!"]
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={rest_list[props.index].rest_name}
        subheader="ADDRESS : "
      />
      <ImageGrid name={rest_list[props.index].rest_name}/>
    
      <CardContent>
        <Carousel animation="slide" indicators="false" className="MuiTypography-root makeStyles-inline-34 MuiTypography-body2 MuiTypography-colorTextSecondary">
        {
          items.map( (item, index) => {
              return <Typography key={index}>{item}</Typography>
          })
        }
        </Carousel>
      </CardContent>
    </Card>
  );
}
