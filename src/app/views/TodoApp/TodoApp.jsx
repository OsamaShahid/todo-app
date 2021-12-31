import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TodoList from '../../views/TodoList';
import DeleteIcon from '@mui/icons-material/Delete';

const ButtonText = {
  ADD: 'Add',
  UPDATE: 'Update'
}

const buttonVariant = {
  OUTLINED: 'outlined'
}

const buttonIcon = {
  ADD: <AddIcon />,
  UPDATE: <UpdateIcon />
}

class TodoApp extends React.Component {

    constructor(props) {
      super(props);
      this.state = { 
        items: [],
        text: '',
        updatingItem: null,
        inputButtonText: ButtonText.ADD,
        inputButtonIcon: buttonIcon.ADD
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleItemDelete = this.handleItemDelete.bind(this);
      this.handleItemEdit = this.handleItemEdit.bind(this);
      this.deleteAll = this.deleteAll.bind(this);
    }
  
    render() {
      return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <TextField id="new-todo" onChange={this.handleChange} size="small" label="What needs to be done?" variant="outlined" value={this.state.text} />
            {!this.state.updatingItem && <Button variant={buttonVariant.OUTLINED} onClick={this.handleSubmit} startIcon={this.state.inputButtonIcon}>
                {this.state.inputButtonText}
            </Button>}
             {this.state.updatingItem && <Button variant="outlined" onClick={this.handleSubmit} startIcon={<UpdateIcon />}>
                Update
            </Button>}
            <TodoList items={this.state.items} onDelete={this.handleItemDelete} onEdit={this.handleItemEdit} />
            {this.state.items.length && <Button variant="outlined" onClick={(e) => this.deleteAll(e)} startIcon={<DeleteIcon />}>
              Delete Tasks
            </Button>}
        </Box>
      );
    }
  
    handleChange(e) {
      this.setState({ text: e.target.value });
    }
  
    handleSubmit(e) {
      if (this.state.text.length === 0) {
        return;
      }

      if (!this.state.updatingItem) {
        const newItem = {
          text: this.state.text,
          id: Date.now()
        };
        this.setState(state => ({
          items: state.items.concat(newItem),
          text: ''
        }));
      } else {


        const items = this.state.items;
        const itemIndex = this.state.items.indexOf(this.state.updatingItem);
        items[itemIndex] = {
          text: this.state.text,
          id: this.state.updatingItem.id
        };
        this.setState(state => ({
          items,
          text: '',
          updatingItem: null,
          inputButtonText: ButtonText.ADD,
          inputButtonIcon: buttonIcon.UPDATE
        }));

      }
    }

    handleItemDelete(item) {

      if (this.state.updatingItem === item) {
        return;
      }
      const items = this.state.items;
      const itemIndex = this.state.items.indexOf(item);
      items.splice(itemIndex, 1);
      this.setState(state => ({
          items
      }));
        
    }

    handleItemEdit(item) {

      this.setState(state => ({
          text: item.text,
          updatingItem: item,
          inputButtonText: ButtonText.UPDATE,
          inputButtonIcon: buttonIcon.UPDATE
        }));
      
    }

    deleteAll(e) {

      this.setState({
        items: [],
        updatingItem: null,
        inputButtonText: ButtonText.ADD,
        inputButtonIcon: buttonIcon.UPDATE
      });
    }

  }
  
  
  
  export default TodoApp;
  