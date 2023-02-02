import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteButton from './DeleteButton';
import { Typography } from '@mui/material';
import { ChangeEvent } from "react"
import AddRowDialog from './AddRowDialog';

interface Column {
    id: 'originalUrl' | 'shortCode' | 'createdAt' | 'objectId';
    label: string;
    minWidth?: number;
    align?: "left" | "right" | "center"
}

const columns: readonly Column[] = [
    { id: 'originalUrl', label: 'Url', align: 'left' },
    { id: 'shortCode', label: 'Code', align: "right" },
    {
        id: 'createdAt',
        label: 'Created At',
        align: "right"

    },
    {
        id: 'objectId', label: 'Actions', align: 'right',
    },

];

interface Data {
    originalUrl: string;
    shortCode: string;
    createdAt: string;
    objectId: number;
}

interface PropTypes {
    data: Data[];
    totalCount: number;
    page: number,
    rowsPerPage: number;
    handleAddSubmit: (url: string) => void;
    handleDeleteConfirm: (id: number) => void;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;

}

function CustomTable(props: PropTypes) {

    const { data, totalCount, page, rowsPerPage, handleAddSubmit, handleDeleteConfirm, handleChangePage, handleChangeRowsPerPage } = props;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <div style={{ textAlign: 'right', margin: '10px 10px 10px 10px' }}>
                <AddRowDialog handleAddSubmit={handleAddSubmit} />
            </div>
            <TableContainer sx={{ maxHeight: 430 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    <Typography variant="button">{column.label}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.shortCode}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align} sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                maxWidth: 40,
                                            }}>
                                                {column.id === 'objectId' ? <DeleteButton objectId={row.objectId} handleDeleteConfirm={handleDeleteConfirm} /> : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper >)
}

export default CustomTable;