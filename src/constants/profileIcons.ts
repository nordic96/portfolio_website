import LabelContainer from 'labelcontainer';
import { IDIconProps } from '../components/IDIcon/IDIcon';
import { CertBadgeProps } from '../components/CertBadge/CertBadge';

export const generateIcons = (isDark?: boolean): IDIconProps[] => {
    const lsInstance = LabelContainer.getInstance();
    return [
        {
            src: isDark
                ? 'assets/images/logos/GitHub_Invertocat_Light.svg'
                : 'https://github.githubassets.com/favicons/favicon.svg',
            href: lsInstance.getLabel('url_github'),
        },
        {
            src: isDark
                ? 'assets/images/logos/InBug-White.png'
                : 'assets/images/logos/linkedin_logo.png',
            href: lsInstance.getLabel('url_linkedin'),
        },
        {
            src: isDark
                ? 'https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png'
                : 'https://leetcode.com/_next/static/images/logo-ff2b712834cf26bf50a5de58ee27bcef.png',
            href: lsInstance.getLabel('url_leetcode'),
        },
    ];
};

export const generateCertificateIcons = (): CertBadgeProps[] => {
    return [
        {
            title: 'AWS Solutions Architect',
            desc: '2023',
            spanClassName: 'motion-reduce',
            src: 'https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
            href: 'https://www.credly.com/badges/5a00ab1a-d116-4fe6-aad8-52105d3b0603',
        },
        {
            title: 'LFCS Linux SysAdmin',
            desc: '2025',
            spanClassName: 'motion-reduce',
            src: 'https://images.credly.com/size/340x340/images/1e6611ca-8afe-4ecc-ad4d-305fba52ee7e/1_LFCS-600x600.png',
            href: 'https://www.credly.com/badges/4176e5cc-c892-4af0-b4da-59c056bb5aa6',
        },
    ];
};
