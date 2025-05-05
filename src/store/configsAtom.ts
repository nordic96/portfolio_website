import { atom } from 'jotai';
import LabelContainer from 'labelcontainer';

const configsAtom = atom<LabelContainer>(LabelContainer.getInstance());
const readonlyConfigsAtom = atom((get) => get(configsAtom));

export { readonlyConfigsAtom, configsAtom };
