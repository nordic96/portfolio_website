export const SkillCategoryArr: string[] = [
    'language',
    'appframework',
    'statemanagement',
    'cssframework',
    'cicd',
    'devtools',
] as const;
export type SkillCategory = (typeof SkillCategoryArr)[number];
