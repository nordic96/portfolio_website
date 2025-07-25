import React from 'react';
import { render } from '@testing-library/react';
import FooterComp from '../../components/FooterComp';

describe('Footer Component', () => {
    it('should match with snapshot', () => {
        const footer = render(<FooterComp />);
        expect(footer).toMatchSnapshot();
    });
});
