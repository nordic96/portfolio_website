import { SkillCategory } from './types';
import { IconRecord } from '../common/IcomComp/IconComp';

const SkillCatIconMap: Record<SkillCategory, keyof typeof IconRecord> = {
    language: 'Code',
    appframework: 'Settings',
    statemanagement: 'Workspace',
    devtools: 'Build',
    cicd: 'AllInclusive',
    cssframework: 'Palette',
};

export { SkillCatIconMap };
