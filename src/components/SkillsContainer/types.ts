export const SkillCategoryArr: string[] = [
    'language',
    'appframework',
    'cssframework',
    'cicd',
    'devtools',
] as const;
export type SkillCategory = (typeof SkillCategoryArr)[number];
