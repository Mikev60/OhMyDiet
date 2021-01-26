import React from 'react';
import { connect } from 'react-redux'
import { removeItemFromCartStart } from '../../redux/cart/cart.actions'

//material ui
import { Box, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles'

const CartItem = ({ item, cartUser, removeItemFromCart }) => {

    const deleteItemFromCart = (id) => {
        let copyCartUser = [...cartUser.items];
        let indexToDelete = copyCartUser.findIndex((element) => element.id === id)
        copyCartUser.splice(indexToDelete, 1);
        console.log(copyCartUser);
        removeItemFromCart(copyCartUser)
	}
	
	const classes= useStyles();

	return (
		<Box display="flex" flexDirection="column" width="15%" m={2} justifyContent="center" alignItems="center" alignContent="center" className={classes.root} flexWrap="wrap">
			<img src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`} alt="ingredient image" />
			<p>{item.name}</p>
			<Box display="flex" className={classes.column}>
				<p>
					Quantity : {item.amount.toFixed(2)} {item.measures.us.unitShort}
				</p>
				<IconButton aria-label="delete">
					<Delete color="secondary" onClick={(id) => deleteItemFromCart(item.id)}/>
				</IconButton>
			</Box>
		</Box>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.down('xs')]: { 
			width: '450px'
		},
		[theme.breakpoints.down('sm')]: { 
			width: '90px'
		},
	},
	column: {
		[theme.breakpoints.down('sm')]: { 
			flexDirection: 'column'
		},
		[theme.breakpoints.down('xs')]: { 
			flexDirection: 'column'
		},
	}
}));

const mapStateToProps = state => ({
    cartUser: state.cart.cart
})

const mapDispatchToProps = dispatch => ({
    removeItemFromCart: (newCart) => dispatch(removeItemFromCartStart(newCart))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
