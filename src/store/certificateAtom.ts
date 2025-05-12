import { atom } from 'jotai';
import { constructApiRoute } from '../constants/routes';
import { setLoadingValAtom } from './loadingAtom';
import { ICertificate } from '../models/Certificate';

const CertificateAtom = atom<ICertificate[]>([]);
const readonlyCertificateAtom = atom((get) => get(CertificateAtom));

const FETCH_QUERY = `{
    certificates {
        id
        name
        credentials_url
        year_obtained
        theme_color
        logo_src
    }
}`;

const asyncFetchCertificateAtom = atom(null, async (get, set) => {
    const route = constructApiRoute('graphql');
    set(setLoadingValAtom, 'certificates', true);
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
    set(CertificateAtom, json.data.certificates || []);
    set(setLoadingValAtom, 'certificates', false);
});

export { readonlyCertificateAtom, asyncFetchCertificateAtom };
