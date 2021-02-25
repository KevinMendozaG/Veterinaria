import React, { useState, useEffect } from 'react'
import { isEmpty,size, update } from 'lodash'
import {addDocument, getCollection} from './actions'

function App() {
  const [pets, setPets] = useState({
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

  const setPet = (event) =>{

    setPets({
      ...pets,
      [event.target.name]:event.target.value
    })
    
  }

  const validForm = () => {
    let isValid = true
    setError(null)
    if(isEmpty(pets.petName) || isEmpty(pets.petType) ||isEmpty(pets.petBreed) ||
    isEmpty(pets.birthDay) || isEmpty(pets.ownerName) || isEmpty(pets.ownerCellphone) ||
    isEmpty(pets.ownerAdrress) || isEmpty(pets.ownerMail)){
      setError("Please fill all fields")
      isValid = false 
    }
    return isValid
  }

  const addPet = async(e) => {
    e.preventDefault()
    if (!validForm()){
      return
    }
    const result = await addDocument("pets", {petName:pets.petName, petType:pets.petType, petBreed:pets.petBreed, birthDay:pets.birthDay,
      ownerName:pets.ownerName, ownerCellphone:pets.ownerCellphone, ownerAdrress:pets.ownerAdrress, ownerMail:pets.ownerMail})
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

                    {
                      size(pets) === 0 ? (
                        <li className="list-group-item">There are no pets</li>
                      ) : (
                        <ul>
                          {
                            pets.map((pets) => (
                              <tbody>
                              <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button
                                      className="btn btn-primary btn-sm"
                                      >
                                        Editar
                                    </button>
                                    <button className="btn btn-secondary btn-sm">
                                        Eliminar
                                    </button>
                                </div>
                                
                                
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

       <div className="col-4">
         <h4>Add Pet</h4>
          <form onSubmit={addPet}>
            {
              error && <span className="text-danger">{error}</span>
            }   
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's name..."
            onChange={(text) => setPets( {...pets, petName:text.target.value})}
            value={pets.petName}
            name="petName"
            onChange = {setPet}
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Type..."
            onChange={(text) => setPets({...pets, petType:text.target.value})}
            value={pets.petType}
            name="petType"
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Breed..."
            onChange={(text) => setPets({...pets, petBreed:text.target.value})}
            value={pets.petBreed}
            name="petBreed"
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's BirthDay..."
            onChange={(text) => setPets({...pets, birthDay:text.target.value})}
            value={pets.birthDay}
            name="birthDay"
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Owner Name..."
            onChange={(text) => setPets({...pets, ownerName:text.target.value})}
            value={pets.ownerName}
            name="ownerName"
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Owner Phone Number..."
            onChange={(text) => setPets({...pets, ownerCellphone:text.target.value})}
            value={pets.ownerCellphone}
            name="ownerCellphone"
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Owner Address..."
            onChange={(text) => setPets({...pets, ownerAdrress:text.target.value})}
            value={pets.ownerAdrress}
            name="ownerAdrress"
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Type pet's Owner Mail..."
            onChange={(text) => setPets({...pets, ownerMail:text.target.value})}
            value={pets.ownerMail}
            name="owenerMail"
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
