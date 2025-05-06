import '@testing-library/jest-dom';

jest.mock('labelcontainer', () => {
    const mockLabels = {
        footer_desc_1: 'mock_footer_desc',
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
