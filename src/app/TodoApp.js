import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TodoList from './views/TodoList';
import DeleteIcon from '@mui/icons-material/Delete';

class TodoApp extends React.Component {

    constructor(props) {
      super(props);
      this.state = { items: [], text: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleItemDelete = this.handleItemDelete.bind(this);
      this.deleteAll = this.deleteAll.bind(this);
    }
  
    render() {

      return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <TextField id="new-todo" onChange={this.handleChange} size="small" label="What needs to be done?" variant="outlined" value={this.state.text} />
            <Button variant="outlined" onClick={this.handleSubmit} startIcon={<AddIcon />}>
                Add
            </Button>
            <TodoList items={this.state.items} onDelete={this.handleItemDelete} />
            <Button variant="outlined" onClick={(e) => this.deleteAll(e)} startIcon={<DeleteIcon />}>
              Delete Tasks
            </Button>
        </Box>
      );
    }
  
    handleChange(e) {
      this.setState({ text: e.target.value });
    }
  
    handleSubmit(e) {
      e.preventDefault();
      if (this.state.text.length === 0) {
        return;
      }
      const newItem = {
        text: this.state.text,
        id: ( new Date( Date.now() ) ).getMilliseconds()
      };
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: ''
      }));
    }

    handleItemDelete(item) {

        const items = this.state.items;
        const itemIndex = this.state.items.indexOf(item);
        items.splice(itemIndex, 1);
        this.setState(state => ({
            items
          }));
        
    }

    deleteAll(e) {

      this.setState({
        items: []
      });
      
  }

  }
  
  
  
  export default TodoApp;
  