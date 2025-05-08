import React from 'react';
import { render, screen } from '@testing-library/react';
import HistorySection from '../../../components/HistorySection';
import LabelContainer from 'labelcontainer';

describe('HistorySection UI Component', () => {
    it('should render component', () => {
        render(<HistorySection />);
        expect(LabelContainer.getInstance).toHaveBeenCalled();
        expect(screen.getByText('mock_heading_history')).toBeInTheDocument();
        expect(screen.getByText('mock_history_desc')).toBeInTheDocument();
    });
});
