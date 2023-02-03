import renderer from 'react-test-renderer';
import Redirect from '../Redirect';

it('matches component snapshot', () => {
    const component = renderer.create(<Redirect />)
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})