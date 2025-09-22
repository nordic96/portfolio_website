import { atom } from 'jotai';
import { setLoadingValAtom } from './loadingAtom';
import { constructApiRoute } from '../constants/routes';
import { IProject } from '../models/project/Project';

const projectsAtom = atom<IProject[]>([]);
const readonlyProjectsAtom = atom<IProject[]>((get) => get(projectsAtom));

const FETCH_QUERY = `{
    projects(orderBy: { year: DESC }) {
        id
        name
        devyear
        videolink
        projectlink
        medialink
        tags
        desc
    }
}`;

const asyncFetchProjectsAtom = atom(null, async (get, set) => {
    set(setLoadingValAtom, 'projects', true);
    const route = constructApiRoute('graphql');
    const json = await fetch(route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: FETCH_QUERY,
        }),
    }).then((res) => {
        return res.json();
    });
    set(projectsAtom, (json.data.projects as IProject[]) || []);
    set(setLoadingValAtom, 'projects', false);
});

export { readonlyProjectsAtom, asyncFetchProjectsAtom };
