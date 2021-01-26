import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setPreferencesStart } from '../../redux/user/user.actions';

//material ui
import { Button, InputLabel, MenuItem, Select, Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const Preferences = (props) => {
	const [diet, setDiet] = useState();
	const [maxCalories, setMaxCalories] = useState(0);
	const classes = useStyles()

	const handleChange = (event) => {
		if(event.target.name === "diet") {
			setDiet(event.target.value);
		} else if (event.target.name === "maxCalories") {
			setMaxCalories(event.target.value)
		}
	};

	const onSubmit = () => {
		props.setPreferences({ preferences: { diet: diet, maxCalories: maxCalories}});
		props.triggerClose();
	};

	return (
		<React.Fragment>
			<Box display="flex" alignContent="center" alignItems="center" justifyContent="space-between" className={classes.diet}>
			<InputLabel id="demo-simple-select-outlined-label">Set your specific diet : </InputLabel>
			<Select
				labelId="demo-simple-select-outlined-label"
				id="demo-simple-select-outlined"
				name="diet"
				onChange={handleChange}
				label="Age"
				value={props.dietUser}
			>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				<MenuItem value="vegan">Vegan</MenuItem>
				<MenuItem value="vegetarian">Vegetarian</MenuItem>
				<MenuItem value="GlutenFree">Gluten free</MenuItem>
			</Select>
			</Box>
			<Box display="flex" alignContent="center" alignItems="center" justifyContent="space-between" mt={2} className={classes.maxCalories}>
			<InputLabel id="demo-simple-select-outlined-label">Set your max number of calories/day : </InputLabel>
			<Box width="30%" className={classes.maxCaloriesInput}><TextField id="outlined-basic" type="number" label='Max. cal. / day' name="maxCalories" variant="outlined" size="small" value={props.maxCaloriesUser} onChange={handleChange}/></Box>
			</Box>
			<Box mt={2}>
				<Button variant="contained" color="primary" onClick={onSubmit}>
					Save preferences
				</Button>
			</Box>
		</React.Fragment>
	);
};

const useStyles = makeStyles((theme) => ({
	diet: {
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
	maxCalories: {
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
	maxCaloriesInput: {
		[theme.breakpoints.down('xs')]: { 
			marginTop: 20,
			width: '100px'
		},
		[theme.breakpoints.down('sm')]: { 
			marginTop: 20,
			width: '200px'
		}
	},
}))

const mapStateToProps = (state) => ({
	dietUser: state.user.preferences.diet,
	maxCaloriesUser: state.user.preferences.maxCalories,
});

const mapDispatchToProps = (dispatch) => ({
	setPreferences: (preferences) => dispatch(setPreferencesStart(preferences))
});

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
