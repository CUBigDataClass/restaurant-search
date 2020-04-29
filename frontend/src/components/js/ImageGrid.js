import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { rest_list } from "./Listing";
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 350,
  },
}));

let tileData = []
/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

function fetch_pics(rest_name, query, setTileData, setQuery) {
	if (rest_name != query) {
		console.log(rest_name, query)
		setQuery(rest_name)
		axios.get('http://104.198.7.64/pics?query=' + rest_name)
		.then(response => {
			setTileData(response.data)
		})
	}
}
export default function ImageGridList(props) {
	const [tileData, setTileData] = useState([]);
	const [query, setQuery] = useState('');
  const classes = useStyles();
  fetch_pics(props.name, query, setTileData, setQuery);

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
