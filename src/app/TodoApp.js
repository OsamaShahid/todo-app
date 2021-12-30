import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TodoList from './views/TodoList';
import DeleteIcon from '@mui/icons-material/Delete';

class TodoApp extends React.Component {

    constructor(props) {
      super(props);
      this.state = { items: [], text: '', updatingItem: null };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleItemDelete = this.handleItemDelete.bind(this);
      this.handleItemEdit = this.handleItemEdit.bind(this);
      this.deleteAll = this.deleteAll.bind(this);
      this.fetchItems = this.fetchItems.bind(this);
    }

    componentDidMount() {

      this.fetchItems();

    }
  
    render() {
      return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <TextField id="new-todo" onChange={this.handleChange} size="small" label="What needs to be done?" variant="outlined" value={this.state.text} />
            {!this.state.updatingItem && <Button variant="outlined" onClick={this.handleSubmit} startIcon={<AddIcon />}>
                Add
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
          updatingItem: null
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
          updatingItem: item
        }));
      
    }

    deleteAll(e) {

      this.setState({
        items: [],
        updatingItem: null
      });
    }

    async fetchItems () {

      try {

        const itemsUrl = `https://my-json-server.typicode.com/OsamaShahid/dev/items`;
        const itemsHeaders = new Headers({
          'Content-Type': 'application/json'
        });
        const itemsRequest = new Request(itemsUrl, {
          method: 'GET',
          headers: itemsHeaders,
          mode: 'cors',
          cache: 'default',
        });

        let itemsRes = await fetch(itemsRequest);

        if (itemsRes.ok) {
          itemsRes = await itemsRes.json();
          this.setState(state => ({
            items: itemsRes
          }));
        }

      } catch (error) {

        console.log(error);

      }

    }

  }
  
  
  
  export default TodoApp;
  