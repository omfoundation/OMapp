import React, { Component } from 'react';

import {Grid} from 'semantic-ui-react';

export default class Home extends Component {

    render() {
        return (
            <Grid verticalAlign='middle'  textAlign='center'>
                <Grid.Row centered>
                    <Grid.Column computer={6} mobile={14} tablet={10} textAlign='center'>
                        <img src={this.props.user.profilePhotoURL || this.props.defaultProfilePhotoURL} height='100' alt='user' />
                        <p>
                            Hola {this.props.user.username}
                            <br />
                            <strong>Correo: </strong> {this.props.user.email}
                        </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}