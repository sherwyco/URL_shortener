import renderer from 'react-test-renderer';
import DeleteButton from '../DeleteButton';

it('matches component snapshot', () => {
    const component = renderer.create(<DeleteButton objectId={1} handleDeleteConfirm={(id: number) => { }} />)
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})