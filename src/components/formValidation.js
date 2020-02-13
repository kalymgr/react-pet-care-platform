/**
 * This module contains the form validation functions, that will be used by the various rules.
 * It also contains helper functions for the forms
 */

import React, { Component } from 'react';
import { Errors} from 'react-redux-form';

 // field is required
 export const required = (val) => val && val.length;

 // minimum length
 export const minLength = (len) => (val) => val && (val.length >= len);

 // maximum length
 export const maxLength = (len) => (val) => !val || (val.length <= len);

 // email valid format
 export const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

 // field contains number
 export const isNumber = (val) => !isNaN(Number(val));

 // number greated or equal to
 export const greaterOrEqualTo = (limit) => (val) => !val || (val >= limit);


 /**
  * Function for showing the Errors component on the form field
  * @param modelName the name of the field in the redux form 
  * @param messages object containing the error messages per validator
  * @returns the Errors component, having set the parameters given to the function
  */
 export const myFormErrors  = (modelName, messages) => {
     return (
        <Errors 
        className = "text-danger"
        model = {modelName}
        show = "touched"
        messages = {messages}
    />
     )
 }