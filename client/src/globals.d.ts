declare module '*.png';
declare module '*.svg';

export interface FullProjectDesc {
    key: number;
    projecttype: string;
    name: string;
    devyear: number;
    videolink: string;
    projectlink: string;
    medialink: string;
    tags: string[];
    desc: string;
}

export interface FullDesignDesc {
    key: number;
    name: string;
    medialink: string;
    organisation: string;
    year: number;
    desc: string;
}