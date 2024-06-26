import React from 'react';
import { Grow } from '@mui/material';
import LabelContainer from 'labelcontainer';

import { Download } from '@mui/icons-material';
import { generateIcons } from '../../constants/profileIcons';
import IDCard from '../IDCard';
import IDIcon from '../IDIcon/IDIcon';
import { techStackLogoArrWhite } from '../../constants/constants';
import { useTheme } from 'next-themes';

const IntroSection = () => {
    const lsInstance = LabelContainer.getInstance();
    const { systemTheme } = useTheme();
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.open(lsInstance.getLabel('url_resume'), '_blank');
    };

    let logoArr = techStackLogoArrWhite;
    if (systemTheme === 'dark') logoArr = techStackLogoArrWhite;
    return (
        <div className={'flex relative flex-column items-center'}>
            <div
                className={
                    'flex flex-1 flex-wrap lg:pt-10 md:pt-10 max-sm:pt-8 md:px-4 justify-center items-center lg:gap-24 md:gap-4 '
                }>
                <Grow in timeout={1000}>
                    <div
                        className={
                            'flex flex-column justify-between items-start lg:h-64 md:h-48 w-1/2 gap-4'
                        }>
                        <div
                            className={
                                'flex flex-column items-start text-left'
                            }>
                            <p
                                className={
                                    'lg:text-4xl md:text-2xl max-sm:text-base font-bold'
                                }>
                                {lsInstance.getLabel('title')}&nbsp;
                                <span className={'dark:text-fuchsia-500'}>
                                    Gihun, Stephen
                                </span>
                                &#128075;
                            </p>
                            <p
                                className={
                                    'lg:text-3xl md:text-xl max-sm:text-sm'
                                }>
                                {lsInstance.getLabel('title_desc')}
                            </p>
                            <p
                                className={
                                    'bg-yellow-400 lg:text-2xl md:text-lg max-sm:text-sm'
                                }>
                                {lsInstance.getLabel('title_desc2')}
                            </p>
                            <p className={'lg:text-base max-sm:text-xs'}>
                                {lsInstance.getLabel('intro_desc')}
                            </p>
                            <div className={'flex flex-row gap-2 pt-2'}>
                                {generateIcons().map((x, i) => {
                                    return <IDIcon {...x} key={i} />;
                                })}
                            </div>
                        </div>
                        <div>
                            <button
                                className={
                                    'rounded px-4 py-2 bg-gradient-to-r from-coolblue to-coolred hover:to-blue-600 shadow-lg'
                                }
                                onClick={onClick}>
                                <p
                                    className={
                                        'text-white uppercase font-bold max-sm:text-sm'
                                    }>
                                    View Resume
                                    <Download />
                                </p>
                            </button>
                        </div>
                    </div>
                </Grow>
                <IDCard />
            </div>
            <div
                className={
                    'px-8 md:top-4 max-sm:top-8 flex relative items-center flex-column max-sm:gap-1'
                }>
                <a href="https://aws.amazon.com/what-is-cloud-computing">
                    <img
                        src={`https://d0.awsstatic.com/logos/powered-by-aws${
                            systemTheme === 'dark' ? '-white' : ''
                        }.png`}
                        alt="Powered by AWS Cloud Computing"
                        className={'lg:h-14 md:h-9 max-sm:h-8'}
                    />
                </a>
                <p
                    className={
                        'text-lg md:text-base max-sm:text-sm font-semibold'
                    }>
                    -This website was built using-
                </p>
                <div
                    className={
                        'flex items-center gap-3 overflow-x-auto h-24 max-sm:h-12 lg:pb-4 md:pb-1'
                    }>
                    {logoArr.map((x, i) => {
                        const { alt, src, ...other } = x;
                        return (
                            <img
                                key={i}
                                alt={alt}
                                src={src}
                                className={'lg:h-10 md:h-8 max-sm:h-6'}
                                {...other}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default IntroSection;
