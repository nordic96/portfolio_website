import { CircularProgress } from '@mui/material';
import React from 'react';

function Loading() {
    return (
        <div className={'flex flex-col py-24 items-center min-h-[100vh]'}>
            <CircularProgress size={'4rem'} />
            <label className={'lg:text-lg max-sm:text-md'}>Loading...</label>
        </div>
    );
}

export default Loading;
