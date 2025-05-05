import { atom } from 'jotai';
import { ICertificate } from '../models/certification';
import { constructApiRoute } from '../constants/routes';

const CertificateAtom = atom<ICertificate[]>([]);
const readonlyCertificateAtom = atom((get) => get(CertificateAtom));

const asyncFetchCertificateAtom = atom(null, async (get, set) => {
    const route = constructApiRoute('certifications');
    const json = await fetch(route).then((res) => {
        return res.json();
    });
    set(CertificateAtom, json.data || []);
});

export { readonlyCertificateAtom, asyncFetchCertificateAtom };
