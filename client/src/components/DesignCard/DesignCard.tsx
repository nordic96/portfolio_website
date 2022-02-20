import React from 'react';
import { Card } from 'react-bootstrap';
import { FullDesignDesc } from '../../globals';

/**
 * Creates a card component that will display each Design Project
 *
 * @param {displaytext} description of the project
 * @param {medialink} media for project display
 * @param {name} name of the project
 * @param {devyear} date of development
 */
interface DesignCardProps {
    designProject: FullDesignDesc;
}

const DesignCard = (props: DesignCardProps) => {
    const { designProject } = props;
    const { medialink, name, organisation, year, desc } = designProject;
    return (
        <Card>
            <Card.Img
                variant="top"
                src={'https://lh3.googleusercontent.com/' + medialink}
                className="img-design-card"
                alt="design"
            />
            <Card.Body>
                <Card.Title>
                    <h3>
                        <b>{name}</b>
                    </h3>
                </Card.Title>
                <Card.Text></Card.Text>
                <div className="desc">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <b>Organisation: </b>
                                    {organisation}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Year: </b>
                                    {year}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Card.Text>{desc}</Card.Text>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card.Body>
        </Card>
    );
};

export default DesignCard;
