import React, { useState, useEffect } from 'react'
import { isEmpty,size, update } from 'lodash'
import {addDocument, getCollection} from './actions'

function App() {
  const [pets, setPets] = useState([])
  const [pet, setPet] = useState({
    id: "",petName : "", petType : "",petBreed : "",birthDay : "",ownerName : "",ownerCellphone : "", ownerAdrress : "",ownerMail : ""
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    (async()=>{
      const result = await getCollection("pets")
      if (result.statusResponse) {
        setPets(...pets, result.data)        
      }
    })()
  }, [])

  const saveInput = (event) =>{
    console.log(event.target.value)
    setPet({
      ...pet,
      [event.target.name]:event.target.value
    })
    
  }

  const validForm = () => {
    let isValid = true
    setError(null)
    if(isEmpty(pet.petName) || isEmpty(pet.petType) ||isEmpty(pet.petBreed) ||
    isEmpty(pet.birthDay) || isEmpty(pet.ownerName) || isEmpty(pet.ownerCellphone) ||
    isEmpty(pet.ownerAdrress) || isEmpty(pet.ownerMail)){
      setError("Please fill all fields")
      isValid = false 
    }
    return isValid
  }

  const addPet = async(e) => {
    e.preventDefault()
    //if (!validForm()){
     // return
    //}
    const result = await addDocument("pets", {petName:pet.petName, petType:pet.petType, petBreed:pet.petBreed, birthDay:pet.birthDay,
      ownerName:pet.ownerName, ownerCellphone:pet.ownerCellphone, ownerAdrress:pet.ownerAdrress, ownerMail:pet.ownerMail})
    if (!result.statusResponse) {
      setError(result.error)
      return
    }

    //setPets([...pets, {id: result.data.id, petName:pets.petName, petType:pets.petType, petBreed:pets.petBreed, birthDay:pets.birthDay,
     // ownerName:pets.ownerName, ownerCellphone:pets.ownerCellphone, ownerAdrress:pets.ownerAdrress, ownerMail:pets.ownerMail }])

    //setTask("")
  }


  return (
    <div className="container mt-5">
      <h1>Veterinaria</h1>
     <hr/>
     <div className="row">

       <div className="col-8">
         <h4 className="text-center">Pets</h4>

          <ul className="list-group">
            <li className="list-group-item">
              
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Pet's Name</th>
                        <th scope="col">Pet's Type</th>
                        <th scope="col">Pet's Breed</th>
                        <th scope="col">Pet's BirthDay</th>
                        <th scope="col">Owner Name</th>
                        <th scope="col">Owner Phone Number</th>
                        <th scope="col">Owener Address</th>
                        <th scope="col">Owener Mail</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    </table>
                    <table className="table">
                    {
                      size(pets) === 0 ? (
                        <li className="text-center">There are no pets</li>
                      ) : (
                        <ul className="list-group">
                          {
                            pets.map((pets) => (
                              <tbody>
                              <tr>
                                <th>{pets.petName}</th>
                                <td>{pets.petType}</td>
                                <td>{pets.petBreed}</td>
                                <td>{pets.birthDay}</td>
                                <td>{pets.ownerName}</td>
                                <td>{pets.ownerCellphone}</td>
                                <td>{pets.ownerAdrress}</td>
                                <td>{pets.ownerMail}</td>
                                <td>
                                <button
                                  className="btn btn-primary btn-sm float-right mx-2"
                                >
                                  Editar
                                </button>
                                <button className="btn btn-secondary btn-sm">
                                   Eliminar
                                </button>    
                               </td>
                              </tr>
                            </tbody>
                            ))
                          }
                        </ul>
                      )    
                    }     
                    </table>              
            </li>
            
          </ul>
       </div>

       <div className="col-3">
         <h4>Add Pet</h4>
          <form onSubmit={addPet}>
            {
              error && <span className="text-danger">{error}</span>
            }   
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's name..."
            onChange={saveInput}
            value={pets.petName}
            name="petName"
            required
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Type..."
            onChange={saveInput}
            value={pets.petType}
            name="petType"
            required
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Breed..."
            onChange={saveInput}
            value={pets.petBreed}
            name="petBreed"
            required
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's BirthDay..."
            onChange={saveInput}
            value={pets.birthDay}
            name="birthDay"
            required
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Owner Name..."
            onChange={saveInput}
            value={pets.ownerName}
            name="ownerName"
            required
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Owner Phone Number..."
            onChange={saveInput}
            value={pets.ownerCellphone}
            name="ownerCellphone"
            required
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Owner Address..."
            onChange={saveInput}
            value={pets.ownerAdrress}
            name="ownerAdrress"
            required
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Owner Mail..."
            onChange={saveInput}
            value={pets.ownerMail}
            name="owenerMail"
            required
            />
            <button
            className="btn btn-dark btn-block"
            type="submit"
            >Crear</button>
          </form>
       </div>
     </div>
    </div>
  );
}

export default App;