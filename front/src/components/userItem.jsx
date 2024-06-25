import React from "react";

const UserItem = (props) => {
    // console.log(props)
    if (props && props.id) {
        return (<>{props.id}</>)
    }else if (props && props.name) {
        return (<>{props.name}</>)
    }else{
        return (<>{props.email}</>)
    }
};

export default UserItem;