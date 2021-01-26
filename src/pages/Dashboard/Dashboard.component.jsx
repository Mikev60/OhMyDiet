//React
import React, { useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';

//material ui
import { Box } from '@material-ui/core/';

//Components
import SearchBox from '../../components/SearchBox/SearchBox.component';
import RecipeOverview from '../../components/Recipe-overview/Recipe-overview.component';
import Spinner from '../../components/Spinner/Spinner.component'

const Dashboard = () => {
	const [query, setQuery] = useState('yogurt');
	const [maxCalories, setMaxCalories] = useState(1000);
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(true)
	const data = useAxios(`recipes/complexSearch?query=${query}&maxCalories=${maxCalories}&apiKey=ba2dbccf9ca542dca8c91861a6901736`);

	const setInputQuery = ({ name, maxCalories }) => {
		setQuery(name);
		setMaxCalories(maxCalories);
	};

	useEffect(() => {
		setRecipes(data.results)
		setLoading(false);
	}, [query, data]);

	return (
		<div>
			{ !loading ? (
			<Box component="div" display="flex" flexDirection="column" justifyContent="center" alignContent="center">
				<SearchBox setInputQuery={setInputQuery} />
				<Box
					component="div"
					display="flex"
					flexDirection="row-wrap"
					justifyContent="center"
					alignContent="center"
					flexWrap="wrap"
				>
					{ recipes ? 
					recipes.map((recipe) => {
						return <RecipeOverview key={recipe.id} recipe={recipe} />;
					}) : null }
				</Box>
			</Box>
			) : <Spinner /> }
		</div>
	);
};

export default Dashboard;
