import React, { useState } from 'react';

import { TextField, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const SearchBox = ({ setInputQuery }) => {

	const [nameValue, setNameValue ] = useState('yogurt');
	const [maxCalories, setMaxCalories] = useState(1000)
	const classes = useStyles()

    const onChangeInputHandler = (input, event) => {
		switch(input) {
			case "name": 
				return setNameValue(event.target.value);
			case "maxCalories":
					return setMaxCalories(event.target.value);
			default: 
				return;
		}
        
	}
	
	const sendToDash = () => {
		setInputQuery({ name: nameValue, maxCalories: maxCalories});
	}

	return (
		<Box component="div" display="flex" justifyContent="center" className={classes.root}>
			<TextField id="outlined-basic" label="Rechercher une recette" size="small" variant="outlined" required fullWidth onChange={(event) => onChangeInputHandler("name", event)}/>
			<Box ml={1} className={classes.box}>
			<TextField type="number" id="outlined-basic" label="Calories max" size="small" variant="outlined" required onChange={(event) => onChangeInputHandler("maxCalories", event)}/>
			</Box>
			<Box ml={1} className={classes.box}>
				<Button variant="contained"  className={classes.bouton} onClick={sendToDash}>
					Rechercher
				</Button>
			</Box>
		</Box>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.down('xs')]: { 
			display: 'flex', 
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center'
		},
		[theme.breakpoints.down('sm')]: { 
			display: 'flex', 
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center'
		}
	},
	box :{
		[theme.breakpoints.down('xs')]: {
			marginTop: 10
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: 10
		},
	}, 
	bouton : {
		backgroundColor: '#98ee99',
		color: 'dark'
	}
}));

export default SearchBox;
