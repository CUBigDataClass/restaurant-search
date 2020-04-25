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
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '82vh',
  },
  media: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
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
  // console.log(props)
  // const rest_list = props.rest_list.data
  // console.log(rest_list)
  // const current_rest = rest_list.find(x => x["business_id"] === props.index)
  // console.log(current_rest)

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
          <Box component="fieldset" borderColor="transparent" style={{paddingTop: "5px",}}>
            <Rating name="disabled" value={rest_list[props.index].rest_stars} disabled />
          </Box>
        }
        title={rest_list[props.index].rest_name}
        subheader="ADDRESS : "
      />
      { rest_list[props.index].categories && <CardMedia className={classes.media}>
        {rest_list[props.index].categories.map((item, index) => (
          <Chip
            label={item}
            clickable
            color="primary"
            variant="outlined"
          />
        ))}
      </CardMedia> 
      }
      <ImageGrid name={rest_list[props.index].rest_name}/>
    
      <CardContent>
        <Carousel animation="slide" indicators="false" className="MuiTypography-root MuiTypography-body2 MuiTypography-colorTextSecondary">
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
