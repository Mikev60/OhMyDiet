import React from 'react'
import { connect } from 'react-redux'
import RecipeOverview from '../../components/Recipe-overview/Recipe-overview.component'

//material ui
import { Box } from '@material-ui/core'

const FavoritesPage = ({ userFavorites }) => {
    return (
        <React.Fragment>
            <Box display="flex" justifyContent="center" flexWrap="wrap">
            {
                userFavorites.length === 0 ? <p> No favorites </p> : userFavorites.map(favorite => {
                    return <RecipeOverview key={favorite.id} recipe={favorite} />;
                })
            }
            </Box>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    userFavorites: state.user.favorites
})

export default connect(mapStateToProps)(FavoritesPage);