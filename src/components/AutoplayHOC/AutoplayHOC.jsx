import React, { Component } from 'react';


const headerHeight = 64;
const itemHeight = 200;

const AutoplayHOC = ViewedComponent => 
    
 class extends ViewedComponent {

        componentDidMount(){
            if(this.props.autoplay){
                this.clear = setInterval(this.next, 3500);
            }
        }
        componentWillUnmount(){
            this.clear && clearInterval(this.clear);
        }

    }

export default AutoplayHOC;