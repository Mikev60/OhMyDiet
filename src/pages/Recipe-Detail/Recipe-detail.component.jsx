//librairies etc
import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { connect } from 'react-redux';
import { addItemsToCartStart } from '../../redux/cart/cart.actions';

//material ui
import { Box, Typography, Button, Divider } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { Kitchen, AccessAlarm, RestaurantMenu, Whatshot, Person, TextRotationNoneTwoTone } from '@material-ui/icons';

const RecipeDetail = (props) => {
	const [idRecipe, setIdRecipe] = useState(props.match.params.id);
	const [RecipeDetails, setRecipeDetails] = useState({});
	const classes = useStyles();
	const data = useAxios(
		`recipes/${idRecipe}/information?includeNutrition=true&apiKey=ba2dbccf9ca542dca8c91861a6901736`
	);

	useEffect(() => {
		setRecipeDetails(data);
	}, [idRecipe, data]);

	const addIngredientsToCart = () => {
		let copyIngredients = [...RecipeDetails.extendedIngredients];
		let copyCart = [...props.cartUser.items]
		copyIngredients.forEach((element, index) => {
			if (props.cartUser.items.findIndex(item => item.id === element.id) >= 0) {
				return; 
			}
			copyCart.push(element)
		});
		console.log(copyCart)
		props.addItemsToCart(copyCart);
	};

	console.log();

	return (
		<Box display="flex" flexDirection="row" justifyContent="center" className={classes.root}>
			<Box display="flex" flexDirection="column" width="25%" p={1} className={classes.leftColumn}>
				<Typography variant="h4">Informations : </Typography>
				{RecipeDetails.vegan ? <span>Vegan </span> : null}
				{RecipeDetails.vegetarian ? <span>Vegetarian </span> : null}
				{RecipeDetails.glutenFree ? <span>Gluten free </span> : null}
				<Box display="flex" alignItems="center" mt={4}>
					<Kitchen fontSize="large" />
					<Typography variant="h4">Ingredients : </Typography>
				</Box>
				{RecipeDetails.extendedIngredients
					? RecipeDetails.extendedIngredients.map((ingredient) => {
							return (
								<Box m={1}>
									<img
										src={` https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
										className={classes.Ingredient}
									/>{' '}
									{ingredient.name} ({ingredient.amount} {ingredient.unit})
								</Box>
							);
					  })
					: null}
				<Box display="flex" justifyContent="center" m={4}>
					<Button variant="contained" color="primary" fullWidth={false} m={1} onClick={addIngredientsToCart}>
						Add to cart
					</Button>
				</Box>
			</Box>
			<Box display="flex" flexDirection="column" width="75%" className={classes.RecipeContent} p={1}>
				<Box display="flex" flexDirection="colmun" mb={1} justifyContent="space-between">
					<Box display="flex" flexDirection="column" className={classes.RecipeHeader} flexGrow={1}>
						<img src={RecipeDetails.image} className={classes.img}/>
						<Box display="flex" flexDirection="column">
							<Typography variant="h4">{RecipeDetails.title}</Typography>
							<Box display="flex" flexDirection="row" justifyContent="space-between" classes={classes.info}>
								<p>
									<Whatshot /> { RecipeDetails.nutrition ? RecipeDetails.nutrition.nutrients[0].amount : null} kcal
								</p>
								<p>
									<AccessAlarm /> {RecipeDetails.readyInMinutes} min
								</p>
								<p>
									<Person /> {RecipeDetails.servings}
								</p>
								<p>
									<RestaurantMenu />{' '}
									<span>
										{RecipeDetails.cuisines ? (
											RecipeDetails.cuisines.length > 0 ? (
												RecipeDetails.cuisines.map((cuisine) => {
													return cuisine;
												})
											) : (
												<span>Not specified</span>
											)
										) : null}
									</span>
								</p>
							</Box>
						</Box>
						<Box width={200}>
							<Button variant="contained" color="secondary" size="small">
								Add to favorites
							</Button>
						</Box>
					</Box>
				</Box>
				<Divider />
				<Box display="flex" flexDirection="column">
					<Typography variant="h4">Instructions : </Typography>
					{RecipeDetails.analyzedInstructions
						? RecipeDetails.analyzedInstructions.map((Analyzedinstruction) => {
								return Analyzedinstruction.steps.map((instruction) => {
									return <p>{instruction.step}</p>;
								});
						  })
						: null}
				</Box>
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
			padding: 'none'
		},
	},
	RecipeContent: {
		borderLeft: '1px solid grey',
		[theme.breakpoints.down('xs')]: { 
			width: '100%',
			padding: 'none',
			borderLeft: 'none'
		},
		[theme.breakpoints.down('sm')]: { 
			width: '100%',
			padding: 'none',
			borderLeft: 'none'
		},
	},
	RecipeHeader: {
		textAlign: 'left'
	},
	Ingredient: {
		width: 50,
		height: 50
	}, 
	leftColumn: {
		[theme.breakpoints.down('xs')]: { 
			width: '100%'
		},
		[theme.breakpoints.down('sm')]: { 
			width: '100%'
		},
	},
	img: {
		[theme.breakpoints.down('xs')]: { 
			width: '100%'
		},
		[theme.breakpoints.down('sm')]: { 
			width: '100%'
		},
	},
	info: {
		[theme.breakpoints.down('xs')]: { 
			alignItems: 'center',
			alignContent: 'center',
			justifyContent: 'center'
		},
		[theme.breakpoints.down('sm')]: { 
			alignItems: 'center',
			alignContent: 'center',
			justifyContent: 'center'
		},
	}
}));

const mapStateToProps = (state) => ({
	cartUser: state.cart.cart
});

const mapDispatchToProps = (dispatch) => ({
	addItemsToCart: (items) => dispatch(addItemsToCartStart(items))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
