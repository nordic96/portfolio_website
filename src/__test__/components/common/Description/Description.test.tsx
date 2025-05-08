import React from 'react';
import { render, screen } from '@testing-library/react';
import Description from '../../../../components/common/Description';

describe('Description Common Component', () => {
    it('renders the provided text in component', () => {
        render(
            <Description>
                <label>{'test'}</label>
            </Description>
        );
        expect(screen.getByText('test')).toBeInTheDocument();
    });
});
