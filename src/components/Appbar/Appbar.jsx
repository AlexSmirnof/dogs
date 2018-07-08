import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import { ExitToApp, ViewCarousel, GridOn, Favorite, History, Search, Close, Delete } from '@material-ui/icons';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Settings from '../Settings/Settings';
import { BreedsList } from '../BreedsList/BreedsList';


const NavItems = [
    {
        label: 'Gallery',
        route: '/gallery',
        icons: [<GridOn/>,<ViewCarousel/>]
    },
    {
        label: 'Favorites',
        route: '/favorites',
        icon: <Favorite/>
    },
    {
        label: 'Trash',
        route: '/trash',
        icon: <Delete/>
    },
    {
        label: 'History',
        route: '/history',
        icon: <History/>
    }
]

const style = {
    search: {
        display: 'flex',
        paddingLeft: 5,
        alignItems:'center', 
        height:64, 
        position:'fixed',
        width:'100%',
        top:0,
        left:0,
        background:'rgba(255,255,255)',
        zIndex:1200
    },
    searchInput:{
        width:'94%',
        margin:'0 5px'
    },
    searchIcon:{
        margin:'0 10px',
        cursor:'pointer'
    },
    nvStyle:{
        width:65, 
        float:'left',
        display:'inline-block',
        marginRight:2
    },
    searchClose:{
        marginRight:60,
        cursor:'pointer'
    }
}


class Appbar extends Component {

    state = {
        selectedIndex: 0,
        title: 'Gallery',
        search:'',
        showNav: true,
        showSearch: false,
        showBreeds: false     
    }
    searchInputRef = input => {
        if(input){
            this.searchInput = input;
            input.focus();
        }
    } 
    seachInputFocus = () => {
        if(this.props.path !== '/') this.props.forwardRouteAction('/');
        this.setState({showBreeds: true});
    }
    onBreed = breed => this.onSearch(breed);

    onEnter = ({keyCode}) => {
        if(keyCode === 13) this.onSearch(this.state.search);
    }
    onSearch = search => {
        this.searchInput.blur();
        this.setState({...{search}, showBreeds:false});
        this.props.searchAction(search);
    }

    signout = e => {
        e.stopPropagation();
        this.setState({showBreeds: false});
        this.props.signOutAction();
    }
    matchRoute = (path, route) => path === route || path.split('/')[1] === route.split('/')[1];

    select = ({index: selectedIndex, route, label: title}) => {
        this.setState({selectedIndex,title});
        this.props.forwardRouteAction(`${route}`);
    }

    showNavigation = () => this.setState({showNav: !this.state.showNav});

    showSearch = e => {
        e.stopPropagation();
        this.setState({ 
            search: '',
            showSearch: !this.state.showSearch, 
            showNav:this.state.showSearch, 
            showBreeds:!this.state.showSearch
        });
        this.props.searchAction('');
    } 

    search = (_,search) => { 
        console.log('DOGS: ', search);
        this.setState({search});
    }

    render(){
        const { path, breeds, message, settings={} } = this.props;
        const { clearMessageAction, setSettingsAction } = this.props;
         
        const { title, search, showNav, showSearch, showBreeds } = this.state;
        return (
            <div style={{marginBottom:4}}>
                <AppBar title={title}
                        onClick={() => this.showNavigation()}
                        iconElementRight={<span><Search onClick={this.showSearch} style={{marginRight:10}}/><ExitToApp/></span>} 
                        iconStyleRight={{color:'white',paddingTop:11,paddingRight:10,transform:'scale(1.2)',cursor:'pointer'}}
                        onRightIconButtonClick={this.signout}
                        /> 
                {
                    showSearch &&
                    <div style={style.search}>
                        <Search style={style.searchIcon} onClick={()=>this.onSearch(search)}/>
                        <TextField value={search}
                                style={style.searchInput}
                                hintText="Search"
                                underlineShow={false}
                                ref={this.searchInputRef}
                                onFocus={this.seachInputFocus}
                                onChange={this.search}
                                onKeyDown={this.onEnter}
                            />
                        <Close style={style.searchClose} onClick={this.showSearch}/>       
                    </div>
                }
                {
                    showNav &&
                    <div style={style.nvStyle}>
                        {NavItems.map(({label, route, icon, icons}, index) => (
                                    <MenuItem
                                            key={`${label}-${index}`} 
                                            onClick={() => this.select({index,route,label})}
                                        >
                                        <NavigationItem {...{label, icon:icons?icons[+settings.slides]:icon, selected: (this.matchRoute(path,route))}}/>
                                    </MenuItem>         
                                    )
                                )}
                    </div>
                }
                {
                    showBreeds && 
                    <BreedsList 
                        breeds={breeds} 
                        onBreed={this.onBreed} 
                        onSubBreed={this.onBreed}
                    />  
                }

                <Settings settings={settings} setSettingsAction={setSettingsAction} />            

                <Snackbar open={!!message}
                          message={message}
                          autoHideDuration={2500}
                          onRequestClose={clearMessageAction}/>
            </div>
        )
    }
}

const NavItemStyle = {
    root: {
        fontSize:'small',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        marginRight:-4
    },
    icon: {
        display:'flex',
        justifyContent:'center',
        paddingTop:10,
        marginBottom:-5
    },
    label:{
        display:'flex',
        justifyContent:'center'
    }
}

const NavigationItem = ({icon, label, selected}) => (
    <div style={{...NavItemStyle.root,...{color: selected ? '#00B8D4':'#424242'}}}>
        <div style={NavItemStyle.icon}>{icon}</div>
        <div style={NavItemStyle.label}>{label}</div>
    </div>
)

export default Appbar;



