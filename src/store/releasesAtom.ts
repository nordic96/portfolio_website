import { atom } from 'jotai';
import { constructApiRoute } from '../constants/routes';
import { Release } from '../models/release';
import { setLoadingValAtom } from './loadingAtom';

const releasesAtom = atom<Release[]>([]);
const readOnlyReleasesAtom = atom<Release[]>((get) => get(releasesAtom));

const asyncFetchReleasesAtom = atom(null, async (get, set) => {
    const route = constructApiRoute('releases');
    set(setLoadingValAtom, 'releases', true);
    const json = await fetch(route).then((res) => res.json());

    set(releasesAtom, json.data.releases || []);
    set(setLoadingValAtom, 'releases', false);
});

export { asyncFetchReleasesAtom, readOnlyReleasesAtom };
