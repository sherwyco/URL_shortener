import { ChangeEvent, useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteButton from './DeleteButton';
import { getData } from '../Api/Client';

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
        id: 'objectId', label: 'Delete', align: 'right'
    },

];
interface ApiModelType {
    id: number;
    original_url: string;
    short_code: string;
    created_at: string
}

interface Data {
    originalUrl: string;
    shortCode: string;
    createdAt: string;
    objectId: number;
}


export default function ShortUrl() {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(100);
    const [data, setData] = useState<Data[]>([])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(1);
    };

    const handleDelete = () => {
        console.log("DELETED!")
    }

    const cleanData = (rawData: []) => {
        const row: Data[] = []
        rawData?.forEach((elem: ApiModelType) => {
            row.push({
                objectId: elem.id,
                originalUrl: elem.original_url,
                shortCode: elem.short_code,
                createdAt: elem.created_at
            })
        })
        return row;
    }

    const fetchData = () => {
        // eslint-disable-next-line
        getData("/shortener/", `?per_page=${rowsPerPage}&page=${page}`, {}).then((response: any) => {
            console.log(response);
            setPage(response.data.page);
            setTotalCount(response.data.total);
            setRowsPerPage(response.data.per_page);
            setData(cleanData(response.data.results));
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        fetchData(); //initial
    }, [setData, setRowsPerPage, setPage, setTotalCount])

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                                                {column.id === 'objectId' ? <DeleteButton handleDelete={handleDelete} /> : value}
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
        </Paper>
    );
}