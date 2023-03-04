import React from 'react';

import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import FooterComp from '../components/FooterComp';
import CssBaseline from '@mui/material/CssBaseline';

import reportWebVitals from '../reportWebVitals';
import { AppProps } from 'next/dist/shared/lib/router/router';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className={'App'}>
            <Head>
                <title>StephenKo&apos;s Portfolio</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="#000000" />
                <meta name="title" content="StephenKo's Portfolio" />
                <meta
                    name="description"
                    content="StephenKo's personal portfolio website to showcase software engineering & AI related projects"
                />
                {/** OpenGraph Meta Data */}
                <meta property="og:title" content="StephenKo's Portfolio" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://www.stephenkportfolio.com/"
                />
                <meta
                    property="og:description"
                    content="StephenKo's personal portfolio website to showcase software engineering & AI related projects"
                />
                <meta
                    property="og:image"
                    content="https://master.dmw61j7mp1m3g.amplifyapp.com/assets/thumbnail.png"
                />
                {/* Twitter Meta Data */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://metatags.io/" />
                <meta
                    property="twitter:title"
                    content="StephenKo's Portfolio"
                />
                <meta
                    property="twitter:description"
                    content="StephenKo's personal portfolio website to showcase software engineering & AI related projects"
                />
                <meta
                    property="twitter:image"
                    content="https://master.dmw61j7mp1m3g.amplifyapp.com/assets/thumbnail.png"
                />
            </Head>
            <CssBaseline />
            <ThemeProvider attribute={'class'}>
                <NavBar />
                <Component {...pageProps} />
                <FooterComp />
            </ThemeProvider>
        </div>
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
