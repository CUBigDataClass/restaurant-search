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
import ImageGrid from "./ImageGrid";
import Carousel from 'react-material-ui-carousel';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import '../css/details.css';
import Trunk8 from 'react-trunk8';

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

// const classes = useStyles();
const items = ["Good Food! Good Food! Good Food! Good Food! Good Food! Good Food! Good Food! Good Food! Good Food! Good Food!","Decent!","Bad Food!"];

class RecipeReviewCard extends React.Component {
  constructor(props) {
      super(props);
      }
  state = {
      btop_10 : this.props.btop_10
  }
  render(){

    const {
      props,
    } = this;
    // const btop_10 = props.btop_10
    console.log(props.btop_10)
    // console.log(props)
    // rest_list = props.rest_list.data
    // console.log(rest_list)
    // current_rest = rest_list.find(x => x["business_id"] === props.index)
    // console.log(current_rest)

    return(
      <Card className="details-root">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className="details-avatar">
              R
            </Avatar>
          }
          action={
            <Box component="fieldset" borderColor="transparent" style={{paddingTop: "5px",}}>
              <Rating name="disabled" value={props.brating} disabled />
            </Box>
          }
          title={props.bname}
          subheader={props.baddress} 
        />
        { props.bcategories && <CardMedia className="details-media padding_12_lr">
          {props.bcategories.map((item, index) => (
            <Chip
              label={item}
              clickable
              color="primary"
              variant="outlined"
              className="margin_4"
            />
          ))}
        </CardMedia> 
        }
        <ImageGrid name={props.bname}/>
      
        <CardContent>
        {props.btop_10 &&<Carousel animation="slide" indicators="false" className="MuiTypography-root MuiTypography-body2 MuiTypography-colorTextSecondary">
          {
            props.btop_10.map( (item, index) => {
                return <Trunk8 lines={4}> <Typography key={index}>{item.text}</Typography> </Trunk8>
            })
          }
          </Carousel>}
        </CardContent>
      </Card>
    );
  }
}

export default RecipeReviewCard;

