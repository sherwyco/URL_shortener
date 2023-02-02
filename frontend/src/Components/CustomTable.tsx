import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteButton from './DeleteButton';

import { ChangeEvent } from "react"

interface Column {
    id: 'originalUrl' | 'shortCode' | 'createdAt' | 'objectId';
    label: string;
    minWidth?: number;
    maxWidth?: number,
    align?: "left" | "right" | "center"
}

const columns: readonly Column[] = [
    { id: 'originalUrl', label: 'Url', maxWidth: 100, align: 'left' },
    { id: 'shortCode', label: 'Code', align: "center" },
    {
        id: 'createdAt',
        label: 'Created At',
        align: "center"

    },
    {
        id: 'objectId', label: 'Actions', align: 'right'
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
    handleDeleteConfirm: (id: number) => void;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;

}

function CustomTable(props: PropTypes) {

    const { data, totalCount, page, rowsPerPage, handleDeleteConfirm, handleChangePage, handleChangeRowsPerPage } = props;

    return (<Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                            >
                                {column.label}
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
                                            maxWidth: 30,
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
    </Paper>)
}

export default CustomTable;