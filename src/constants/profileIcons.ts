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
            src: 'https://static-exp1.licdn.com/sc/h/akt4ae504epesldzj74dzred8',
            href: lsInstance.getLabel('url_linkedin'),
        },
        {
            src: 'https://static.npmjs.com/58a19602036db1daee0d7863c94673a4.png',
            href: lsInstance.getLabel('url_npm'),
        },
        {
            src: 'https://leetcode.com/_next/static/images/logo-ff2b712834cf26bf50a5de58ee27bcef.png',
            href: lsInstance.getLabel('url_leetcode'),
        },
    ];
};
