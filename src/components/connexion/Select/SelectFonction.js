import React from 'react';
import Form from 'react-bootstrap/Form'

const SelectFonction = ({placeholder,name, handleChange, options}) => (
        <div className="form-group">
          <Form.Group controlId="exampleForm.ControlSelect1">
            <label htmlFor={name}></label>
            <Form.Control as="select" defaultValue='' name={name} onChange={handleChange}>
            <option value='' disabled >{placeholder}</option>
            {options.map(option => ( 
                <option 
                  key={option.id_fonction}
                  value={option.id_fonction}
                  >
                    {option.fonction}
                </option>
              ))}  
            </Form.Control>
          </Form.Group>
        </div>
)


export default SelectFonction;