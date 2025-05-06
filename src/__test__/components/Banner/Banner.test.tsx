import React from 'react';
import Banner from '../../../components/Banner';
import { render, screen } from '@testing-library/react';
import LabelContainer from 'labelcontainer';

describe('Banner UI Component', () => {
    it('should render banner component', () => {
        render(<Banner />);
        expect(LabelContainer.getInstance).toHaveBeenCalled();
        expect(screen.getByText('mock_banner_msg')).toBeInTheDocument();
    });
});
