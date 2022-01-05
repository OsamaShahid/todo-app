import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import TodoList from '../../views/TodoList';
import GenericButton from '../../components';
import Input from '../../views/Input';

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
      this.fetchItems = this.fetchItems.bind(this);
    }

    componentDidMount() {

      this.fetchItems();
    
    }
  
    render() {
      const { text, inputButtonText, inputButtonIcon, items} = this.state;
      return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Input id="new-todo" onChange={this.handleChange} size="small" label="What needs to be done?" variant="outlined" text={text} />
            <GenericButton variant={buttonVariant.OUTLINED} onClick={this.handleSubmit} startIcon={inputButtonIcon}>
                {inputButtonText}
            </GenericButton>
            <TodoList items={items} onDelete={this.handleItemDelete} onEdit={this.handleItemEdit} />
            {items.length ? <GenericButton variant="outlined" onClick={(e) => this.deleteAll(e)} startIcon={<DeleteIcon />}>
              Delete Tasks
            </GenericButton> : null}
        </Box>
      );
    }
  
    handleChange(text) {
      this.setState({ text });
    }
  
    handleSubmit(e) {
      if (this.state.text.length === 0) {
        return;
      }

      if (!this.state.updatingItem) {
        
        let newItem = {
          text: this.state.text,
          id: this.state.items.length ? (Math.max.apply(Math, this.state.items.map(function(itm) { return itm.id; })) + 1) : 500
        };

        this.saveItem(newItem);

      } else {

        const items = this.state.items;
        const itemIndex = this.state.items.indexOf(this.state.updatingItem);

        this.updateItem({
          text: this.state.text,
          id: this.state.updatingItem.id
        }, items, itemIndex);

      }
    }

    handleItemDelete(item) {

      if (this.state.updatingItem === item) {
        return;
      }

      this.deleteItem(item);
        
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

      this.deleteItems(this.state.items);
    }

    async fetchItems () {

      try {

        let itemsRes = await axios.get(`http://localhost:3000/api/todo-items`);

        if (itemsRes?.data?.data) {
          this.setState(state => ({
            items: itemsRes.data.data
          }));
        }

      } catch (error) {

        console.log(error);

      }

    }

    async saveItem (item) {

      try {

        let itemsRes = await axios.post(`http://localhost:3000/api/todo-item`, item);

        if (itemsRes?.data?.success) {

          this.setState(state => ({
            items: state.items.concat(item),
            text: ''
          }));

        }

      } catch (error) {

        console.log(error);
      }

    }

    async updateItem (updatedItem, items, itemIndex) {

      try {

        let itemsRes = await axios.put(`http://localhost:3000/api/todo-item`, updatedItem);

        if (itemsRes?.data?.success) {

          items[itemIndex] = updatedItem;
            this.setState(state => ({
              items,
              text: '',
              updatingItem: null,
              inputButtonText: ButtonText.ADD,
              inputButtonIcon: buttonIcon.UPDATE
            }));

        }

      } catch (error) {

        console.log(error);

      }

    }

    async deleteItem (item) {

      try {

        let itemsRes = await axios.delete(`http://localhost:3000/api/todo-item/${item.id}`);

        if (itemsRes?.data?.success) {

          this.setState(state => ({
            items: state.items.filter(listItem => (item !== listItem))
          }));

        }

      } catch (error) {

        console.log(error);

      }

    }

    async deleteItems (items) {

      try {

        items = items.map(item => item.id);

        let itemsRes = await axios.delete(`http://localhost:3000/api/todo-items`,  {
          headers: {},
          data: {
            ids: items
          }
        });

        if (itemsRes?.data?.success) {

          this.setState({
            items: [],
            updatingItem: null,
            inputButtonText: ButtonText.ADD,
            inputButtonIcon: buttonIcon.UPDATE
          });

        }

      } catch (error) {

        console.log(error);

      }

    }
  }
  
  
  
  export default TodoApp;
  