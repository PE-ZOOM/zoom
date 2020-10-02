import React from 'react';
import Form from 'react-bootstrap/Form'

const SelectStructure = ({placeholder,name, handleChange, options, required}) => (
      <div className="form-group">
          <Form.Group controlId="exampleForm.ControlSelect1">
            <label htmlFor={name}></label>
            <Form.Control as="select" defaultValue='' name={name} onChange={handleChange} required={required}>
            <option value='' disabled >{placeholder}</option>
            {options.map(option => ( 
                <option 
                  key={option.id_ape}
                  value={option.id_ape}
                  >
                    {option.libelle_ape}
                </option>
              ))}  
            </Form.Control>
          </Form.Group>
        </div>
)


export default SelectStructure;