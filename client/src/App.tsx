import React from 'react';
import { LABELS } from './constants/constants';
import LabelContainer from 'labelcontainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';

export default function App() {
    /** Setting Constant Labels */
    const labelnstance = LabelContainer.getInstance();
    labelnstance.setLabels(LABELS);
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={Home} />
            </Switch>
        </BrowserRouter>
    );
}
