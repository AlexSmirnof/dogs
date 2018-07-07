import React, { Component } from 'react';


const headerHeight = 64;
const itemHeight = 200;

const LazyScroll = ScrolledComponent => 
    
 class extends Component {

        state = {
            limit: 40,
            step: 3
        }

        componentDidMount(){
            window.addEventListener('scroll', this.handleScroll);
        }
        componentWillUnmount(){
            window.removeEventListener('scroll', this.handleScroll);
        }

        handleScroll = e => {
            const { sagaFetchMoreDogsAction } = this.props;
            const clientHeight = window.document.body.clientHeight;
            const scrollTop = window.document.scrollingElement.scrollTop;
            const { data:{length}, search } = this.props;
            const { limit, step } = this.state;
            const restRowNumber = Math.round((clientHeight - scrollTop)/200);

            if (restRowNumber < 6){
                if (limit < length){
                    this.setState({limit:limit+step});
                } 
                else if (sagaFetchMoreDogsAction && this.isRandomData()){
                    sagaFetchMoreDogsAction(step);
                    this.setState({limit:limit+step});                
                }               
            }
        }

        isRandomData = () => {
            const { search = "" } = this.props;
            return search === ''  || search === 'random';
        }

        render(){
            const {data, sagaFetchMoreDogsAction, ...rest} = this.props;
            const { limit } = this.state;
            return (
                <ScrolledComponent
                    {...rest}
                    data={data.slice(0, limit)}
                />
            )
        }
    }

export default LazyScroll;