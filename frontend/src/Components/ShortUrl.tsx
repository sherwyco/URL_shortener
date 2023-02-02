import { ChangeEvent, useEffect, useState } from 'react';
import { getData, deleteData } from '../Api/Client';
import CustomTable from './CustomTable';

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
    const [totalCount, setTotalCount] = useState(0);
    const [data, setData] = useState<Data[]>([])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(1);
    };


    const cleanData = (rawData: []) => {
        const row: Data[] = []
        rawData?.forEach((elem: ApiModelType) => {
            row.push({
                objectId: elem.id,
                originalUrl: elem.original_url,
                shortCode: elem.short_code,
                createdAt: new Date(elem.created_at).toLocaleString()
            })
        })
        return row;
    }
    const handleDeleteConfirm = (id: number) => {
        // eslint-disable-next-line
        deleteData(`/shortener/${id}`).then((response: any) => {
            console.log(response.status);
            fetchAll();
        }).catch((error) => {
            console.log(error)
        })
    }

    const fetchAll = () => {
        // eslint-disable-next-line
        getData("/shortener/", `?per_page=${rowsPerPage}&page=${page}`, {}).then((response: any) => {
            console.log(response);
            setTotalCount(response.data.total);
            setData(cleanData(response.data.results));
            setPage(response.data.page)
            setRowsPerPage(response.data.per_page)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        fetchAll()
    }, [page, rowsPerPage])

    return (
        <CustomTable
            data={data} totalCount={totalCount}
            page={page} rowsPerPage={rowsPerPage}
            handleDeleteConfirm={handleDeleteConfirm}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage} />
    );

}