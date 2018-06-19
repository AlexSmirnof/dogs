import React from 'react';


const headerHeight = 64;

const LazyScroll = Component => {
    
    return class extends Component {

        

        componentDidMount(){
            window.addEventListener('scroll', this.handleScroll);
        }
        componentWillUnmount(){
            window.removeEventListener('scroll', this.handleScroll);
        }

        handleScroll = e => {
            const viewHeight = window.innerHeight;
            const prevScrollY = this.scrollY || 0;
            const curScrollY = window.scrollY;
            
  
            console.log(window.innerHeight);
            console.log(window.document.documentElement.clientHeight);       
            console.log(window.document.body.clientHeight);                             
            console.log(window.document.scrollingElement.scrollTop);
           console.log(window.scrollY);
        }
    }
}; 

export default LazyScroll;