import React, { useState, useEffect } from 'react'
import {size, update } from 'lodash'
import {addDocument, getCollection, deleteDocument, updateDocument} from './actions'
import swal from 'sweetalert'

function App() {
  const [editMode, setEditMode] = useState(false)
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

  const savePet = async(e) => {
    e.preventDefault()
    console.log(pet.id)
    console.log(pet.petName)
    const result = await updateDocument("pets", pet.id, {petName:pet.petName, petType:pet.petType, petBreed:pet.petBreed, birthDay:pet.birthDay,
      ownerName:pet.ownerName, ownerCellphone:pet.ownerCellphone, ownerAdrress:pet.ownerAdrress, ownerMail:pet.ownerMail})
    if (!result.statusResponse) {
      setError(result.error)
      return
    }
    const editedPets = pets.map(item => item.id === pet.id ? {id:pet.id, petName:pet.petName, petType:pet.petType, petBreed:pet.petBreed, birthDay:pet.birthDay,
      ownerName:pet.ownerName, ownerCellphone:pet.ownerCellphone, ownerAdrress:pet.ownerAdrress, ownerMail:pet.ownerMail} : item)
    setPets(editedPets)
    setEditMode(false)
    setPet({
      id: "",petName : "", petType : "",petBreed : "",birthDay : "",ownerName : "",ownerCellphone : "", ownerAdrress : "",ownerMail : ""
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
    setPets([...pets, {id: result.data.id,petName:pet.petName, petType:pet.petType, petBreed:pet.petBreed, birthDay:pet.birthDay,
      ownerName:pet.ownerName, ownerCellphone:pet.ownerCellphone, ownerAdrress:pet.ownerAdrress, ownerMail:pet.ownerMail }])
      console.log(pet.petName)
    setPet({
      id: "",petName : "", petType : "",petBreed : "",birthDay : "",ownerName : "",ownerCellphone : "", ownerAdrress : "",ownerMail : ""
    })
  }

  const showConfirmation = (id) => {
    swal({
      title: "Delete",
      text:"Do you want to delete the pet?",
      icon:"warning",
      buttons: ["no","yes"]
    }).then(respuesta => {
      if(respuesta){
        deletePet(id)
      }
    })
  }

  const deletePet = async(id) =>{
    console.log(id)
    const result = await deleteDocument("pets", id)
    if (!result.statusResponse) {
      setError(result.error)
      return
    }
    swal({text: "the pet was successfully deleted",
    icon: "success"
    })
    const filteredPet = pets.filter(pet =>pet.id != id)
    setPets(filteredPet)
  }

  const editPet = (thePet) =>{
    setPet({
      id: thePet.id,petName : thePet.petName, petType : thePet.petType,petBreed : thePet.petBreed,
      birthDay : thePet.birthDay,ownerName : thePet.ownerName,ownerCellphone : thePet.ownerCellphone, ownerAdrress : thePet.ownerAdrress,ownerMail : thePet.ownerMail
    })
    console.log("ok")
    setEditMode(true)
    //setId(theTask.id)
  }

  return (
    <div className="container mt-5">
      <button type="button" class="btn float-right btn-lg btn-outline-dark" data-toggle="modal" data-target="#exampleModal">
              { editMode ? "Update Pet" : "Create Pet"}
            </button>
      <h1>Veterinary</h1>
     <hr/>
     <div className="row">
       <div className="col-12">
         <h4 className="text-center">Pets</h4>
                    {
                      size(pets) === 0 ? (
                        <li className="text-center">There are no pets</li>
                      ) : (
                        <table class="table table-sm table-bordered">
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
                            <th scope="col" colspan="2" className="text-center">Actions</th>
                          </tr>
                        </thead>
                          <tbody>
                          {
                            pets.map((pe) => (
                              <tr key={pe.id}>
                                <td>{pe.petName}</td>
                                <td>{pe.petType}</td>
                                <td>{pe.petBreed}</td>
                                <td>{pe.birthDay}</td>
                                <td>{pe.ownerName}</td>
                                <td>{pe.ownerCellphone}</td>
                                <td>{pe.ownerAdrress}</td>
                                <td>{pe.ownerMail}</td>
                                <td colspan="2">
                                <div class="btn-group">
                                <button
                                  className="btn btn-primary btn-sm mx-2"
                                  onClick={() => editPet(pe)}
                                >
                                  Update
                                </button>
                                <button className="btn btn-secondary btn-sm"
                                onClick={() => showConfirmation(pe.id)}>
                                   Delete
                                </button>  
                                </div>  
                               </td>
                              </tr>
                            ))
                          }
                            </tbody>
                      
                      </table>              
                      )    
                    }     
       </div>

       <div className="col-3">

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{ editMode ? "Update Pet":"Create Pet"}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    
                  <form onSubmit={ editMode ? savePet : addPet}>
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
                  <div class="modal-footer">
                    <button
                    className={ editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"}
                    type="submit"
                    >{ editMode ? "Save" : "Create"}
                    </button>
                    <button type="button" class="btn btn-block btn-dark" data-dismiss="modal">Close</button>
                  </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
       </div>
     </div>
    </div>
  );
}

export default App;