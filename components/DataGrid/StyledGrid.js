import React from 'react';
// import { DataGrid } from '@material-ui/data-grid';
import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

function customCheckbox(theme) {
    return {
      '& .MuiCheckbox-root svg': {
        width: 16,
        height: 16,
        backgroundColor: 'transparent',
        border: `1px solid ${
          theme.palette.type === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
        }`,
        borderRadius: 2,
      },
      '& .MuiCheckbox-root svg path': {
        display: 'none',
      },
      '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.secondary.dark,
      },
      '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
        position: 'absolute',
        display: 'table',
        border: '2px solid #fff',
        borderTop: 0,
        borderLeft: 0,
        transform: 'rotate(45deg) translate(-50%,-50%)',
        opacity: 1,
        transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
        content: '""',
        top: '50%',
        left: '39%',
        width: 5.71428571,
        height: 9.14285714,
      },
      '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
        width: 8,
        height: 8,
        backgroundColor: theme.palette.primary.main,
        transform: 'none',
        top: '39%',
        border: 0,
      },
    };
  }
  
const useStyles = makeStyles((theme) => ({
    root: {
      border: 'thin solid',
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      WebkitFontSmoothing: 'auto',
      letterSpacing: 'normal',
      '& .MuiDataGrid-columnsContainer': {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.background.paper,
      },
      '& .MuiDataGrid-iconSeparator': {
        display: 'none',
      },
      '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
        borderRight: `1px solid ${theme.palette.primary.dark}`,
      },
      '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `1px solid ${theme.palette.primary.dark}`,
      },
      '& .MuiDataGrid-cell': {
        color: theme.palette.primary.dark,
      },
      '& .MuiPaginationItem-root': {
        borderRadius: 5,
        backgroundColor: theme.palette.primary.main,
      },
      ...customCheckbox(theme),
    },
  }));
  
function CustomPagination() {
  const { state, apiRef } = useGridSlotComponentProps();

  return (
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        page={state.pagination.page}
        count={state.pagination.pageCount}
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, value) => apiRef.current.setPage(value)}
      />
    );
}

const StyledGrid = ({ rows, columns, loading, toolbar }) => {
    const classes = useStyles();
    
    return (
        <Paper elevation={0} style={{ display: 'flex', height: '65vh', width: '1325px' }}>
            <DataGrid
                className={classes.root}
                loading={loading}
                rows={rows}
                columns={columns} 
                components={{
                  Toolbar: toolbar,
                  Pagination: CustomPagination,
                }}
                pageSize={10}
                headerHeight={40}
                density="standard"
            />
        </Paper>
    );
}

export default StyledGrid;

