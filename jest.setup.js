import '@testing-library/jest-dom';

jest.mock('labelcontainer', () => {
    const mockLabels = {
        footer_desc_1: 'mock_footer_desc',
        banner_msg: 'mock_banner_msg',
        heading_history: 'mock_heading_history',
        history_desc: 'mock_history_desc',
    };
    const mockLsInstance = {
        getLabel: (labelId) => mockLabels[labelId] || labelId,
    };
    return {
        __esModule: true,
        default: {
            getInstance: jest.fn(() => mockLsInstance),
        },
    };
});

jest.mock('react-loading-skeleton', () => MockSkeleton);
