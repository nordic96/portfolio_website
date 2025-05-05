'use client';
import React, { useEffect } from 'react';
import CertBadge from './components/CertBadge';
import { useAtom } from 'jotai';
import { asyncFetchCertificateAtom, readonlyCertificateAtom } from '../../store/certificateAtom';

const CertificateContainer = () => {
    const [,fetchCertificates] = useAtom(asyncFetchCertificateAtom);
    const [certificates] = useAtom(readonlyCertificateAtom);

    useEffect(() => {
        fetchCertificates();
    }, []);

    return(
        <div className="flex flex-row gap-2 h-auto">
            {certificates.map((x, i) => {
                return <CertBadge {...x} key={i} />;
            })}
        </div>
    );
};

export default CertificateContainer;

