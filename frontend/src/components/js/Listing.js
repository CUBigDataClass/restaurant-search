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
import Card from '@material-ui/core/Card';
import PaginationList from 'react-pagination-list';

import '../css/listing.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '82vh',
  },
  inline: {
    display: 'inline',
  },
}));

// const classes = useStyles();
class AlignItemsList extends React.Component {
    constructor(props) {
        super(props);
        }
    state = {
        data : this.props.rest_list.data
    }
    render(){
        const {
            props,
        } = this;
        return (
            <Card>
            <div style={{height:'80vh'}}>
                <List className="listing-parent">
                    <PaginationList 
                        data={props.rest_list.data}
                        pageSize={5}
                        renderItem={(item, key) => (
                            <React.Fragment>
                                <ListItem key={key}alignItems="flex-start" onClick={((e) => props.onClick({bid: item["business_id"], bname: item["name"],bcategories: item["categories"], bcity: item["city"],blocation : item["location"], brating : item["rating"], breview_count : item["reviewCount"], btop_10: item["top_10_reviews"]}))}>
                                    <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                    primary={item["name"]}
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className="display-inline"
                                            color="textSecondary"
                                        >
                                            {item["streetAddress"]}
                                        </Typography>
                                        <MDBRow>
                                    <MDBCol><Typography variant="body2" color="textSecondary">{item["city"]}</Typography></MDBCol>
                                            <MDBCol><Box component="fieldset" borderColor="transparent">
                                                        <Rating name="disabled" value={item["rating"]} disabled />
                                                    </Box>
                                            </MDBCol>
                                        </MDBRow>
                                        </React.Fragment>
                                    }
                                    />

                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </React.Fragment>
                        )}
                    />
                </List>
            </div>
            </Card>
        );
    }
}

export default AlignItemsList;
