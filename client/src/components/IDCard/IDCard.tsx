import React from 'react';

import Logo from '../../assets/images/logo.svg';
import createStyles from './styles';
import LabelContainer from 'labelcontainer';
import { Icons } from '../../constants/profileIcons';
import IDIcon from '../IDIcon/IDIcon';

const IDCard = () => {
    const classes = createStyles();
    const labelInstance = LabelContainer.getInstance();
    return (
        <div className={classes.container}>
            <div className={classes.cardContainer}>
                <div className="id-black">
                    <img src={Logo} className="App-logo" alt="logo" />
                </div>
                <div className="id-maroon"></div>
                <div className="id-skyblue"></div>
                <div className="id-content">
                    <b>NUS Computer Science</b>
                    <br />
                    <img
                        className="intro-selfie"
                        src="assets/selfie_2.png"
                        alt="profile"
                    />
                    <br />
                    <b>GI HUN KO</b>
                    <br />
                    <b>Software Engineer, Singapore</b>
                    <br />
                    <img
                        className="id-barcode"
                        src="assets/barcode.png"
                        alt="barcode"
                    />
                </div>
                <div className="id-skyblue"></div>
                <div className="id-maroon"></div>
                <div className="id-black"></div>
            </div>
        </div>
    );
};

export default React.memo(IDCard);
