import renderer from 'react-test-renderer';
import ShortUrl from '../ShortUrl';

it('matches component snapshot', () => {
    const component = renderer.create(<ShortUrl />)
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})