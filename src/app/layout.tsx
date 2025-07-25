import React from 'react';
import { Metadata, Viewport } from 'next';
import { Noto_Sans_Display } from 'next/font/google';
import { Provider } from 'jotai';

import '../styles/globals.css';
import NavBar from '../components/NavBar';
import FooterComp from '../components/FooterComp';

const notoSansDisplay = Noto_Sans_Display({
    subsets: ['latin'],
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 0.82,
};

export const metadata: Metadata = {
    title: 'StephenKos Portfolio',
    description:
        "StephenKo's personal portfolio website to showcase software engineering & AI related projects",
    icons: {
        icon: '/favicon.ico',
        apple: 'logo192.png',
        shortcut: '/favicon.ico',
    },
    openGraph: {
        title: "StephenKo's Portfolio",
        description:
            "StephenKo's personal portfolio website to showcase software engineering & AI related projects",
        url: 'https://www.stephenghk.com/',
        siteName: "StephenKo's Portfolio",
    },
    twitter: {
        card: 'summary_large_image',
        title: "StephenKo's Portfolio",
        description:
            "StephenKo's personal portfolio website to showcase software engineering & AI related projects",
    },
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={notoSansDisplay.className}>
            <body>
                <Provider>
                    <NavBar />
                    <div className="App">
                        <div
                            id="page-container"
                            className={
                                'bg:white dark:bg-neutral-900 dark:text-white lg:px-16 max-sm:px-4 py-4 flex justify-center relative flex-col items-center'
                            }>
                            {children}
                        </div>
                    </div>
                    <FooterComp />
                </Provider>
            </body>
        </html>
    );
}
