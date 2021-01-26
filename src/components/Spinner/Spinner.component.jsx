import { SpaOutlined } from '@material-ui/icons';
import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

//material ui
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Spinner = () => {
    const classes = useStyles();

	return (
		<Box display="flex" flexDirection="column" width="100%" justifyContent="center" alignItems="center">
			<Loader type="Grid" color="#00BFFF" height={100} width={100} />
            <p className={classes.spinnerText}>Loading...</p>
		</Box>
	);
};

const useStyles = makeStyles({
    spinnerText: {
        color: '#00BFFF',
        fontSize: 20
    }
})

export default Spinner;
