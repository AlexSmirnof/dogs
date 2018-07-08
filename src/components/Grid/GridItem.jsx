import React, {Component} from 'react';
import LoadingImage from '../LoadingImage/LoadingImage';
import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import { StarBorder, Star, Delete, Replay } from '@material-ui/icons';


export default class extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return this.props.isFavorite !== nextProps.isFavorite;
    }

    favorite = e => {
        e.stopPropagation();
        this.props.onFavorite();
    }

    remove = e => {
        e.stopPropagation();
        this.props.onRemove();
    }
    restore = e => {
        e.stopPropagation();
        this.props.onRestore();
    }
    onTitle = ({event,title}) => {
        event && event.preventDefault();
        event && event.stopPropagation();
        title && this.props.fetchBreed && this.props.fetchBreed(title.toLowerCase());
        title && this.props.forwardBreed && this.props.forwardBreed(`gallery/${title.toLowerCase()}`);
    }

    render (){
        const { key, url, title, host, type, isTrash, isFavorite, onClick } = this.props;
        const colorWhite = {color:'white'};
        const textDecoration = {textDecoration:'none'};
        
        return (
            <GridTile
                    key={key}
                    title={<a href="" style={textDecoration} onClick={event=>this.onTitle({event,title})}>{title}</a>}
                    subtitle={<span>from <a href={url} target="blank" onClick={e=>e.stopPropagation()}>{host}</a></span>}
                    actionIcon={
                            type 
                            ? 
                            <span style={colorWhite}>{type}</span> 
                            :
                            <span>
                                {
                                    isTrash
                                    ?
                                    <Restore onRestore={this.restore} /> 
                                    :
                                    <span>
                                        <FavStar favorite={isFavorite} onStar={this.favorite}/>
                                        <Remove onRemove={this.remove} /> 
                                    </span>
                                }
                                
                            </span>}
                    onClick={onClick}
                    >
                <LoadingImage src={url}/>
            </GridTile>
        )        
    }
}

const CommonStyle = {
    color:'rgb(255,255,255)',
    marginRight:-20
}
const FavStar = ({favorite, onStar}) => (
    <IconButton 
        style={CommonStyle}
        onClick={onStar}
        >
        {favorite?<Star/>:<StarBorder/>}
    </IconButton>  
)

const Remove = ({onRemove}) => (
    <IconButton style={{...CommonStyle,marginRight:-8}}
        onClick={onRemove} >
        <Delete/>
    </IconButton>
)

const Restore = ({onRestore}) => (
    <IconButton style={{...CommonStyle,marginRight:-8}}
        onClick={onRestore} >
        <Replay/>
    </IconButton>
)

