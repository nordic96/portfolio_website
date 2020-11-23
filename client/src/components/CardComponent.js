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
        return (
        <div className="card">
            <Rotate top left>
                <div>
                    <div className="desc-design">
                        <img className="img-design" src={this.props.medialink} alt="design"/>
                        <h3>'{this.props.name}'</h3>
                        <h4>
                            <span className="label label-designtitle">{this.props.org} ({this.props.year})</span> &nbsp;
                            {/* <span className="label label-year">{this.props.year}</span> */}
                        </h4>
                        {this.props.desc}
                    </div>
                </div>
            </Rotate>
         </div>);
    }
}