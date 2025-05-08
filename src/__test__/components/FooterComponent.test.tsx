import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterComp from '../../components/FooterComp';
import LabelContainer from 'labelcontainer';

describe('Footer Component', () => {
    it('should render FooterComponent with correct labels', () => {
        render(<FooterComp />);
        expect(screen.getByText('mock_footer_desc')).toBeInTheDocument();
        expect(LabelContainer.getInstance).toHaveBeenCalled();
    });
});
