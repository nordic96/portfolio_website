import { atom } from 'jotai';
import { ISkill } from '../models/skill/Skill';
import { setLoadingValAtom } from './loadingAtom';
import { constructApiRoute } from '../constants/routes';
import { SkillCategory } from '../components/SkillsContainer/types';

type Skills = Record<SkillCategory, ISkill[]>;
const skillsAtom = atom<Skills>({
    language: [],
    appframework: [],
    cssframework: [],
    cicd: [],
    devtools: [],
});
const readOnlySkillsAtom = atom<Skills>((get) => get(skillsAtom));

function constructQuery(category: SkillCategory) {
    return `{
        skillsByCategory(category: "${category}") {
            id
            name
            source {
                imgSrc
                pageUrl
                className
            }
            category
            proficiency
        }
    }`;
}

const asyncFetchSkillsByCategory = atom(
    null,
    async (get, set, category: SkillCategory) => {
        set(setLoadingValAtom, 'skills', true);
        const route = constructApiRoute('graphql');
        const json = await fetch(route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: constructQuery(category),
            }),
        }).then((res) => {
            return res.json();
        });
        const old = get(skillsAtom);
        old[category] = json.data.skillsByCategory || [];
        const newSkills = Object.assign({}, old);
        set(skillsAtom, newSkills);
        set(setLoadingValAtom, 'skills', false);
    }
);

export { asyncFetchSkillsByCategory, readOnlySkillsAtom };
