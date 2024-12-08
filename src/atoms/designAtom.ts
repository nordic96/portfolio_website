import { atom } from 'jotai';
import { DesignApiResponse } from '../globals';

//immutable atom
const designAtom = atom<DesignApiResponse>();
const isDesignLoadingAtom = atom<boolean>(false);

const readOnlyDesignAtomn = atom<
    DesignApiResponse | Promise<DesignApiResponse> | undefined
>((get) => get(designAtom));
const readOnlyIsDesignLoadingAtom = atom((get) => get(isDesignLoadingAtom));
const readOnlyIsDesignLoadedAtom = atom<boolean>((get) => {
    const resp = get(designAtom);
    return resp !== undefined && resp.length > 0;
});

const asyncWriteDesignAtom = atom(null, async (_get, set) => {
    set(isDesignLoadingAtom, true);
    await fetch('/api/designs') //TODO: move to enums for api endpoints
        .then((res) => res.json())
        .then(
            (json) => {
                const { designs } = json;
                if (designs) {
                    set(designAtom, designs as DesignApiResponse);
                }
            },
            (ex) => {
                console.error('Fetch failed, ', ex);
            }
        )
        .finally(() => {
            set(isDesignLoadingAtom, false);
        });
});

export {
    readOnlyDesignAtomn,
    readOnlyIsDesignLoadingAtom,
    readOnlyIsDesignLoadedAtom,
    asyncWriteDesignAtom,
};
