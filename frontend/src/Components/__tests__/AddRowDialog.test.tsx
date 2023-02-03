import renderer from 'react-test-renderer';
import AddRowDialog from '../AddRowDialog';

it('matches component snapshot', () => {
    const component = renderer.create(<AddRowDialog handleAddSubmit={() => { }} />)
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})