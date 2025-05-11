import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderLabel from '../../../components/HeaderLabel';

describe('HeaderLabel Component', () => {
    it('should render component', () => {
        render(
            <HeaderLabel>
                <label>{'test_label'}</label>
            </HeaderLabel>
        );
        expect(screen.getByText('test_label')).toBeInTheDocument();
    });
});
