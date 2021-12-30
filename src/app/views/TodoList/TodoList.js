import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(item, e) {
        this.props.onDelete(item);
    }

    render() {
      return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List>
            {this.props.items.map(item => (
                <ListItem key={`${item.id}-${item.text}`} secondaryAction={
                    <Tooltip title="Delete">
                        <IconButton edge="end" onClick={(e) => this.handleDelete(item, e)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                  }
                >
                    <ListItemText primary={`${item.text}`} />
                </ListItem>
            ))}
          </List>
      </Box>
      );
    }
  }


export default TodoList;
