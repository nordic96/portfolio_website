import React, { Component } from 'react';

/**
 * Footer Component for Main Page (contains footer information)
 * Author: Ko Gi Hun
 * Date: 23/Nov/2020
 */
export default class FooterComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="footer">
                <table>
                    <tr>
                        <th style={{width: "50%"}}>Contacts</th>
                        <th>About This Portolio Website</th>
                    </tr>
                    <tr>
                        <td><img className="link-icon" src="assets/email-icon.png" alt="email" />&nbsp; rhrlgns96@gmail.com</td>
                        <td>This project is built from NodeJS, ReactJS, deployed in Heroku App Server. Project information was pulled from MongoDB Server</td>
                    </tr>
                    <tr>
                        <td><img className="link-icon" src="assets/whatsapp-icon.png" alt="phone" />&nbsp; +65 8793-7248</td>
                        <td></td>
                    </tr>
                </table>
            </div>
        );
    }
}