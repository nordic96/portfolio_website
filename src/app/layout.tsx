import React from 'react';
import { Metadata, Viewport } from 'next';
import { Noto_Sans_Display } from 'next/font/google';
import { Provider } from 'jotai';

import '../styles/globals.css';

const notoSansDisplay = Noto_Sans_Display({
    subsets: ['latin'],
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 0.85,
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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={notoSansDisplay.className}>
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
