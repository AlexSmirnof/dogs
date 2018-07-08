import React, {Component} from 'react';
import {GridList} from 'material-ui/GridList';
import Popup from '../Popup/Popup';
import { extractHost, capitalize } from '../../utils/utils';
import GridItem from './GridItem';


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

    favorite = dog => {
        if(dog && this.props.favorites[dog.url]){
            this.props.removeFavoriteAction && this.props.removeFavoriteAction(dog);
        } else {
            this.props.addFavoriteAction && this.props.addFavoriteAction(dog);
        }
    }

    remove = dog => this.props.removeDogAction && this.props.removeDogAction(dog);

    restore = dog => this.props.restoreDogAction && this.props.restoreDogAction(dog);

    render(){
        const { data = [], favorites = {}, restoreDogAction, fetchBreed, forwardBreed } = this.props;
        const { popup } = this.state;
        return (
            <div style={{...styles.root}}>
                <GridList
                        cols={5}
                        padding={2}
                        cellHeight={200}
                        >
                    {data.map(({url,breed,type},index) => (
                        <GridItem 
                            key={`${url}-${index}`}
                            url={url}
                            title={capitalize(breed)}
                            host={extractHost(url)}
                            type={type}
                            isTrash={!!restoreDogAction}
                            isFavorite={favorites[url]}
                            onFavorite={()=>this.favorite({url,breed})}
                            onRemove={()=>this.remove({url,breed})}
                            onRestore={()=>this.restore({url,breed})}
                            forwardBreed={forwardBreed}
                            fetchBreed={fetchBreed}
                            onClick={() => this.popup(url)}
                            />
                    ))}
                </GridList>
                {popup && <Popup item={popup} close={this.closePopup}/>}
                </div>   
        )
    }

}


export default Grid;