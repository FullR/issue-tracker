import React from "react";

export default function bindComponent(Component, boundProps) {
  return function BoundComponent(props) {
    return (<Component {...props} {...boundProps}/>);
  };
}
