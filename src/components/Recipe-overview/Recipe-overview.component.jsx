import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { setFavoriteStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

//material ui
import { makeStyles } from '@material-ui/core/styles';
import { CardHeader, CardMedia, Card, CardActions, Divider, Box, Button } from '@material-ui/core/';
import { ToggleButton } from '@material-ui/lab';
import { FavoriteBorder, Favorite, Whatshot } from '@material-ui/icons';

const RecipeOverview = ({ recipe, setFavorite, userFavorites }) => {
	const [isFavorite, setIsFavorite] = useState(false);

	const handleFavoriteChange = () => {
		console.log('i am called');
		console.log(userFavorites);
		setIsFavorite(!isFavorite);
		let userFavoritesCopy = [...userFavorites];
		let indexToDelete = userFavoritesCopy.findIndex((element) => element.id === recipe.id);
		console.log(indexToDelete);
		if (indexToDelete < 0 || userFavorites == null) {
			console.log('ici');
			userFavoritesCopy.push({ id: recipe.id, title: recipe.title, image: recipe.image });
		} else {
			console.log(indexToDelete);
			userFavoritesCopy.splice(indexToDelete, 1);
			console.log(userFavoritesCopy);
		}
		setFavorite(userFavoritesCopy);
	};

	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardHeader className={classes.header}  title={recipe.title} titleTypographyProps={{variant:'subtitle1' }}/>
			<CardMedia component="img" src={recipe.image} />
			<CardActions>
				<Box display="flex" flexDirection="column" width="100%">
					<Box
						display="flex"
						justifyContent="space-between"
						width="100%"
						alignContent="center"
						alignItems="center"
						mb={1}
					>
						
						{recipe.nutrition ? <span> <Whatshot />{recipe.nutrition.nutrients[0].amount} kcal</span> : null } {' '}
						<ToggleButton value="check" onChange={handleFavoriteChange}>
							{userFavorites ? (
								userFavorites.findIndex((element) => element.id === recipe.id) >= 0 ? (
									<Favorite />
								) : (
									<FavoriteBorder />
								)
							) : null}
						</ToggleButton>
					</Box>
					<Divider variant="middle" />
					<Box display="flex" justifyContent="center" mt={1}>
						<Link to={`/recipe-detail/${recipe.id}`}>
							<Button className={classes.bouton} variant="contained">
								SEE RECIPE
							</Button>
						</Link>
					</Box>
				</Box>
			</CardActions>
		</Card>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: 200,
		display: 'inline-block',
		margin: '1rem',
		[theme.breakpoints.down('sm')]: { 
			width: 150
		},
		[theme.breakpoints.down('sm')]: { 
			width: 250
		}
	},
	header: {
		height: 50,
		padding: 10,
		fontSize: '12px'
	}, 
	bouton : {
		backgroundColor: '#66bb6a',
		color: 'dark'
	}
}));

const mapStateToProps = (state) => ({
	userFavorites: state.user.favorites
});

const mapDispatchToProps = (dispatch) => ({
	setFavorite: (favoritesArray) => dispatch(setFavoriteStart(favoritesArray))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeOverview);
