import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('renders projects message', () => {
    render(<App />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
});

it('renders design message', () => {
    render(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
});
