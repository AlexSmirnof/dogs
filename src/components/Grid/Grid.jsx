import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Popup from '../Popup/Popup';
import { StarBorder, Star, Delete, Replay } from '@material-ui/icons';
import { extractHost, capitalize } from '../../utils/utils';
import { BreedsList } from '../BreedsList/BreedsList';


const styles = {
    root: { 
      paddingRight:4,
      paddingLeft:4
    },
    gridList: {
      width: 500,
      height: 450,
      overflowY: 'auto',
    }
  };

class Grid extends Component {

    state = {
        popup: null
    }

    popup = url => {
        this.setState({popup:url});
        this.props.viewAction && this.props.viewAction({url});
    }

    closePopup = () => this.setState({popup:null});

    favorite = (event, dog) => {
        event.stopPropagation();
        if(dog && this.props.favorites[dog.url]){
            this.props.removeFavoriteAction && this.props.removeFavoriteAction(dog);
        } else {
            this.props.addFavoriteAction && this.props.addFavoriteAction(dog);
        }
    }

    removeOrRestore = (event,dog) => {
        event.stopPropagation();
        if (this.props.restoreDogAction) {
            this.props.restoreDogAction && this.props.restoreDogAction(dog);
        } else {
            this.props.removeDogAction && this.props.removeDogAction(dog);
        }
    }

    render(){
        const { data = [], favorites = {}, removed = {}, restoreDogAction } = this.props;
        const { popup } = this.state;
        return (
            <div style={{...styles.root}}>
                <GridList
                        cols={5}
                        padding={2}
                        cellHeight={200}
                        >
                    {data.map(({url,breed,type},index) => (
                        <GridTile
                                key={`${url}-${index}`}
                                title={capitalize(breed)}
                                subtitle={<span>from <a href={url} target="blank" onClick={e=>e.stopPropagation()}>{extractHost(url)}</a></span>}
                                actionIcon={
                                        type 
                                        ? 
                                        <span style={{color:'white'}}>{type}</span> 
                                        :
                                        <span>
                                            {(!restoreDogAction) && <FavStar favorite={favorites[url]} onStar={e=>this.favorite(e,{url,breed})}/>}
                                            <Remove show={restoreDogAction} onRemove={e=>this.removeOrRestore(e,{url,breed})} /> 
                                         </span>}
                                onClick={() => this.popup(url)}
                                >
                            <img src={url}/>
                        </GridTile>
                    ))}
                </GridList>
                {popup && <Popup item={popup} close={this.closePopup}/>}
                </div>   
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

const Remove = ({show, onRemove}) => (
    <IconButton style={{...CommonStyle,marginRight:-8}}
        onClick={onRemove} >
        {show ? <Replay/> : <Delete/>}
    </IconButton>
)


export default Grid;