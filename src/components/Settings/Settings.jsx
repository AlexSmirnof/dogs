import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { Settings as SettingsIcon }from '@material-ui/icons';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';


const style = {
    position:'fixed',
    bottom:5,
    left:4
}

class Settings extends Component{


    settings = (set) => {
        this.props.setSettings({...this.props.settings,...set});
    }



    render(){

        const { settings = {grid:true,slides:false,autoplay:true} } = this.props;

        return(
            <div style={style}>
                <IconMenu
                    style={{paddingTop:10}}
                    clickCloseDelay={0}
                    iconButtonElement={<FloatingActionButton>
                                            <SettingsIcon />
                                       </FloatingActionButton>}
                    >
                   <MenuItem  key={`settings-grid`}>
                        <div style={{height:'12px'}}></div>
                            <Toggle
                                label="Grid"
                                labelPosition="right"
                                toggled={settings.grid}
                                onClick={()=>this.settings({grid:!settings.grid,slides:settings.grid})}
                                />
                    </MenuItem>
                    <MenuItem  key={`settings-slider`}>
                        <div style={{height:'12px'}}></div>
                            <Toggle
                                label="Slides"
                                labelPosition="right"
                                toggled={settings.slides}
                                onClick={()=>this.settings({slides:!settings.slides,grid:settings.slides})}
                                />
                    </MenuItem>
                    <MenuItem key={`settings-autoplay`}>
                        <div style={{height:'12px'}}></div>
                            <Toggle
                                label="Autoplay"
                                labelPosition="right"
                                toggled={settings.autoplay}
                                disabled={settings.grid}
                                onClick={()=>this.settings({autoplay:!settings.autoplay})}
                                />
                    </MenuItem>
                </IconMenu>
            </div>
        )
    }
}


export default Settings;