import React, { useState, useEffect } from 'react'
import { isEmpty,size, update } from 'lodash'
import {addDocument, getCollection, deleteDocument} from './actions'

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
        setPets(result.data)        
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


  const addPet = async(e) => {
    e.preventDefault()
    const result = await addDocument("pets", {petName:pet.petName, petType:pet.petType, petBreed:pet.petBreed, birthDay:pet.birthDay,
      ownerName:pet.ownerName, ownerCellphone:pet.ownerCellphone, ownerAdrress:pet.ownerAdrress, ownerMail:pet.ownerMail})
    if (!result.statusResponse) {
      setError(result.error)
      return
    }
    setPets([...pets, {petName:pet.petName, petType:pet.petType, petBreed:pet.petBreed, birthDay:pet.birthDay,
      ownerName:pet.ownerName, ownerCellphone:pet.ownerCellphone, ownerAdrress:pet.ownerAdrress, ownerMail:pet.ownerMail }])
      console.log(pet.petName)
    setPet({
      id: "",petName : "", petType : "",petBreed : "",birthDay : "",ownerName : "",ownerCellphone : "", ownerAdrress : "",ownerMail : ""
    })
  }

  const deletePet = async(id) =>{
    console.log(id)
    const result = await deleteDocument("pets", id)
    if (!result.statusResponse) {
      setError(result.error)
      return
    }

    const filteredPet = pets.filter(pet =>pet.id != id)
    setPets(filteredPet)
  }


  return (
    <div className="container mt-5">
      <h1>Veterinaria</h1>
     <hr/>
     <div className="row">
       <div className="col-8">
         <h4 className="text-center">Pets</h4>
          <ul className="list-group">
                  <table class="table table-sm table-bordered">
                      <li className="list-group">
                        <thead class="thead-dark">
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
                    </li>
                    {
                      size(pets) === 0 ? (
                        <li className="text-center">There are no pets</li>
                      ) : (
                        <ul className="list-group">
                          {
                            pets.map((pe) => (
                              <li className="list-group" key={pe.id} >
                              <tbody>
                              <tr>
                                <th scope="row">{pe.petName}</th>
                                <td>{pe.petName}</td>
                                <td>{pe.petType}</td>
                                <td>{pe.petBreed}</td>
                                <td>{pe.birthDay}</td>
                                <td>{pe.ownerName}</td>
                                <td>{pe.ownerCellphone}</td>
                                <td>{pe.ownerAdrress}</td>
                                <td>{pe.ownerMail}</td>
                                <td>
                                <button
                                  className="btn btn-primary btn-sm mx-2"
                                >
                                  Editar
                                </button>
                                <button className="btn btn-secondary btn-sm"
                                onClick={() => deletePet(pe.id)}>
                                   Eliminar
                                </button>    
                               </td>
                              </tr>
                            </tbody>
                            </li>
                            ))
                          }
                        </ul>
                      )    
                    }     
                    </table>              
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
            value={pet.petName}
            name="petName"
            required
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Type..."
            onChange={saveInput}
            value={pet.petType}
            name="petType"
            required
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Breed..."
            onChange={saveInput}
            value={pet.petBreed}
            name="petBreed"
            required
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's BirthDay..."
            onChange={saveInput}
            value={pet.birthDay}
            name="birthDay"
            required
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Owner Name..."
            onChange={saveInput}
            value={pet.ownerName}
            name="ownerName"
            required
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Owner Phone Number..."
            onChange={saveInput}
            value={pet.ownerCellphone}
            name="ownerCellphone"
            required
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Owner Address..."
            onChange={saveInput}
            value={pet.ownerAdrress}
            name="ownerAdrress"
            required
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Owner Mail..."
            onChange={saveInput}
            value={pet.ownerMail}
            name="ownerMail"
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