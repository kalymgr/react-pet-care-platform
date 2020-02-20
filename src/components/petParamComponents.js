import React, { Component } from 'react';
import { Control} from 'react-redux-form';
import {Input} from 'reactstrap';


/**
 * Function - react component that returns a select box with the pet species
 * If the select component is connected to redux store, Control.select is returned
 * Else simple Input is returned
 * @param {*} formModel the redux form model (part of the props parameter), connected to the select box
 * @returns the component
 */
export const PetSpeciesSelectBox = ({formModel, elementId}) =>
{
    if (formModel)  // case the select box is connected to redux store
    {
        return (
            <Control.select id={elementId} model={formModel} name="species" className="form-control">
                <option>dog</option>
                <option>cat</option>
                <option>other</option>
            </Control.select>
        )
    }
    else {  // case the select box is NOT connected to redux store
        return (
            <Input id={elementId} type="select" name="species" className="form-control">
                <option>dog</option>
                <option>cat</option>
                <option>other</option>
            </Input>
        )
    }
}


