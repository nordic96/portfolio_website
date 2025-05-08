import React from 'react';
import { render, screen } from '@testing-library/react';
import ResumeButton from '../../../../components/ResumeButton';

describe('ResumeButton Component', () => {
    it('renders the provided text in component', () => {
        // Assertions based on the container
        render(<ResumeButton label={'test_label'} />);
        expect(screen.getByText('test_label')).toBeInTheDocument();
    });
});
