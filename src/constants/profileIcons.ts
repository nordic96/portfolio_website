import LabelContainer from 'labelcontainer';
import { IDIconProps } from '../components/IDIcon/IDIcon';

export const generateIcons = (): IDIconProps[] => {
    const lsInstance = LabelContainer.getInstance();
    return [
        {
            src: 'https://github.githubassets.com/favicons/favicon.svg',
            href: lsInstance.getLabel('url_github'),
        },
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/8/80/LinkedIn_Logo_2013.svg',
            href: lsInstance.getLabel('url_linkedin'),
        },
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg',
            href: lsInstance.getLabel('url_npm'),
        },
        {
            src: 'https://leetcode.com/_next/static/images/logo-ff2b712834cf26bf50a5de58ee27bcef.png',
            href: lsInstance.getLabel('url_leetcode'),
        },
    ];
};

export const generateCertificateIcons = (): IDIconProps[] => {
    return [
        {
            spanClassName: 'motion-reduce',
            className: 'cert-icon',
            src: 'https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
            href: 'https://www.credly.com/badges/5a00ab1a-d116-4fe6-aad8-52105d3b0603',
        },
        {
            spanClassName: 'motion-reduce',
            className: 'cert-icon',
            src: 'https://images.credly.com/size/340x340/images/1e6611ca-8afe-4ecc-ad4d-305fba52ee7e/1_LFCS-600x600.png',
            href: 'https://www.credly.com/badges/4176e5cc-c892-4af0-b4da-59c056bb5aa6',
        },
    ];
};
