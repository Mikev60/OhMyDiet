import React from 'react' 
import PlanItemMeal from '../PlanItemMeal/PlanItemMeal.component'

//material ui
import { Box  } from '@material-ui/core';
import { Whatshot } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles'

const PlanItem = ({dayPlan, day}) => {

    const classes = useStyles()

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    return <Box
    display="flex"
    flexDirection="column"
    width="100%"
    justifyContent="center"
    alignContent="center"
    alignItems="center"

>
    <Box display="flex" width="100%" className={classes.root}>
        <Box width="20%">{ day.capitalize()  }</Box>
        <Box width="80%" display="flex"><Whatshot color="secondary"/> Calories : {dayPlan.nutrients.calories} - Carbs: {dayPlan.nutrients.carbohydrates} - Proteins: {dayPlan.nutrients.protein} - Fat: {dayPlan.nutrients.fat}</Box>
    </Box>
    {
        dayPlan.meals.map((meal, index) => {
            return <PlanItemMeal meal={meal} index={index} />
        })
    }
</Box>
}

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
}))

export default PlanItem;