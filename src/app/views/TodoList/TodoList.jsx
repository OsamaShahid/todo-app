import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.hadleEdit = this.handleEdit.bind(this);
    }

    handleDelete(item, e) {
        this.props.onDelete(item);
    }

    handleEdit(item, e) {
      this.props.onEdit(item);
    }

    render() {

      const { items } = this.props;
      return (
        <Box>
          {items.length ? <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Text</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow
                    key={`${item.id}-${item.text}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="right">{item.text}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Delete">
                          <IconButton edge="end" onClick={(e) => this.handleDelete(item, e)} aria-label="delete">
                              <DeleteIcon />
                          </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                          <IconButton edge="end" onClick={(e) => this.handleEdit(item, e)} aria-label="edit">
                              <EditIcon />
                          </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> : null}
        </Box>
      );
    }
  }


export default TodoList;
