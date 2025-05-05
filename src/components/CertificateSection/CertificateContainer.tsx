'use client';
import React, { useEffect } from 'react';
import CertBadge from './components/CertBadge';
import { useAtom } from 'jotai';
import {
    asyncFetchCertificateAtom,
    readonlyCertificateAtom,
} from '../../store/certificateAtom';
import { readOnlyLoadingAtom } from '../../store/loadingAtom';
import withLoadingSkeleton from '../../utils/withLoadingSkeleton';
import LoadingSkeleton from './components/LoadingSkeleton';

const CertificateContainer = () => {
    const [, fetchCertificates] = useAtom(asyncFetchCertificateAtom);
    const [certificates] = useAtom(readonlyCertificateAtom);
    const [loading] = useAtom(readOnlyLoadingAtom);

    useEffect(() => {
        fetchCertificates();
    }, []);

    return (
        <div className="flex flex-row gap-2 h-auto">
            {(loading['certifications'] || certificates.length <= 0) &&
                withLoadingSkeleton(LoadingSkeleton)(3)}
            {certificates.map((x, i) => {
                return <CertBadge {...x} key={i} />;
            })}
        </div>
    );
};

export default CertificateContainer;
