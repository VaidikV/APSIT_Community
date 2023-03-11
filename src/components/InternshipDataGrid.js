import * as React from 'react';
// @mui
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413Q19.825 21 19 21Zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4Z"
    />
  </svg>
);
export default function InternshipDataGrid() {
  // Table rows
  const rows = [
    {
      id: 1,
      domain: 'Computer Science',
      title: 'IOS App development',
      company: 'Level Fittech private Limited',
      link: 'https://minimals.cc/components/mui/data-grid',
    },
    {
      id: 2,
      domain: 'Computer Science',
      title: 'IOS App development',
      company: 'Level Fittech private Limited',
      link: 'https://minimals.cc/components/mui/data-grid',
    },
    {
      id: 3,
      domain: 'Computer Science',
      title: 'IOS App development',
      company: 'Level Fittech private Limited',
      link: 'https://minimals.cc/components/mui/data-grid',
    },
    {
      id: 4,
      domain: 'Computer Science',
      title: 'IOS App development',
      company: 'Level Fittech private Limited',
      link: 'https://minimals.cc/components/mui/data-grid',
    },
  ];
  // Table columns
  const columns = [
    { field: 'domain', headerName: 'Domain', width: 200 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'company', headerName: 'Company Name', width: 200 },
    {
      field: 'link',
      headerName: 'Link',
      flex: 1,
      renderCell: (params) => (
        <Button href={params.value} target="_blank" variant="contained" endIcon={<ExternalIcon />}>
          Apply
        </Button>
      ),
    },
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
}
