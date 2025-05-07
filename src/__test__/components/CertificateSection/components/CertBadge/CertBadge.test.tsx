import React from 'react';
import { render, screen } from '@testing-library/react';
import CertBadge from '../../../../../components/CertificateSection/components/CertBadge';

describe('CertBadge Component', () => {
    it('should render cert badge component with correct labels', () => {
        render(
            <CertBadge
                logo_src="/test"
                name="name_test"
                theme_color="violet"
                credentials_url="url_test"
                year_obtained="test_2025"
            />
        );
        expect(screen.getByText('name_test')).toBeInTheDocument();
        expect(screen.getByTestId('credentials_url')).toHaveAttribute(
            'href',
            'url_test'
        );
        expect(screen.getByText('test_2025')).toBeInTheDocument();
        const divComponent = screen.getByTestId('badge_container');
        expect(divComponent.classList).toContain('shadow-violet-500/50');
    });

    it('should match snapshot', () => {
        const comp = render(
            <CertBadge
                logo_src="/test"
                name="name_test"
                theme_color="violet"
                credentials_url="url_test"
                year_obtained="test_2025"
            />
        );
        expect(comp).toMatchSnapshot();
    });
});
