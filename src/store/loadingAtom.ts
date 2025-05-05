import { atom } from 'jotai';
import { ApiRoutes } from '../constants/routes';

type LoadingMap = Record<ApiRoutes, boolean>;

const loadingAtom = atom<LoadingMap>({
    projects: false,
    configs: false,
    certifications: false,
});

const readOnlyLoadingAtom = atom((get) => get(loadingAtom));

const setLoadingValAtom = atom(
    null,
    (get, set, loadingKey: ApiRoutes, val: boolean) => {
        const loadingMap = get(loadingAtom);
        loadingMap[loadingKey] = val;
        set(loadingAtom, loadingMap);
    }
);

export { setLoadingValAtom, readOnlyLoadingAtom };
