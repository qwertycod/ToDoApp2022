import React, { Component } from 'react';
import deletelogo from './2.png';
import donelogo from './done.png';
import { genericCall, getCall, postCall, postPutCall, putCall } from '../redux/gateway';

let apiRootUrl = "https://localhost:44347/";
class GetUserTodoItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error:null,
            isLoaerrorded : false,
            items:[],
            newSubject:'',
            createdDate:new Date().toJSON(),
            finishDate:'',           
        };
    }

    //   headers = () => {
    //     return   {
    //         'Content-Type': 'application/json',
    //         'Authorization': this.props.token
    //       }           
    //   }

    // commonTest = (type, url) => {
    //     var result1 = {};
    //     if(type == 'get')
    //     axios.get(apiRootUrl +  url,
    //     {
    //         headers: {
    //           'Authorization': this.props.token
    //        }} 
    //      )
    //     .then(result=> result.json())
    //     .then(result => {
    //         console.log(result)
    //         result1 = result;
    //     },
    //     (error) => {
    //         this.setState({
    //             isLoaded:true,
    //             error:error
    //         });
    //     })

    //     return result1;
    // }
 
    AddToDo = (e) => { 
        var data = {
            "subject": this.state.newSubject,
            "isComplete": false,
            "createdDate":this.state.createdDate,
            "finishDate":null,
            "userId": this.props.id
        }
        console.log(this.state)
        console.log(data)
    var res =  genericCall('api/todoitem/Add', data, 'post');
      res.then(response => {
        if(response.status === 200){
            console.log('response is.....')
            console.log(response)
            console.log('data is.....')
            console.log(response.data)
            data.id = response.data.id;
            this.state.items.push(data)
            console.log('updated items is.....')
            console.log(this.state.items);
            this.setState({
                items:this.state.items,
                isLoaded:true,
                newSubject: ''
            });
            console.log('state new is.....')
            console.log(this.state)
        }
        else{
            this.setState({
                error:response.error
        })}
        })
        .catch(error => {
            console.log(error)
        })
      }
    // if(response.status === 200){
    //     console.log('response is.....')
    //         console.log(response)
    //         console.log('data is.....')
    //         console.log(response.data)
    //         data.id = response.data.id;
    //         var updatedItemLength =  this.state.items.push(data)
    //         console.log('updated items is.....')
    //         console.log(this.state.items);
    //         this.setState({
    //             items:this.state.items,
    //             isLoaded:true,
    //             newSubject: ''
    //         });
    //         console.log('state new is.....')
    //         console.log(this.state)
    //     }
    //     else{
    //         this.setState({
    //             error:response.error
    //         })
    //     }
    //     }
    // r();

    //     axios.post(apiRootUrl + 'api/todoitem/Add', data,
    //         {headers : this.props.headers()}
    //     )
    //     .then(response => {
    //         console.log('response is.....')
    //         console.log(response)
    //         console.log('data is.....')
    //         console.log(response.data)
    //         data.id = response.data.id;
    //         var updatedItemLength =  this.state.items.push(data)
    //         console.log('updated items is.....')
    //         console.log(this.state.items);
    //         this.setState({
    //             items:this.state.items,
    //             isLoaded:true,
    //             newSubject: ''
    //         });
    //         console.log('state new is.....')
    //         console.log(this.state)

    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    //   }

      DoneToDoItem =(Id) => {
          let item = this.state.items.filter(item => item.id == Id);
          if(item[0].isComplete){
            console.log('already done')
            return;
          }
         let newArray =  item.slice();
         console.log('newArray data ...') 
         console.log(newArray)
         newArray[0].isComplete = true;
         let r = async () => {
             var response = await genericCall('api/todoitem/Update/',newArray[0],  'put')
             if(response.status !== 200){
                            console.log(response)
                            this.setState({
                                error : response.error
                            })
                             return;
                         }
                else{
                this.state.items.filter(item => item.id == Id)[0].isComplete = true;
                this.state.items.filter(item => item.id == Id)[0].finishDate = response.data.finishDate;
                console.log('update data ...')
                console.log(this.state.items.filter(item => item.id == Id) )

                this.setState({
                items: this.state.items,
                isLoaded:true,
                });
                 }   
            }
             r();
         }
    //     axios.put(apiRootUrl+ 'api/todoitem/Update/',newArray[0],  {headers : this.props.headers()} )
    //     .then(response => {
    //          if(response.status == undefined){
    //             console.log(response)
    //             this.setState({
    //                 error : response.message
    //             })
    //              return;
    //          }
            
    //         this.state.items.filter(item => item.id == Id)[0].isComplete = true;
    //          this.state.items.filter(item => item.id == Id)[0].finishDate = response.data.finishDate;
    //       console.log('update data ...')
    //       console.log(this.state.items.filter(item => item.id == Id) )

    //       this.setState({
    //             items: this.state.items,
    //             isLoaded:true,
    //         });
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    //   }

    //   DeleteToDoItem = (id) => {
    //     axios.delete(apiRootUrl+ 'api/todoitem/Delete/' + id,  {headers : this.props.headers()})
    //     .then(response => {
    //         console.log(response)
    //         const updatedItem = this.state.items.filter(item => item.id !== id);
    //         this.setState({
    //             items:updatedItem,
    //             isLoaded:true,
    //         });
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    //   }

    DeleteToDoItem = async (id) => {
       var response = await genericCall('api/todoitem/Delete/' + id, '', 'delete')
       if(response.status === 200){
       const updatedItem = this.state.items.filter(item => item.id !== id);
       this.setState({
           items:updatedItem,
           isLoaded:true,
       });
    }
    else{
        this.setState({
            error:response.error,
            isLoaded:true,
        })
    }
      }
  
    componentDidMount() {
        let r = async () =>{
        var result = await genericCall("api/todoitem/GetByUserId/" + this.props.id)
        if(result.status == 200){
            this.setState({
                isLoaded: true,
                items:result.data,
            });
        }
            else{
                try{
                    var err = result.error.toJSON().message;
                    this.setState({
                        error : err 
                    }) 
                }
                catch(e){
                    this.setState({
                        error : result.error.toString()  || 'server error'
                    }) 

                }
           
        }
        }
     r();
    }
        // fetch(apiRootUrl + "api/todoitem/GetByUserId/" + this.props.id, 
        //  {headers : this.props.headers() }
        // )
        // .then(result=> result.json())
        // .then(result => {
        //     console.log(result)
        //     if(!result.length){
        //         this.setState({
        //             error : result.message ? result.message : 'network error',
        //         }) 
        //          return;
        //      }
        //     this.setState({
        //         isLoaded: true,
        //         items:result,
        //     });
        // },
        // (error) => {
        //     this.setState({
        //         isLoaded:true,
        //         error:error.toString()
        //     });
        // })

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {error, isLoaded, items, newSubject, createdDate, finishDate} = this.state;
        if(error){
            return <div>Error  : {error}</div>
     

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
 

export default GetUserTodoItems;