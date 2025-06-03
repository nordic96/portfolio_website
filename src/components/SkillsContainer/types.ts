export const SkillCategoryArr: string[] = [
    'language',
    'appframework',
    'devtools',
    'cicd',
    'cssframework',
] as const;
export type SkillCategory = (typeof SkillCategoryArr)[number];
