import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOutStart } from '../../redux/user/user.actions';

//Components
import CustomModal from '../Modal/Modal.component';
import Preferences from '../Preferences/Preferences.component';
import MobileMenu from '../MobileMenu/MobileMenu.component';

//material ui
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography, IconButton, Box } from '@material-ui/core';
import { Favorite, Settings, AccountCircle, MenuBook, ShoppingBasket, Menu } from '@material-ui/icons';

const Header = ({ currentUser, signOut }) => {
	const classes = useStyles();
	const modalRef = useRef();
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const closeModal = () => {
		modalRef.current.handleClose();
	};

	const openModal = () => {
		modalRef.current.handleOpen();
	};

	const renderMobileMenu = (
		<MobileMenu
			mobileMoreAnchorEl={mobileMoreAnchorEl}
			isMobileMenuOpen={isMobileMenuOpen}
			handleMobileMenuClose={handleMobileMenuClose}
			openModal={openModal}
			signOut={signOut}
			currentUser={currentUser}
		/>
	);

	return (
		<AppBar position="static" className={classes.root}>
			<CustomModal
				ref={modalRef}
				title="Set your preferences"
				subTitle="Set your peferences so you get recipes that only fit you."
			>
				{' '}
				<Preferences triggerClose={() => modalRef.current.handleClose()} />
			</CustomModal>
			<Toolbar>
				<Link to="/" className={classes.title}>
					<Typography variant="h4">OhMyDiet</Typography>
				</Link>
				<Box className={classes.sectionDesktop}>
				{currentUser ? (
					<React.Fragment>
						
							<Link to="/plans" className={classes.link}>
								<Button color="inherit" startIcon={<MenuBook />}>
									{' '}
									My plans
								</Button>
							</Link>
							<Link to="/cart" className={classes.link}>
								<Button color="inherit" startIcon={<ShoppingBasket />}>
									{' '}
									Cart
								</Button>
							</Link>
							<Link to="/favorites" className={classes.link}>
								<Button color="inherit" startIcon={<Favorite />}>
									{' '}
									Favorites
								</Button>
							</Link>
							<Button
								color="inherit"
								className={classes.link}
								startIcon={<Settings />}
								onClick={() => modalRef.current.handleOpen()}
							>
								{' '}
								Settings{' '}
							</Button>
							<Button className={classes.link} color="inherit" startIcon={<Settings />} onClick={signOut}>
								{' '}
								Log out{' '}
							</Button>
					</React.Fragment>
				) : (
					<Link to="/login" className={classes.link}>
						<Button color="inherit" startIcon={<AccountCircle />}>
							Sign In / Up
						</Button>
					</Link>
				)}
				</Box>
				<div className={classes.sectionMobile}>
					<IconButton
						aria-label="show more"
						aria-haspopup="true"
						onClick={handleMobileMenuOpen}
						color="inherit"
					>
						<Menu />
					</IconButton>
				</div>
			</Toolbar>
			{renderMobileMenu}
		</AppBar>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#81c784'
	},
	title: {
		flexGrow: 1, 
		color: '#003300'
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex'
		}
	},
	link: {
		color: '#005005'
	}
}));

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
	signOut: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
