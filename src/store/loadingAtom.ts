import { atom } from 'jotai';

type LoadingKey = 'projects' | 'configs';

type LoadingMap = Record<LoadingKey, boolean>;

const loadingAtom = atom<LoadingMap>({
    projects: false,
    configs: false,
});

const readOnlyLoadingAtom = atom((get) => get(loadingAtom));

const setLoadingValAtom = atom(
    null,
    (get, set, loadingKey: LoadingKey, val: boolean) => {
        const loadingMap = get(loadingAtom);
        loadingMap[loadingKey] = val;
        set(loadingAtom, loadingMap);
    }
);

export { setLoadingValAtom, readOnlyLoadingAtom };
