import React from 'react';
import { Link } from 'react-router-dom';

//material ui
import { Box, Button } from '@material-ui/core';
import { AccessAlarm } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles'

const PlanItemMeal = ({ meal, index }) => {
	let type;
	const classes = useStyles()

	if (index === 0) {
		type = 'Breakfast';
	} else if (index === 1) {
		type = 'Lunch';
	} else if (index === 2) {
		type = 'Dinner';
	} else {
		type = 'N/A';
	}

	return (
		<Box display="flex" width="100%" className={classes.root}>
			<Box width="20%" display="column" className={classes.info}>
				<p>{type}</p>
				<p>
					<AccessAlarm /> {meal.readyInMinutes} min
				</p>
			</Box>
			<Box width="80%" display="flex" alignItems="center" justifyContent="space-between" className={classes.detail}>
				<p>{meal.title}</p>
				<Link to={`/recipe-detail/${meal.id}`}>
					<Button color="primary" variant="contained">Voir la recette</Button>
				</Link>
			</Box>
		</Box>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '1rem',
		[theme.breakpoints.down('xs')]: { 
			display: 'flex', 
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		},
		[theme.breakpoints.down('sm')]: { 
			display: 'flex', 
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		},
    },
	info: {
		margin: '1rem',
		[theme.breakpoints.down('xs')]: { 
			display: 'flex', 
			flexDirection: 'row',
			width: '100%',
			justifyContent: 'space-around',
			alignItems: 'center',
		},
		[theme.breakpoints.down('sm')]: { 
			display: 'flex', 
			flexDirection: 'row',
			width: '100%',
			justifyContent: 'space-around',
			alignItems: 'center',
		},
    },
	detail: {
		margin: '1rem',
		[theme.breakpoints.down('xs')]: { 
			display: 'flex', 
			flexDirection: 'column',
			width: '100%',
			justifyContent: 'space-around',
			alignItems: 'center',
		},
		[theme.breakpoints.down('sm')]: { 
			display: 'flex', 
			flexDirection: 'column',
			width: '100%',
			justifyContent: 'space-around',
			alignItems: 'center',
		},
    },
}))

export default PlanItemMeal;
