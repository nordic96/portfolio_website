declare module '*.png';
declare module '*.svg';

export interface FullProjectDesc {
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
    name: string;
    medialink: string;
    organisation: string;
    year: number;
    desc: string;
}