import React from 'react';

const Error = ({ mensaje, tipo }) => {
   
        if (tipo === 'error') {
            return <p className="error">{mensaje}</p>
        } else {
            return <p className="success">{mensaje}</p>
        }
      
    
}
 
export default Error;