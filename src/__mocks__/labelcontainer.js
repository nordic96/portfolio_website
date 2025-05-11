// __mocks__/labelcontainer.js
const mockLabels = {
    footer_desc_1: 'mock_footer_desc',
    banner_msg: 'mock_banner_msg',
    heading_history: 'mock_heading_history',
    history_desc: 'mock_history_desc',
};

const mockLsInstance = {
    getLabel: (labelId) => mockLabels[labelId] || labelId,
};

module.exports = {
    __esModule: true,
    default: {
        getInstance: jest.fn(() => mockLsInstance),
    },
};
