import { render } from '@testing-library/react';
import SuccessModal from '../SuccessModal';

it('matches component snapshot', () => {
    const { baseElement } = render(<SuccessModal shortUrl='1234567' />)
    expect(baseElement).toMatchSnapshot();
})