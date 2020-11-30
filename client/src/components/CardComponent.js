import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

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
            <Card>
                <Card.Img variant="top" src={'https://drive.google.com/uc?id=' + this.props.medialink} className="img-design-card" alt="design" />
                <Card.Body>
                    <Card.Title><h3><b>{this.props.name}</b></h3></Card.Title>
                    <Card.Text>
                        <div className="desc">
                            <table>
                                <tr>
                                    <td>
                                        <b>Organisation: </b>
                                        {this.props.org}
                                        <b>Year: </b>
                                        {this.props.year}
                                    </td>
                                </tr>
                                <tr>
                                    <td>{this.props.desc}</td>
                                </tr>
                            </table>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}