import React, { Suspense } from 'react';

function withSuspense<P extends {}>(
    Comp: React.ComponentType<P>,
    LoadingComp: React.ReactNode
) {
    return (props: P) => {
        return (
            <Suspense fallback={LoadingComp}>
                <Comp {...props} />
            </Suspense>
        );
    };
}

export default withSuspense;
