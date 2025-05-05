import { atom } from 'jotai';
import { FullProjectDesc } from '../globals';
import { setLoadingValAtom } from './loadingAtom';

const projectsAtom = atom<FullProjectDesc[]>([]);
const readonlyProjectsAtom = atom<FullProjectDesc[]>((get) =>
    get(projectsAtom)
);

const asyncFetchProjectsAtom = atom(null, async (get, set) => {
    set(setLoadingValAtom, 'projects', true);
    const json = await fetch('/api/projects').then((res) => {
        return res.json();
    });
    set(setLoadingValAtom, 'projects', false);
    set(projectsAtom, json.projects);
});

export { readonlyProjectsAtom, asyncFetchProjectsAtom };
