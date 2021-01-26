import React from 'react';
import { Link } from 'react-router-dom';

//material ui
import { Menu, MenuItem, Button } from '@material-ui/core';
import { Favorite, Settings, MenuBook, ShoppingBasket, AccountCircle } from '@material-ui/icons';

const MobileMenu = ({
	mobileMoreAnchorEl,
	isMobileMenuOpen,
	handleMobileMenuClose,
	openModal,
	signOut,
	currentUser
}) => {
	const mobileMenuId = 'primary-search-account-menu-mobile';

	return (
		<React.Fragment>
			{currentUser ? (
				<Menu
					anchorEl={mobileMoreAnchorEl}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					id={mobileMenuId}
					keepMounted
					transformOrigin={{ vertical: 'top', horizontal: 'right' }}
					open={isMobileMenuOpen}
					onClose={handleMobileMenuClose}
				>
					<MenuItem>
						<Link to="/plans">
							<Button color="inherit" startIcon={<MenuBook />}>
								{' '}
								My plans
							</Button>
						</Link>
					</MenuItem>
					<MenuItem>
						<Link to="/cart">
							<Button color="inherit" startIcon={<ShoppingBasket />}>
								{' '}
								Cart
							</Button>
						</Link>
					</MenuItem>
					<MenuItem>
						<Link to="/favorites">
							<Button color="inherit" startIcon={<Favorite />}>
								{' '}
								Favorites
							</Button>
						</Link>
					</MenuItem>
					<MenuItem>
						<Button color="inherit" startIcon={<Settings />} onClick={openModal}>
							{' '}
							Settings{' '}
						</Button>
					</MenuItem>
					<MenuItem>
						<Button color="inherit" startIcon={<Settings />} onClick={signOut}>
							{' '}
							Log out{' '}
						</Button>
					</MenuItem>
				</Menu>
			) : (
				<Menu
					anchorEl={mobileMoreAnchorEl}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					id={mobileMenuId}
					keepMounted
					transformOrigin={{ vertical: 'top', horizontal: 'right' }}
					open={isMobileMenuOpen}
					onClose={handleMobileMenuClose}
				>
					<MenuItem>
						<Link to="/login">
							<Button color="inherit" startIcon={<AccountCircle />}>
								Sign In / Up
							</Button>
						</Link>
					</MenuItem>{' '}
				</Menu>
			)}
		</React.Fragment>
	);
};

export default MobileMenu;
