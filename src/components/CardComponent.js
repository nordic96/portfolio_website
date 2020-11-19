import React, {Component} from 'react';

export default class CardComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const element = (<div>Text from Element</div>);
        return (<div className="conptext">
            <h3>First Component</h3>
                {this.props.displaytext}
                {element}
            </div>);
    }
}