export const loadState = () => {
    try{
        const serializedState = localStorage.getItem('state');
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    }
    catch(err){ return undefined}
}

export const saveState = (state) => {
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }
    catch(err){ 
        alert('error in saving state to local storage')
        // log error
        return undefined
    }
}