import React, { Component } from 'react';

/**
 * Footer Component for Main Page (contains footer information)
 * Author: Ko Gi Hun
 * Date: 23/Nov/2020
 */
export default class FooterComponent extends Component {
    render() {
        return(
            <div className="footer">
                <table>
                    <tbody>
                        <tr style={{ textAlign: 'left'}}>
                            <th style={{width: "50%"}}>Contacts</th>
                            <th>About This Portolio Website</th>
                        </tr>
                        <tr>
                            <td><img className="contact-icon" src="assets/email-icon.png" alt="email" />&nbsp; rhrlgns96@gmail.com (personal), e0318604@u.nus.edu (school)</td>
                            <td rowSpan="2">This project was built using NodeJS, ReactJS, deployed in Heroku App Server. Project information was pulled from MongoDB Server</td>
                        </tr>
                        <tr>
                            <td><img className="contact-icon" src="assets/whatsapp-icon.png" alt="phone" />&nbsp; +65 8793-7248</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}