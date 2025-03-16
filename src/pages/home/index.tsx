import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import xior from 'xior';

const columns: GridColDef[] = [
  { field: 'model', headerName: '型号', width: 250 },
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
    field: 'steelNomad',
    headerName: 'Steel Nomad DX12 (4K) 跑分',
    width: 180,
    align: 'right',
    renderCell: ({ value, row }) => (
      <a
        href={`https://www.3dmark.com/search#advanced?test=sw%20DX&cpuId=&gpuId=${row.id}&gpuCount=0&gpuType=ALL&deviceType=DESKTOP&storageModel=ALL&showRamDisks=false&memoryChannels=0&country=&scoreType=overallScore&hofMode=false&showInvalidResults=false&freeParams=&minGpuCoreClock=&maxGpuCoreClock=&minGpuMemClock=&maxGpuMemClock=&minCpuClock=&maxCpuClock=`}
        target="_blank"
        rel="noreferrer"
      >
        {new Intl.NumberFormat('zh-CN').format(value)}
      </a>
    ),
  },
  {
    field: 'steelNomadRatio',
    headerName: 'Steal Nomad DX12 (4K) 性价比',
    width: 180,
    align: 'right',
    valueGetter: (_value, row) => row.steelNomad / row.jdPrice,
    renderCell: ({ value }) =>
      new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(
        value,
      ),
  },
  {
    field: 'steelNomadLight',
    headerName: 'Steel Nomad Light (2K) 跑分',
    width: 180,
    align: 'right',
    renderCell: ({ value, row }) => (
      <a
        href={`https://www.3dmark.com/search#advanced?test=sw%20DXLT&cpuId=&gpuId=${row.id}&gpuCount=0&gpuType=ALL&deviceType=DESKTOP&storageModel=ALL&showRamDisks=false&memoryChannels=0&country=&scoreType=overallScore&hofMode=false&showInvalidResults=false&freeParams=&minGpuCoreClock=&maxGpuCoreClock=&minGpuMemClock=&maxGpuMemClock=&minCpuClock=&maxCpuClock=`}
        target="_blank"
        rel="noreferrer"
      >
        {new Intl.NumberFormat('zh-CN').format(value)}
      </a>
    ),
  },
  {
    field: 'steelNomadLightRatio',
    headerName: 'Steel Nomad Light (2K) 性价比',
    width: 180,
    align: 'right',
    valueGetter: (_value, row) => row.steelNomadLight / row.jdPrice,
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
