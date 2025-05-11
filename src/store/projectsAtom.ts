import { atom } from 'jotai';
import { setLoadingValAtom } from './loadingAtom';
import { constructApiRoute } from '../constants/routes';
import { IProject } from '../models/projects';

const projectsAtom = atom<IProject[]>([]);
const readonlyProjectsAtom = atom<IProject[]>((get) => get(projectsAtom));

const asyncFetchProjectsAtom = atom(null, async (get, set) => {
    set(setLoadingValAtom, 'projects', true);
    const route = constructApiRoute('projects');
    const json = await fetch(route).then((res) => {
        return res.json();
    });
    set(projectsAtom, (json.data as IProject[]) || []);
    set(setLoadingValAtom, 'projects', false);
});

export { readonlyProjectsAtom, asyncFetchProjectsAtom };
