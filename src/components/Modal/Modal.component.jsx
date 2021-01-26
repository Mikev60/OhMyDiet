import React, { forwardRef, useImperativeHandle } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade } from '@material-ui/core';

const CustomModal = forwardRef((props, ref) => {
	const [open, setOpen] = React.useState(false);

	useImperativeHandle(ref, () => ({
		handleOpen() {
			setOpen(true);
		},
		handleClose() {
			setOpen(false);
		}
	}));

	const handleClose = () => {
		setOpen(false);
	}; 

	const classes = useStyles();
	return (
		<Modal
			disableEnforceFocus
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			className={classes.modal}
			open={open}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500
			}}
		>
			<Fade in={open}>
				<div className={classes.paper}>
					<h2 id="transition-modal-title">{props.title}</h2>
					<p id="transition-modal-description">{props.subTitle}</p>
					{props.children}
				</div>
			</Fade>
		</Modal>
	);
});

const useStyles = makeStyles((theme) => ({
	title: {
		flexGrow: 1
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		border: 'none'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(2, 4, 3),
		border: 'none'
	}
}));

export default CustomModal;
