import React from 'react';

import Logo from '../../assets/images/logo.svg';
import createStyles from './styles';
import LabelContainer from 'labelcontainer';
import { Icons } from '../../constants/profileIcons';
import IDIcon from '../IDIcon/IDIcon';
import { Typography } from '@mui/material';

const IDCard = () => {
    const classes = createStyles();
    const labelInstance = LabelContainer.getInstance();
    return (
        <div>
            <div className="id-card">
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
                    {Icons.map((x, i) => {
                        return <IDIcon {...x} key={i} />;
                    })}
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
            <div className={classes.container}>
                <Typography className={classes.introTitle}>
                    {labelInstance.getLabel('title')}
                </Typography>
                <Typography className={classes.introLabel}>
                    {labelInstance.getLabel('card_intro_1')}
                </Typography>
                <Typography className={classes.introLabel}>
                    {labelInstance.getLabel('card_intro_2')}
                </Typography>
            </div>
        </div>
    );
};

export default React.memo(IDCard);
