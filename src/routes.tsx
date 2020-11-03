import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import signIn from './pages/SignIn';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/dashboard" component={signIn} />
                <Route path="/app" component={OrphanagesMap} />

                <Route path="/orphanages/create" component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;