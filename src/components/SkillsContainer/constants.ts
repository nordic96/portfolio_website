import { SkillSectionProps } from './SkillSection/SkillSection';
import { SkillCategory } from './types';
import { IconRecord } from '../common/IcomComp/IconComp';

const SkillCatIconMap: Record<SkillCategory, keyof typeof IconRecord> = {
    language: 'Code',
    appframework: 'Settings',
    devtools: 'Build',
    cicd: 'AllInclusive',
    cssframework: 'Palette',
};

const generateSkillSections = (isDark?: boolean): SkillSectionProps[] => {
    return [
        {
            category: 'language',
            logos: [
                {
                    className: 'animate-floating h-12 max-sm:h-10',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/1280px-Typescript.svg.png',
                    alt: 'tslogo',
                },
                {
                    className: 'animate-floating h-12 max-sm:h-10',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png',
                    alt: 'jslogo',
                },
                {
                    className: 'animate-floating h-20 max-sm:h-14',
                    src: 'assets/images/logos/java_logo.svg',
                    alt: 'javalogo',
                },
            ],
        },
        {
            category: 'appframework',
            logos: [
                {
                    className: 'animate-floating h-7 max-sm:h-5',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg',
                    alt: 'nextjslogo',
                },
                {
                    className: 'animate-floating h-12 max-sm:h-10',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Spring_Boot.svg/512px-Spring_Boot.svg.png',
                    alt: 'springbootlogo',
                },
                {
                    className: 'animate-floating h-12 max-sm:h-10',
                    src: 'https://nodejs.org/static/logos/jsIconGreen.svg',
                    alt: 'nodejslogo',
                },
                {
                    className: 'animate-floating h-12 max-sm:h-10',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
                    alt: 'reactlogo',
                },
                {
                    className: 'animate-floating h-14 max-sm:h-10',
                    src: 'https://cdn.candycode.com/jotai/jotai-mascot.png',
                    alt: 'jotailogo',
                },
            ],
        },
        {
            category: 'cssframework',
            logos: [
                {
                    className: 'animate-floating h-12 max-sm:h-10',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/512px-Sass_Logo_Color.svg.png',
                    alt: 'sasslogo',
                },
                {
                    className: 'animate-floating h-10 max-sm:h-8',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2094px-Tailwind_CSS_Logo.svg.png',
                    alt: 'tailwindlogo',
                },
            ],
        },
        {
            category: 'cicd',
            logos: [
                {
                    className: 'animate-floating h-10 max-sm:h-9',
                    src: 'assets/images/logos/aws_logo.svg',
                    alt: 'awslogo',
                },
                {
                    className: 'animate-floating h-16 max-sm:h-12',
                    src: 'https://mirror.twds.com.tw/jenkins/art/jenkins-logo/256x256/logo.png',
                    alt: 'jenkinslogo',
                },
                {
                    className: 'animate-floating h-16 max-sm:h-12',
                    src: 'https://raw.githubusercontent.com/devicons/devicon/ca28c779441053191ff11710fe24a9e6c23690d6/icons/bitbucket/bitbucket-original-wordmark.svg',
                    alt: 'bitbucketlogo',
                },
                {
                    className: 'animate-floating h-12 max-sm:h-10',
                    src: 'assets/images/logos/docker-mark-blue.svg',
                    alt: 'dockerlogo',
                },
                {
                    className: 'animate-floating h-12 max-sm:h-10',
                    src: isDark
                        ? 'assets/images/logos/logo-light_Jira_logo_inverse_RGB.svg'
                        : 'assets/images/logos/logo-light_Jira_logo_brand_RGB.svg',
                    alt: 'jiralogo',
                },
                {
                    className: 'animate-floating h-12 max-sm:h-10',
                    src: isDark
                        ? 'assets/images/logos/logo-splunk-acc-rgb-w.png'
                        : 'assets/images/logos/logo-splunk-acc-rgb-k.png',
                    alt: 'splunklogo',
                },
            ],
        },
        {
            category: 'devtools',
            logos: [
                {
                    className: 'animate-floating h-12 max-sm:h-10',
                    src: isDark
                        ? 'assets/images/logos/Cypress_Logomark_White-Color.svg'
                        : 'assets/images/logos/Cypress_Logomark_Dark-Color.svg',
                    alt: 'cypress',
                },
                {
                    className: 'animate-floating h-12 max-sm:h-10',
                    src: 'assets/images/logos/storybook_logo.svg',
                    alt: 'storybook',
                },
                {
                    className: 'animate-floating h-12 max-sm:h-11',
                    src: 'assets/images/logos/webpack_logo.svg',
                    alt: 'webpacklogo',
                },
                {
                    className: 'animate-floating h-12 max-sm:h-10',
                    src: 'assets/images/logos/jest_logo.svg',
                    alt: 'jestlogo',
                },
                {
                    className: 'animate-floating h-10 max-sm:h-10',
                    src: 'assets/images/logos/eslint-logo.svg',
                    alt: 'eslintlogo',
                },
                {
                    className: 'animate-floating h-12 max-sm:h-10',
                    src: 'assets/images/logos/vimlogo.svg',
                    alt: 'vim',
                },
            ],
        },
    ];
};

export { generateSkillSections, SkillCatIconMap };
