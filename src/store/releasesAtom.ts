import { atom } from 'jotai';
import { constructApiRoute } from '../constants/routes';
import { Release } from '../models/release';
import { setLoadingValAtom } from './loadingAtom';

const releasesAtom = atom<Release[]>([]);
const readOnlyReleasesAtom = atom<Release[]>((get) => get(releasesAtom));

const asyncFetchReleasesAtom = atom(null, async (get, set) => {
    const route = constructApiRoute('releases');
    set(setLoadingValAtom, 'releases', true);
    const json = await fetch(route, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        if (res.status === 403) {
            set(setLoadingValAtom, 'releases', false);
        }
        return res.json();
    });

    set(releasesAtom, json.data.releases || []);
    set(setLoadingValAtom, 'releases', false);
});

export { asyncFetchReleasesAtom, readOnlyReleasesAtom };
