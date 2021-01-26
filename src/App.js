//Librairies / packages
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { checkUserSession } from './redux/user/user.actions';
import { connect } from 'react-redux';
import firebase from 'firebase/app'

//material ui
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//pages - UI
import Header from './components/Header/Header.component';
import Dashboard from './pages/Dashboard/Dashboard.component';
import Login from './pages/SignInUp/Login.component';
import RecipeDetail from './pages/Recipe-Detail/Recipe-detail.component';
import Favorites from './pages/Favorites/Favorites.component'
import Cart from './pages/Cart/Cart.component'
import Plans from './pages/Plans/Plans.component'
import Welcome from './pages/Welcome/Welcome.component'

import './App.css';

class App extends React.Component {

	componentDidMount() {
		const { checkUserSession } = this.props;

		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				checkUserSession();
			}
		  });
	}

	

	render() {
		return (
			<BrowserRouter>
				<Container>
					<Header></Header>
					<Card>
						<CardContent>
							<Switch> 
								<Route path="/" exact render={()=> this.props.currentUser ? <Redirect to='/dashboard' /> : <Welcome />}/>
								<Route path="/dashboard" exact component={Dashboard} />
								<Route path="/recipe-detail/:id" component={RecipeDetail} />
								<Route path='/favorites' component={Favorites} />
								<Route path='/cart' component={Cart} />
								<Route path='/plans' component={Plans} />
							</Switch>
							{
								!this.props.currentUser ? <Redirect to='/' /> : null
							}
						</CardContent>
					</Card>
				</Container>
			</BrowserRouter>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	checkUserSession: () => dispatch(checkUserSession())
});

const mapStateToProps = state => ({
	currentUser: state.user.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
