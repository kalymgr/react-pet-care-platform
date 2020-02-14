import React from 'react';


/**
 * Component for showing loading, till data is fetched
 */
 export const Loading = () => {
     return (
         <div className="col-12">
             <span className = "fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
             <p>Loading ...</p>
         </div>
     )
 }