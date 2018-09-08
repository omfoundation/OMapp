import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { logOut } from '../actions'

import { connect } from 'react-redux'

import {Grid, Button} from 'semantic-ui-react'

export class Home extends Component {

    render() {
        
        let { view, userInfo } = this.props
       
        return (
            <Grid verticalAlign='middle'  textAlign='center'>
                <Grid.Row centered>
                    <Grid.Column computer={6} mobile={14} tablet={10} textAlign='center'>
                        <img src={/*userInfo.profilePhotoURL || */ this.props.defaultProfilePhotoURL } height='250px' alt='user' />
                        <p>
                            Hola {"TESTER" || userInfo.username}
                            <br />
                            <strong>Correo: </strong> {"{email}" || userInfo.email  }
                        </p>
                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {

    const { home, root} = state
    const { xxx } = home
    const { userInfo, view } = root

    return {
        view, userInfo
    }
} 

Home.propTypes = {
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Home)