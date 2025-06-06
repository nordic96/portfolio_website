import { atom } from 'jotai';

export type LoadingState = 'projects' | 'certificates' | 'configs' | 'skills';
type LoadingMap = Record<LoadingState, boolean>;

const loadingAtom = atom<LoadingMap>({
    projects: false,
    configs: false,
    certificates: false,
    skills: false,
});

const readOnlyLoadingAtom = atom((get) => get(loadingAtom));

const setLoadingValAtom = atom(
    null,
    (get, set, loadingKey: LoadingState, val: boolean) => {
        const loadingMap = get(loadingAtom);
        loadingMap[loadingKey] = val;
        const newLoadingMap = Object.assign({}, loadingMap);
        set(loadingAtom, newLoadingMap);
    }
);

export { setLoadingValAtom, readOnlyLoadingAtom };
