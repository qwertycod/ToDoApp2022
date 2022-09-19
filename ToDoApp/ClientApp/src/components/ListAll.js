import React, { Component } from 'react';
import axios from 'axios'
import deletelogo from './2.png';
import donelogo from './done.png';

let apiRootUrl = "https://localhost:44347/";
class ListAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error:null,
            isLoaded : false,
            items:[],
            newSubject:'',
            createdDate:new Date().toJSON(),
            finishDate:''
        };
    }
 
    AddToDo = (e) => { 
        var data = {
            "subject": this.state.newSubject,
            "isComplete": false,
            "createdDate":this.state.createdDate,
            "finishDate":null
        }

        console.log(this.state)
        console.log(data)

        axios.post(apiRootUrl + 'api/todoitem/Add', data)
        .then(response => {
            console.log('response is.....')
            console.log(response)
            console.log('data is.....')
            console.log(response.data)
            data.id = response.data.id;
           var updatedItemLength =  this.state.items.push(data)
           console.log('updated items is.....')
            console.log(this.state.items);
            this.setState({
                items:this.state.items,
                isLoaded:true,
                newSubject: ''
            });
            console.log('state new is.....')
            console.log(this.state)

        })
        .catch(error => {
            console.log(error)
        })
      }

      DoneToDoItem =(Id) => {
          let item = this.state.items.filter(item => item.id == Id);
          if(item[0].isComplete){
            alert('already done')  
            return;
          }
          alert('aaaa')
         let newArray =  item.slice();
         console.log('newArray data ...') 
         console.log(newArray)
         newArray[0].isComplete = true;

         console.log('newArray[0] data ...') 
         console.log(newArray[0]) 
        axios.put(apiRootUrl+ 'api/todoitem/Update/',newArray )
        .then(response => {
              this.state.items.filter(item => item.id == Id)[0].isComplete = true;
             this.state.items.filter(item => item.id == Id)[0].finishDate = response.data.finishDate;
          console.log('update data ...')
          console.log(this.state.items.filter(item => item.id == Id) )

          this.setState({
                items: this.state.items,
                isLoaded:true,
            });
        })
        .catch(error => {
            console.log(error)
        })
      }

      DeleteToDoItem = (id) => {
        axios.delete(apiRootUrl+ 'api/todoitem/Delete/' + id)
        .then(response => {
            console.log(response)
            const updatedItem = this.state.items.filter(item => item.id !== id);
            this.setState({
                items:updatedItem,
                isLoaded:true,
            });
        })
        .catch(error => {
            console.log(error)
        })
      }
    componentDidMount() {
        fetch(apiRootUrl + "api/todoitem")
        .then(result=> result.json())
        .then(result => {
            console.log(result)
            this.setState({
                isLoaded: true,
                items:result,
            });
        },
        (error) => {
            this.setState({
                isLoaded:true,
                error:error
            });
        })

    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {error, isLoaded, items, newSubject, createdDate, finishDate} = this.state;
        if(error){
            return <div>Error  : {error.message}</div>
        }
        else if(!isLoaded){
            return <div>Loading ... </div>
        }
        else{
            return (
                <div>
                    <table id="ListUl">
                    <tbody>
                        <tr>
                            <th>
                                Id
                            </th>
                            <th>
                                Subject
                            </th>
                            <th>
                                Created Date
                            </th>
                            <th>
                                Finish Date
                            </th>
                            <th>
                                    Done
                            </th>
                            <th>
                                    Delete
                            </th>
                        </tr>
                     {items.map((item, index )=> (
                         
                        <tr className={item.isComplete ? "finished" :"unFinished"} id={item.id} key={item.id}>
                           
                        <td>{index + 1} </td> 
                        <td>{item.subject} </td> 
                        <td> {new Date(Date.parse(item.createdDate)).toLocaleString() } </td> 
                       {
                            item.finishDate != undefined  ? 
                            <td>  {new Date(Date.parse(item.finishDate)).toLocaleString() } </td> 
                            : 
                            <td></td>
                       } 
                        <td onClick={() => this.DoneToDoItem(item.id)}> 
                              <img src={donelogo} className="doneLogo" alt="done"/>
                        </td> 

                        <td onClick={() => this.DeleteToDoItem(item.id)}> 
                              <img src={deletelogo} className="deleteLogo" alt="delete"/>
                        </td> 
                        </tr>                       
                     ))
                    }

                    <tr key="addNew">
                    <td> </td> 
                        <td>                        
                             <input type="text" name="newSubject" value={newSubject} onChange={this.changeHandler} />
                        </td>
                        <td>
                            <input disabled="disabled" name="createdDate" type="text" value={createdDate} ></input>
                        </td>
                        <td>
                         
                           
                        </td>
                   <td>
                    <button onClick={(e) => this.AddToDo()}>
                        Add
                    </button>
                </td>
                </tr>
                </tbody>
                    </table>
                </div>
            );
         }

    }

}
 

export default ListAll;