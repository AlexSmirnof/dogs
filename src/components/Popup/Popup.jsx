import React from 'react';

const popUpStyle = {
    backgroundColor:'rgba(0,0,0,0.9)',
    position:'fixed',
    top: 0,
    left: 0,
    height:'100%',
    width:'100%',
    textAlign:'center',
    paddingTop:150,
    zIndex:1500
}

export default ({item,close}) => (
    <div onClick={close} style={{...popUpStyle}}>
        <img src={item}/>
    </div>
)