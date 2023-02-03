import renderer from 'react-test-renderer';
import CustomTable from '../CustomTable';

it('matches component snapshot', () => {
    const component = renderer.create(<CustomTable
        data={[]}
        totalCount={0}
        page={1}
        rowsPerPage={10}
        handleAddSubmit={(url: string) => { }}
        handleDeleteConfirm={(id: number) => { }}
        handleChangePage={(event: unknown, newPage: number) => { }}
        handleChangeRowsPerPage={(event: React.ChangeEvent<HTMLInputElement>) => { }} />)
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})