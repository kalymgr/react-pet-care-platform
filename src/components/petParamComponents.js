import React, { Component } from 'react';
import { Control} from 'react-redux-form';


/**
 * Function - react component that returns a select box with the pet species
 * @param {*} formModel the redux form model (part of the props parameter), connected to the select box
 * @returns the component
 */
export const PetSpeciesSelectBox = ({formModel=".species"}) =>
{
    return (
        <Control.select model={formModel} name="species" className="form-control">
            <option>dog</option>
            <option>cat</option>
            <option>other</option>
        </Control.select>
    )
}


