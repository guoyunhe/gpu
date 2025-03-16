import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import xior from 'xior';

const columns: GridColDef[] = [
  { field: 'model', headerName: '型号', width: 250 },
  {
    field: 'steelNomad',
    headerName: 'Steel Nomad 跑分',
    width: 120,
    align: 'right',
    renderCell: ({ value, row }) => (
      <a
        href={`https://benchmarks.ul.com/hardware/gpu/${row.model}`}
        target="_blank"
        rel="noreferrer"
      >
        {new Intl.NumberFormat('zh-CN').format(value)}
      </a>
    ),
  },
  {
    field: 'jdPrice',
    headerName: '京东价格',
    width: 100,
    align: 'right',
    renderCell: ({ value, row }) => (
      <a href={`https://item.jd.com/${row.jdSku}.html`} target="_blank" rel="noreferrer">
        {new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(value)}
      </a>
    ),
  },
  {
    field: 'ratio',
    headerName: '性价比',
    width: 90,
    align: 'right',
    renderCell: ({ value }) =>
      new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(
        value,
      ),
  },
];

export default function HomePage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    xior.get('/data.json').then((res) => {
      setRows(res.data || []);
    });
  }, []);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 20,
          },
        },
      }}
      pageSizeOptions={[20, 50, 100]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  );
}
