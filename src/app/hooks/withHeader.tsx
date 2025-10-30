import React, { ComponentType } from 'react';
import HeaderLabel from '../../components/HeaderLabel';
import Description from '../../components/common/Description';
import Divider from '../../components/common/Divider';
import LabelContainer from 'labelcontainer';

type WithHeaderOptions = {
    containerClassName?: string;
    dividerClassName?: string;
};

function withHeader<P extends {}>(
    Component: ComponentType<P>,
    headerKey: string,
    options?: WithHeaderOptions
) {
    const lsInstance = LabelContainer.getInstance();
    return (props: P) => {
        return (
            <div
                className={
                    options?.containerClassName
                        ? options.containerClassName
                        : 'flex flex-col py-4 max-sm:py-2 w-[30.2rem] max-sm:w-full text-start'
                }>
                <HeaderLabel>
                    {lsInstance.getLabel(`heading_${headerKey}`)}
                </HeaderLabel>
                <Description>
                    {lsInstance.getLabel(`${headerKey}_desc_label`)}
                </Description>
                <Divider
                    className={
                        options?.dividerClassName
                            ? options.dividerClassName
                            : 'my-4 lg:w-[30.2rem] max-sm:w-full'
                    }
                />
                <Component {...props} />
            </div>
        );
    };
}

export default withHeader;
