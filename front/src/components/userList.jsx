import React, { useState, useEffect } from "react";
import UserItem from "./userItem";
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from "axios";

const UserList = () => {
  
  const [data, setData] = useState([{}])

  useEffect(() => {
    axios.get("/api/users/").then(
      res => {
        setData(res.data)
        console.log({data})
      }).catch(err => {
        console.log(err)
      })
    }, [])

    
    // const [data, setData] = useState([users]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
      id: '',
      name: '',
      email: ''
    });
  
    const seleccionarUsuario=(elemento, caso)=>{
      setUsuarioSeleccionado(elemento);
      (caso==='Editar') ? setModalEditar(true) : setModalEliminar(true)
    }

    const handleChange=e=>{
    const {name, value} = e.target;
      setUsuarioSeleccionado({
          id: usuarioSeleccionado?.id,
          [name]: value,
       });
      console.log({e, target: e.target.value, name, value, usuarioSeleccionado}, 'change')

    }
  
    const editar=()=>{
      let dataNueva = data;
      dataNueva.map(usuario=>{
        if(usuario.id === usuarioSeleccionado.id){
          usuario.email = usuarioSeleccionado?.email ||usuario.email;
          usuario.name = usuarioSeleccionado?.name || usuario.name;
        }
      });
      console.log({usuarioSeleccionado, dataNueva})
      setData(dataNueva);
      setModalEditar(false);
      console.log({dataNueva}, 'Editar')
    }
  
    const eliminar =()=>{
      setData(data.filter(usuario=>usuario.id!==usuarioSeleccionado.id));
      setModalEliminar(false);
    }
  
    const abrirModalInsertar=()=>{
      setUsuarioSeleccionado(null);
      setModalInsertar(true);
    }
  
    const insertar =()=>{
      let valorInsertar=usuarioSeleccionado;
      valorInsertar.id=data[data.length-1].id+1;
      let dataNueva = data;
      dataNueva.push(valorInsertar);
      setData(dataNueva);
      setModalInsertar(false);
      console.log({dataNueva})
    }
    return (
      <div className="App flex w-full">
        <h2>Gestion de Usuarios</h2>
        <br />
      <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
      <br /><br />
        
        <table className="table table-bordered">         
          <thead>
              <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
              </tr>
          </thead>
            {data.map((userItem) => {
               return(
                <>
                    <tbody className="flex w-full">
                                <td><UserItem key={userItem.id} id={userItem.id} /></td>
                                <td><UserItem key={userItem.id} name={userItem.name} /></td>
                                <td><UserItem key={userItem.id} email={userItem.email} /></td>
                                <td><button className="btn btn-primary" onClick={()=>seleccionarUsuario(userItem, 'Editar')}>Editar</button> {"   "} 
                                <button className="btn btn-danger" onClick={()=>seleccionarUsuario(userItem, 'Eliminar')}>Eliminar</button></td>
                    </tbody>
                </>
                )})
              }
          </table>
  
        <Modal isOpen={modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar Usuario</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>ID</label>
              <input
                className="form-control"
                readOnly
                type="text"
                name="id"
                value={usuarioSeleccionado && usuarioSeleccionado.id}
              />
              <br />
  
              <label>Usuario</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={usuarioSeleccionado && usuarioSeleccionado.name}
                onChange={handleChange}
              />
              <br />
  
              <label>Email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                value={usuarioSeleccionado && usuarioSeleccionado.email}
                onChange={handleChange}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>editar()}>
              Actualizar
            </button>
            <button
              className="btn btn-danger"
              onClick={()=>setModalEditar(false)}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
  
  
        <Modal isOpen={modalEliminar}>
          <ModalBody>
            ¿Estás Seguro que deseas eliminar el usuario: {usuarioSeleccionado && usuarioSeleccionado.name}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={()=>eliminar()}>
              Sí
            </button>
            <button
              className="btn btn-secondary"
              onClick={()=>setModalEliminar(false)}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
  
  
          <Modal isOpen={modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar User</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>ID</label>
              <input
                className="form-control"
                readOnly
                type="text"
                name="id"
                value={data[data.length-1].id+1}
              />
              <br />
  
              <label>Nombre</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={usuarioSeleccionado ? usuarioSeleccionado.name: ''}
                onChange={handleChange}
              />
              <br />
  
              <label>email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                value={usuarioSeleccionado ? usuarioSeleccionado.email: ''}
                onChange={handleChange}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary"
            onClick={()=>insertar()}>
              Insertar
            </button>
            <button
              className="btn btn-danger"
              onClick={()=>setModalInsertar(false)}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
export default UserList;