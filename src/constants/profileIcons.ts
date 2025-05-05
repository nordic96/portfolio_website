import LabelContainer from 'labelcontainer';
import { IDIconProps } from '../components/IDIcon/IDIcon';

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
