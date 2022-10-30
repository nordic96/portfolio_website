/* eslint-disable react/prop-types */
import React from 'react';

import LabelContainer from 'labelcontainer';
import { LABELS } from '../constants/constants';

import '../styles/globals.css';
import Head from 'next/Head';
import NavBar from '../components/NavBar';
import FooterComp from '../components/FooterComp';
import CssBaseline from '@mui/material/CssBaseline';

import reportWebVitals from '../reportWebVitals';

/** Setting Constant Labels */
const labelnstance = LabelContainer.getInstance();
labelnstance.setLabels(LABELS);

// eslint-disable-next-line react/prop-types
export default function MyApp({ Component, pageProps }) {
    return (
        <div className={'App'}>
            <Head>
                <title>Gi Hun&apos;s Portfolio</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="#000000" />
                <meta name="title" content="Gi Hun's Portfolio" />
                <meta
                    name="description"
                    content="Portfolio website of my school projects, as well as self-sourced projects hosted in GitHub and visual design works."
                />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://metatags.io/" />
                <meta property="og:title" content="Gi Hun's Portfolio" />
                <meta
                    property="og:description"
                    content="Portfolio website of my school projects, as well as self-sourced projects hosted in GitHub and visual design works."
                />
                <meta
                    property="og:image"
                    content="https://infinite-bastion-31173.herokuapp.com/assets/thumbnail.png"
                />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://metatags.io/" />
                <meta
                    property="twitter:title"
                    content="Gi Hun's Portfolio Website"
                />
                <meta
                    property="twitter:description"
                    content="Portfolio website of my school projects, as well as self-sourced projects hosted in GitHub and visual design works."
                />
                <meta
                    property="twitter:image"
                    content="https://infinite-bastion-31173.herokuapp.com/assets/thumbnail.png"
                />
            </Head>
            <CssBaseline />
            <NavBar />
            <Component {...pageProps} />
            <FooterComp />
        </div>
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
