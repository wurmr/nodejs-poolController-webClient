import '../../css/dropdownselect';

import React, { useEffect, useState } from 'react';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import { getItemById, IConfigCircuit, IConfigPumpCircuit } from '../PoolController';

interface Props
{
    availableCircuits: IConfigCircuit[];
    currentPumpCircuit: IConfigPumpCircuit
    disabled: boolean
    onChange: (pumpCircuit: number, obj: any)=>void
    onDelete: (pumpCircuit: number)=>void
}

function PumpConfigSelectCircuit(props: Props){
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const handleClick = ( event: any ) =>
    {
        console.log( `changing  circuitSlot=${ props.currentPumpCircuit.id } type to circuit ${ event.target.value } (${ getItemById(props.availableCircuits, parseInt(event.target.value, 10)) .name })` )
        let removeIDs = props.availableCircuits.filter(el=>{
            return el.name==='Not Used' || el.name==='delete' || el.name==="Remove" || el.name === 'none'
        }).map(el=>el.id)
        console.log(`REMOVE IDS? ${removeIDs}`)
        if (removeIDs.includes(parseInt(event.currentTarget.value, 10))){
            props.onDelete(props.currentPumpCircuit.id)
        }
        else
        props.onChange(props.currentPumpCircuit.id, {circuit: parseInt( event.target.value, 10 )})
    }

    const circuitSelectors = () =>
    {
        let dropdownChildren: React.ReactFragment[] = [];
/*         for ( let i = 0; i < props.availableCircuits.length; i++ )
        {
            // insert first header
            if (i === 0) dropdownChildren.push(<DropdownItem key={`${ props.currentPumpCircuit.id }${ i*100 }CircuitSelect`} header={true} >{props.availableCircuits[ i ].type}</DropdownItem>)
            // insert divider
            if (i > 0 && props.availableCircuits[ i ].type !== props.availableCircuits[ i-1 ].type ){

                dropdownChildren.push(<DropdownItem key={`${ props.currentPumpCircuit.id }${ i*100 }CircuitSelect`} divider={true}></DropdownItem>)
                dropdownChildren.push(<DropdownItem key={`${ props.currentPumpCircuit.id }${ i*101 }CircuitSelect`} header={true}>{ i===props.availableCircuits.length-1?'':props.availableCircuits[ i ].type}</DropdownItem>)
            }
            let circ = props.availableCircuits[ i ];
            let displayText = circ.name==='Remove'?(<p className='text-danger' color='red'>{circ.name}</p>):circ.name;

            let entry:React.ReactFragment = ( <DropdownItem key={`${ props.currentPumpCircuit.id }${ circ.id }CircuitSelect`}
                value={circ.id}
                onClick={handleClick} 
                disabled={typeof circ.type === 'undefined'}
            >{displayText}</DropdownItem> )
            dropdownChildren.push( entry );
        } */

        props.availableCircuits.forEach(circ => {
            let entry:React.ReactFragment = ( <DropdownItem key={`${ props.currentPumpCircuit.id }${ circ.id }CircuitSelect`}
                value={circ.id}
                onClick={handleClick} 
                disabled={typeof circ.type === 'undefined' && circ.id !== 255}
            >{circ.name}</DropdownItem> )
            dropdownChildren.push( entry );
        });


        return dropdownChildren;
    }
    const label = () => {
        if (props.currentPumpCircuit.circuit === 0) return 'Not Used'
        return getItemById(props.availableCircuits, props.currentPumpCircuit.circuit).name;
    }
        return (
        <>
        <ButtonDropdown 
        direction="right"
        size='sm' 
        isOpen={dropdownOpen} 
        toggle={()=>setDropdownOpen(!dropdownOpen)}
        style={{ width: '60%' }}
        className='fullWidth'
        >
            <DropdownToggle 
            disabled={props.disabled}
            // color={props.currentPumpCircuit.circuit.isOn?'success':'secondary'}
            caret >
                {label()}
            </DropdownToggle>
            <DropdownMenu 
            modifiers={{
                setMaxHeight: {
                    enabled: true,
                    order: 890,
                    fn: (data) =>{
                        return {
                            ...data,
                            styles: {
                                ...data.styles,
                                overflow: 'auto',
                                maxHeight: '400px'
                            }
                        }
                    }
                }
            }}
            >
               {circuitSelectors()}
            </DropdownMenu>
        </ButtonDropdown>
  </>
    )
}

export default PumpConfigSelectCircuit;