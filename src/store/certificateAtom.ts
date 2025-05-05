import { atom } from 'jotai';
import { ICertificate } from '../models/certification';
import { constructApiRoute } from '../constants/routes';
import { setLoadingValAtom } from './loadingAtom';

const CertificateAtom = atom<ICertificate[]>([]);
const readonlyCertificateAtom = atom((get) => get(CertificateAtom));

const asyncFetchCertificateAtom = atom(null, async (get, set) => {
    const route = constructApiRoute('certifications');
    set(setLoadingValAtom, 'certifications', true);
    const json = await fetch(route).then((res) => {
        return res.json();
    });
    set(CertificateAtom, json.data || []);
    set(setLoadingValAtom, 'certifications', false);
});

export { readonlyCertificateAtom, asyncFetchCertificateAtom };
