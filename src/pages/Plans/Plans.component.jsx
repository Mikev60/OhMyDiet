import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';
import { addPlanStart } from '../../redux/user/user.actions'

//Components
import Spinner from '../../components/Spinner/Spinner.component';
import PlanItem from '../../components/PlanItem/PlanItem.component';

//material ui
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const PlansPage = ({ preferencesUser, addPlanToProfile, weekPlanUser }) => {
	const [weekPlan, setWeekPlan] = useState();
	const [isLoading, setIsLoading] = useState(false);
    const classes = useStyles();
    
    useEffect(() => {
        setWeekPlan(weekPlanUser)
    }, [weekPlanUser])

	const generatePlan = () => {
		setIsLoading(true);
		axios
			.get(
				`/mealplanner/generate?timeFrame=week&targetCalories=${preferencesUser.maxCalories}&diet=${preferencesUser.diet}&apiKey=ba2dbccf9ca542dca8c91861a6901736`
			)
			.then((response) => {
                setWeekPlan(response.data.week);
                addPlanToProfile(response.data.week);
			})
			.catch((error) => console.log(error));
		setIsLoading(false);
	};

	return (
		<React.Fragment>
			<Box display="flex" justifyContent="center">
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignContent="center"
					alignItems="center"
					width="80%"
				>
					{!isLoading ? (
						<React.Fragment>
							<p>
								You currently have no plan for the week. Please set your preferences and generate one.
							</p>
							<Box m={2}>
								<Button variant="contained" color="primary" onClick={generatePlan}>
									Generate plan
								</Button>
							</Box>
							{weekPlan
								? Object.keys(weekPlan).map((keyName, keyIndex) => {
										return (
											<Box
												mt={3}
												width="100%"
												justifyContent="center"
												alignContent="center"
												alignItems="center"
												display="flex"
												className={classes.root}
											>
												<PlanItem
													key={keyName}
													dayPlan={weekPlan[keyName]}
													day={`${keyName}`}
												/>
											</Box>
										);
								  })
								: null}
						</React.Fragment>
					) : (
						<Spinner />
					)}
				</Box>
			</Box>
		</React.Fragment>
	);
};

const useStyles = makeStyles({
	root: {
        border: '1px solid grey',
        padding: 10,
        borderRadius: 10
	}
});

const mapStateToProps = (state) => ({
    preferencesUser: state.user.preferences,
    weekPlanUser: state.user.weekPlan
});

const mapDispatchToProps = dispatch => ({
    addPlanToProfile: (plan) => dispatch(addPlanStart(plan))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlansPage);
