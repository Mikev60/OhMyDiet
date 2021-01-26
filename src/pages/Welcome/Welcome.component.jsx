import React from 'react';

//components
import SignInUp from '../../pages/SignInUp/Login.component';

//images
import bckImg from '../../images/welcome.jpeg';
import playStore from '../../images/playstore.png'
import appleStore from '../../images/applestore.png'

//material ui
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PlayCircleFilledWhite } from '@material-ui/icons';

const WelcomePage = () => {
	const classes = useStyles();

	return (
		<Box display="flex" width="100%" className={classes.root}>
			<Box width="50%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Box mb={2}><Typography variant="h2" className={classes.title}>Join us on mobile !</Typography></Box>
                <img src={playStore} alt="Git it on playstore" width="250" height="100" />
                <img src={appleStore} alt="Git it on applestore" width="230" height="120" />

            </Box>
			<SignInUp />
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
		backgroundImage: `url(${bckImg})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        height: '80vh'
    }, 
    title: {
        color: 'white'
    }
}));

export default WelcomePage;
