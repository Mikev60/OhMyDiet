import React from 'react';
import { connect } from 'react-redux';
import CartItem from '../../components/CartItem/CartItem.component';

//material ui
import { Box, Paper } from '@material-ui/core';

const CartPage = ({ cartUser }) => {
	return (
		<React.Fragment>
			<Paper elevation={4}>
				<Box display="flex" flexWrap="wrap" justifyContent="center">
					{cartUser
						? cartUser.map((item) => {
								return <CartItem item={item} />;
						  })
						: null}
				</Box>
			</Paper>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	cartUser: state.cart.cart.items
});

export default connect(mapStateToProps)(CartPage);
