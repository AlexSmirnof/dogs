import React from 'react';
import {ListItem} from 'material-ui/List';
import {
    Table,
    TableBody,
    TableRowColumn,
  } from 'material-ui/Table';
  import { capitalize } from '../../utils/utils';



export const BreedsList = ({breeds, count = 0, onBreed}) => (
        <Table style={{marginLeft:15}}>
            <TableBody valign="top" displayRowCheckbox={false}>
                <TableRowColumn><BreedItems breeds={breeds.slice(count,count+=21)} onBreed={onBreed} /></TableRowColumn>
                <TableRowColumn><BreedItems breeds={breeds.slice(count,count+=15)} onBreed={onBreed} /></TableRowColumn>
                <TableRowColumn><BreedItems breeds={breeds.slice(count,count+=19)} onBreed={onBreed} /></TableRowColumn>
                <TableRowColumn><BreedItems breeds={breeds.slice(count,count+=13)} onBreed={onBreed} /></TableRowColumn>
                <TableRowColumn><BreedItems breeds={breeds.slice(count,count+=9)} onBreed={onBreed} /></TableRowColumn>
                <TableRowColumn><BreedItems breeds={breeds.slice(count,count+=5)} onBreed={onBreed} /></TableRowColumn>
            </TableBody>
        </Table>  
)

const BreedItemsStyle = {
    fontSize:'small', 
    color:'rgb(0, 184, 212)', 
    height:40
}

const BreedItems = ({ breeds=[], onBreed=()=>{} }) => [
            breeds.map(({breed,subBreeds},idx) => {
                const hasSubBreeds = subBreeds.length > 0;
                if(hasSubBreeds){
                    return (
                        <ListItem
                            key={`${breed}-${idx}`}
                            style={{...BreedItemsStyle,cursor:'default'}}
                            nestedListStyle={{padding:0}}
                            primaryText={capitalize(breed)}
                            initiallyOpen={true}
                            autoGenerateNestedIndicator={false}
                            nestedItems={[subBreeds.map((subBreed,idx) => (
                                <ListItem 
                                    key={`${subBreed}-${idx}`}
                                    style={{...BreedItemsStyle}}
                                    primaryText={capitalize(subBreed)}
                                    onClick={()=>onBreed(`${breed}-${subBreed}`)}
                                    />
                            ))]}
                            />
                    )
                }
                return (
                    <ListItem 
                            key={`${breed}-${idx}`}
                            style={{...BreedItemsStyle}}
                            primaryText={capitalize(breed)}
                            onClick={()=>onBreed(breed)}
                            />
                )
            })
]