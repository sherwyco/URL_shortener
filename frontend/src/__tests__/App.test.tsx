import { render, screen } from '@testing-library/react'
import App from '../App'
import { expect } from 'expect';

test('renders text header', () => {
    const { getByText } = render(<App />)
    const linkElement = screen.getByText(/URL Shortener/i)
    expect(linkElement).toBeTruthy()
})
