import { Popup } from "semantic-ui-react";
import React from "react";

function MyPopup({content, children}){

    //children is the content for the trigger pop

    return <Popup inverted content={content} trigger={children}/>
}

export default MyPopup