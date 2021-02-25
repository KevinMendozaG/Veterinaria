import React, { useState, useEffect } from 'react'


function App() {
  const [pets, setPets] = useState({
    petName : "", petType : "",petBreed : "",birthDay : "",ownerName : "",ownerCellphone : "", ownerAdrress : "",ownerMail : ""
})

  const setPet = (event) =>{

    setPets({
      ...pets,
      [event.target.name]:event.target.value
    })

  }


  const addPet = () => {
    
  }


  return (
    <div className="container mt-5">
      <h1>Veterinaria</h1>
     <hr/>
     <div className="row">

       <div className="col-8">
         <h4 className="text-center">Pets</h4>

          <ul className="list-group">
          <span className="lead">nombre mascota</span>
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
                  </table>              
            </li>
            
          </ul>




       </div>

       <div className="col-4">
         <h4>Add Pet</h4>
          <form >
             
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
