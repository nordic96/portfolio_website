import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import React, { Suspense, lazy } from 'react';

export const IconRecord: Record<
    string,
    React.LazyExoticComponent<
        OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
            muiName: string;
        }
    >
> = {
    Description: lazy(() =>
        import('@mui/icons-material/Description').then((mod) => ({
            default: mod.default,
        }))
    ),
    Workspace: lazy(() =>
        import('@mui/icons-material/Workspaces').then((mod) => ({
            default: mod.default,
        }))
    ),
    Code: lazy(() =>
        import('@mui/icons-material/Code').then((mod) => ({
            default: mod.default,
        }))
    ),
    Settings: lazy(() => import('@mui/icons-material/Settings')),
    Build: lazy(() =>
        import('@mui/icons-material/Build').then((mod) => ({
            default: mod.default,
        }))
    ),
    AllInclusive: lazy(() =>
        import('@mui/icons-material/AllInclusive').then((mod) => ({
            default: mod.default,
        }))
    ),
    Palette: lazy(() =>
        import('@mui/icons-material/Palette').then((mod) => ({
            default: mod.default,
        }))
    ),
    EmojiObjects: lazy(() =>
        import('@mui/icons-material/EmojiObjects').then((mod) => ({
            default: mod.default,
        }))
    ),
    LocalOffer: lazy(() =>
        import('@mui/icons-material/LocalOffer').then((mod) => ({
            default: mod.default,
        }))
    ),
    Publish: lazy(() =>
        import('@mui/icons-material/Publish').then((mod) => ({
            default: mod.default,
        }))
    ),
};

interface IconProps {
    icon: keyof typeof IconRecord;
}

const IconComp: React.FC<IconProps> = ({ icon }) => {
    const Icon = IconRecord[icon];
    if (Icon) {
        return (
            <Suspense fallback={null}>
                <Icon />
            </Suspense>
        );
    }
    return null;
};

export default IconComp;
