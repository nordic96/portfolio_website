import { SkillSectionProps } from './SkillsContainer';

const SKILLSECTIONS: SkillSectionProps[] = [
    {
        sectionTitle: 'Most Confident Language',
        logos: [
            {
                className: 'animate-floating h-10',
                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/1280px-Typescript.svg.png',
                alt: 'tslogo',
            },
            {
                className: 'animate-floating h-10',
                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png',
                alt: 'jslogo',
            },
        ],
    },
    {
        sectionTitle: 'Most Experieced WebApp Frameworks',
        logos: [
            {
                className: 'animate-floating h-7',
                src: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg',
                alt: 'nextjslogo',
            },
            {
                className: 'animate-floating h-12',
                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Spring_Boot.svg/512px-Spring_Boot.svg.png',
                alt: 'springbootlogo',
            },
            {
                className: 'animate-floating h-12',
                src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
                alt: 'reactlogo',
            },
            {
                className: 'animate-floating h-12',
                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/512px-Sass_Logo_Color.svg.png',
                alt: 'sasslogo',
            },
            {
                className: 'animate-floating h-10',
                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2094px-Tailwind_CSS_Logo.svg.png',
                alt: 'tailwindlogo',
            },
            {
                className: 'animate-floating h-14',
                src: 'https://cdn.candycode.com/jotai/jotai-mascot.png',
                alt: 'jotailogo',
            },
        ],
    },
    {
        sectionTitle: 'Experienced CI/CD Pipeline Tools',
        logos: [
            {
                className: 'animate-floating h-16',
                src: 'https://mirror.twds.com.tw/jenkins/art/jenkins-logo/256x256/logo.png',
                alt: 'jenkinslogo',
            },
            {
                className: 'animate-floating h-16',
                src: 'https://raw.githubusercontent.com/devicons/devicon/ca28c779441053191ff11710fe24a9e6c23690d6/icons/bitbucket/bitbucket-original-wordmark.svg',
                alt: 'bitbucketlogo',
            },
            {
                className: 'animate-floating h-12',
                src: 'assets/images/aws_lambda.svg',
                alt: 'awslambdalogo',
            },
            {
                className: 'animate-floating h-12',
                src: 'assets/images/aws_codebuild.svg',
                alt: 'codebuildlogo',
            },
            {
                className: 'animate-floating h-12',
                src: 'assets/images/docker-mark-blue.svg',
                alt: 'dockerlogo',
            },
        ],
    },
    {
        sectionTitle: 'Experienced Monitoring Tools',
        logos: [
            {
                className: 'animate-floating h-16',
                src: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Splunk-Logo.jpg',
                alt: 'splunklogo',
            },
        ],
    },
];

export { SKILLSECTIONS };
