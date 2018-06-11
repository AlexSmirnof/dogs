import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import { StarBorder, Star, Delete } from '@material-ui/icons';
import { extractHost, capitalize } from '../../utils/utils';
import Toggle from 'material-ui/Toggle';

class View extends Component {
    
    state = {
        index: 0
    }
    static getDerivedStateFromProps({data}, {index}){
        if (data.length <= index) return {index:data.length-1}
        return {index};
    }

    prev = () => {
        const max = this.props.data.length - 1;
        const index = this.state.index - 1;
        if (index > -1 ){
            this.setState({index:  index > max ? max : index})
        } else {
            this.setState({index: max})
        }
    }
    next = () => {
        const max = this.props.data.length - 1;
        const index = this.state.index + 1;
        if (index > max || index < 0){
            this.setState({index: 0})
        } else {
            this.setState({index})
        }
    }
    favorite = (dog) => {
        if(this.props.favorites[dog.url]){
            this.props.removeFavorite(dog);
        } else {
            this.props.addFavorite(dog);
        }
    }
    
    render(){
        let {index,popup} = this.state;
        const { data = [], favorites, addFavorite, removeFavorite, removeDog } = this.props;
        if (data.length === 0) return null;
        const dog = data[index];
        return (
            <div>
                <div style={{minHeight:700,display:'flex', justifyContent:'space-evenly',alignItems:'center'}}>
                    <div>
                        <div style={{height:'100%'}}></div>
                        <RaisedButton 
                            style={{width:120,height:50}}
                            label={'Previous'} 
                            primary={true} 
                            onClick={this.prev}
                            />
                    </div>    
                    <div>
                        <div style={{height:'100%'}}></div>
                        <Card>
                            <CardMedia
                                overlay={<CardTitle 
                                            title={capitalize(dog.breed)} 
                                            subtitle={<span>from <a href={dog.url} target="blank" onClick={e=>e.stopPropagation()}>{extractHost(dog.url)}</a></span>} 
                                            children={<div style={{position:'absolute',right:0,top:15}}>
                                                <FavStar favorite={favorites[dog.url]} onStar={()=>this.favorite(dog)}/>
                                                <Remove onRemove={()=>removeDog(dog)} />
                                            </div>}
                                            />}     
                            >
                                <img src={dog.url}/>
                            </CardMedia>
                        </Card>
                    </div>                
                    <div>
                        <div style={{height:'100%'}}></div>
                        <RaisedButton 
                            style={{width:120,height:50}}
                            label={'next'} 
                            primary={true} 
                            onClick={this.next}
                            />
                    </div>  
                </div>
            </div>
    );
}
}

const CommonStyle = {
    color:'rgb(255,255,255)',
    marginRight:-10
}
const FavStar = ({favorite, onStar}) => (
    <IconButton 
        style={{...CommonStyle}}
        onClick={onStar}
        >
        {favorite?<Star/>:<StarBorder/>}
    </IconButton>  
)

const Remove = ({onRemove}) => (
    <IconButton style={{...CommonStyle,marginRight:0}}
        onClick={onRemove} >
        <Delete/>
    </IconButton>
)
  
  export default View;