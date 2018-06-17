import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';



// https://stackoverflow.com/questions/14578356/how-to-detect-when-an-image-has-finished-rendering-in-the-browser-i-e-painted

export default class extends Component {

    state = {
        loading: true,
        failed: false
    }

    componentDidMount(){
        this.fetchImage();
    }

    componentWillUnmount(){
        this.clear();
    }

    fetchImage(){
        this.image = new Image();
        this.image.addEventListener('load', this.onLoad);
        this.image.addEventListener('error', this.onError);
        this.image.src = this.props.src;
    }
    clear(){
        if(this.image){
            this.image.removeEventListener('load',this.onLoad);
            this.image.removeEventListener('error',this.onError);            
        }
    }

    onLoad = () => {
        this.setState({loading:false,failed:false});
    }
    onError = () => {
        this.clear();
        this.setState({loading:false,failed:true});
    }

    render(){
        if(this.state.loading){
            return (
                <div style={{display:'flex',backgroundColor:'#EEEEEE',height:'100%'}}>
                     <CircularProgress style={{margin:'auto',height:'50%'}} color="white"/>
                </div>
            )
        }
        if(this.image && !this.state.failed){
            return (
                <img src={this.image.src}/>
            )
        }
        return null;
    }


}