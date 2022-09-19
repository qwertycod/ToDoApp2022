import axios from 'axios'
// const rootUrl = process.env.REACT_APP_API_KEY 
const r = process.env.REACT_APP_API_URL1

const rootUrl =  'https://localhost:5001/'

export function getCall(url) {
 return axios.get(rootUrl + url, 
    { headers: {
            'Authorization' : localStorage.getItem('token').toString(),
        }
    })
    .then(response => {
        console.log(url + ' result = ' + response.toString());
        if(response.status === 200){
            const res = response.data
            console.log(res);
            return {
                data: res,
                status: 200
            };
        }
        else{
            const res = response.data ? response.data.error : response.message
            console.log(res);
            return {
                data: res,
                status : response.status
            };
        }
    })
    .catch(response => {
            const errorMessage =  response.Message === undefined ? response.toString() : response.Message
            console.log(errorMessage);
            console.log(' #### we are gateway get call catch #### ');
            var r = {
                error: errorMessage,
                status : 500
            }
            return r;
        })
}

 export function postCall(url, data){
  return  axios.post(url, data, 
    { headers: {
        'Authorization' : localStorage.getItem('token') != undefined ? localStorage.getItem('token').toString() : '',
    }
    })
      .then(response => {
          console.log(url + ' result = ' + response.toString());
          if(response.status === 201|| response.status === 200){
              console.log(response.data);
              return {
                  data : response.data,
                  status : 200
              };
          }
          else{
              const res = response.data ? response.data.error : response.message
              console.log(res);
              return {
                data : res,
                status : response.status
            };
          }
      })
      .catch(response => {
              const errorMessage =  response.Message === undefined ? response.toString() : response.Message
              console.log(errorMessage);
              console.log(' #### we are gateway post call catch #### ');
              var r = {
                error: errorMessage,
                status : 500
            }
            return r;
          })
  }

  export async function postPutCall(url,data, type = 'post'){
      try {
        var promise = new Promise((resolve, reject) => {
            if(type == 'post')
           resolve( axios.post(url, data,
                { headers: {
                        'Authorization' : localStorage.getItem('token').toString(),
                    }
                })
           )
           else if(type == 'put'){
            resolve( axios.put(url, data,
                { headers: {
                        'Authorization' : localStorage.getItem('token').toString(),
                    }
                })
           )
           }
        })
        
          const response = await promise;
          console.log(url + ' result = ' + response.toString());
          if (response.status === 201 || response.status === 200) {
              console.log(response.data);
              return {
                  data: response.data,
                  status: 200
              };
          }
          else {
              const res = response.data ? response.data.error : response.message;
              console.log(res);
              return {
                  data: res,
                  status: response.status
              };
          }
      } catch (response_1) {
          const errorMessage = response_1.Message === undefined ? response_1.toString() : response_1.Message;
          console.log(errorMessage);
          console.log(' #### we are gateway '+ {type}  + ' call catch #### ');
          var r = {
              error: errorMessage,
              status: 500
          };
          return r;
      }
  }
  export function genericCall(url, data, type = 'get'){
      var auth =  localStorage.getItem('token') == null ? '' :  localStorage.getItem('token')
      var authHeader = {'Authorization' : auth}
    showLoader();
    var promise = new Promise((resolve, reject) => {
        if(type == 'get'){
       resolve( axios.get(url, 
            { headers:authHeader })
         )
        }
       else if(type == 'delete'){
        resolve( axios.delete(url, 
            { headers:authHeader })
            )
       }
       if(type == 'post')
       resolve( axios.post(url, data,
        { headers:authHeader })
       )
       else if(type == 'put'){
        resolve( axios.put(url, data,
            { headers:authHeader })
       )
       }
       reject('rejected error')
    })
    
    return promise
       .then(response => {
        clearLoader();
           console.log(url + ' result = ' + response.toString());
           if(response.status === 200 || response.status === 201){
               const res = response.data
               console.log(res);
               return {
                   data: res,
                   status: 200
               };
           }
           else{
               const res = response.data ? response.data.error : response.message
               console.log(res);
               return {
                   data: res,
                   status : response.status
               };
           }
       })
       .catch(response => {
        //const errorMessage =  response.Message === undefined ? response.toString() : response.Message
        let errorMessage = '' // response.Message === undefined ? response : response.Message
        try{
            errorMessage = response.toJSON().message
        }  
        catch(e){
            errorMessage =  response.Message === undefined ? response : response.Message
        }
        console.log(errorMessage);
               console.log(` #### we are gateway ` +  type + ` call catch #### `);
               var r = {
                   error: errorMessage,
                   status : errorMessage == "Request failed with status code 401" ? 401 : 500 
               }
               clearLoader();
               return r;
           })
   }

function clearLoader(){
    document.getElementById('app-main-container').classList.remove('overlay');
    document.querySelectorAll("#loaderComponent")[0].hidden = true;
   }
function showLoader(){
    document.getElementById('app-main-container').classList.add('overlay');
    document.querySelectorAll("#loaderComponent")[0].hidden = false;
   }
  