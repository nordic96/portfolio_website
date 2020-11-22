import React, { Component } from 'react';
import Rotate from 'react-reveal/Rotate';

export default class CardComponent extends Component {
    /**
     * Creates a card component that will display each project
     * 
     * @param {displaytext} description of the project
     * @param {medialink} media for project display
     * @param {name} name of the project
     * @param {devyear} date of development
     */
    render() {
        const element = (<div>Text from Element</div>);
        return (
        <div className="card">
            <Rotate top left>
                <div>
                    {/* <img className="imgproj" src='assets/temppi.png'/> */}
                    <h3>First Component</h3>                    
                    {this.props.displaytext}
                    {element}
                </div>
            </Rotate>
         </div>);
    }
}