import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import useAuth from './contexts/auth';

import Spinner from './components/Spinner';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import OrphanagesMap from './pages/OrphanagesMap';
import CreateOrphanage from './pages/CreateOrphanage';
import Orphanage from './pages/Orphanage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function Routes() {
    const { loading, signed }= useAuth();

    if (loading) {
        return <Spinner />
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/dashboard" component={ signed ? Dashboard : SignIn } />
                <Route path="/app" component={OrphanagesMap} />
                <Route path="/orphanages/create" component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />

                <Route path="/forgot_password"   component={ForgotPassword} />
                <Route path="/reset_password/:token"   component={ResetPassword} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;