import React from 'react';

function withLoading(ChildComponent){
    return function EnhancedComponent({isLoading, ...props}){
        if(isLoading)
        {
            <div>Loading..........</div>
        }

        return <ChildComponent {...props} />;
    }
}

// import React from 'react'

// const UpdatedComponent = (OriginalComponent, isLoading) => {
//     class NewComponent extends React.Component{
//         constructor(props) {
//             super(props)            
//         }
//         if(isLoading){
//             <div>Loading..........</div>
//         }

//         render() {
//             return <OriginalComponent 
//              {...this.props} >
//                     if(this.props.isLoading){
//                     <div>....Loading</div>
//             }
//              </OriginalComponent>
//         }
//     }
//     return NewComponent
// }

// export default UpdatedComponent