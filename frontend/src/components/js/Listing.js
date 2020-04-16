import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 620,
  },
  inline: {
    display: 'inline',
  },
}));

const rest_list = [
    {   rest_id: 1,
        rest_name: 'Taco Bell',
        rest_hours: '9-5',
        rest_stars: 3,
        lat: 47.69855629475769,
        lng: -122.14184416996333
    },
    {
        rest_id: 2,
        rest_name: 'Subway',
        rest_hours: '9-5',
        rest_stars: 3,
        lat: 47.50855629475769,
        lng: -122.14174416996333
    },
    {   rest_id: 1,
        rest_name: 'Dominos',
        rest_hours: '9-5',
        rest_stars: 3,
    },
    {
        rest_id: 2,
        rest_name: '3',
        rest_hours: '9-5',
        rest_stars: 3,
    },
    {   rest_id: 1,
        rest_name: 'Taco Bell',
        rest_hours: '9-5',
        rest_stars: 3,
    },
    {
        rest_id: 2,
        rest_name: 'Taco Bell',
        rest_hours: '9-5',
        rest_stars: 3,
    },
    {   rest_id: 1,
        rest_name: 'Taco Bell',
        rest_hours: '9-5',
        rest_stars: 3,
    },
    {
        rest_id: 2,
        rest_name: 'Taco Bell',
        rest_hours: '9-5',
        rest_stars: 3,
    },
    {   rest_id: 1,
        rest_name: 'Taco Bell',
        rest_hours: '9-5',
        rest_stars: 3,
    },
    {
        rest_id: 2,
        rest_name: 'Taco Bell',
        rest_hours: '9-5',
        rest_stars: 3,
    },
  ];
export { rest_list };


export default function AlignItemsList(props) {
  const classes = useStyles();

  return (
    <div>
        <List className={classes.root}>
        {rest_list.map((item, index) => (
            <React.Fragment>
                <ListItem alignItems="flex-start" onClick={((e) => props.onClick(index))}>
                    <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary={item.rest_name}
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textSecondary"
                        >
                            Ali Connors
                        </Typography>
                        <MDBRow>
                    <MDBCol><Typography variant="body2" color="textSecondary">Hours: {item.rest_hours}</Typography></MDBCol>
                            <MDBCol><Box component="fieldset" borderColor="transparent">
                                        <Rating name="disabled" value={item.rest_stars} disabled />
                                    </Box>
                            </MDBCol>
                        </MDBRow>
                        </React.Fragment>
                    }
                    />

                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        ))}
        </List>
        <Pagination count={10} color="primary" size="medium" />
    </div>
  );
}
