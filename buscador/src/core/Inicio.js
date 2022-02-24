import React, {useState, useEffect} from "react";
import {CSVLink} from "react-csv"
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {Modal,Button} from 'react-bootstrap'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import BoostrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import "./Inicio.css"
import { obtenerLibros } from "./apiCore.js";
import reactHtmlTableToExcel from "react-html-table-to-excel";





const Inicio = (req, res) => {

    const {isLoading, setisLoading} = useState(true);    
    const [libros, setLibros] = useState([]);
    const [libros2, setLibros2] = useState([]);
    const [element, setElement] = useState([]);
    const [Busqueda, setBusqueda] = useState();
    const [modal, setModal] = useState(false);

    
    const handleChange = e =>{
        setBusqueda(e.target.value);
        filtrarBusqueda(Busqueda);
        if(e.target.value===""){
            setLibros2(libros);
        }
        
    }

    //creando tabla con BootstrapTable

    const columns = [
        {dataField: "title", text: "Título"},
        {dataField: "subtitle", text: "SubTítulo"},
        {dataField: "isbn13", text: "ISBN-13"},
        {dataField: "price", text: "Precio"},
        {dataField: "url", text: "Url"}
    ];

    const Tabla = ()  =>{
        return (
            <BoostrapTable
                id="tabla-datos"
                keyField="isbn13"
                data={libros2}
                columns={columns}
                rowEvents={rowEvents}
                rowStyle={{"text-size":"10px"}}
                pagination={paginationFactory()}
                className="table"
            />)
    };


    const rowEvents = {
        onClick: (e, row, rowIndex) => {
          setElement(row);  
          console.log(row)
          controlModal();
        }
      };

    //*********************** */

    const filtrarBusqueda =(busqueda)=>{
        var resultado = libros.filter((Element) =>{
            if(Element.title.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
            Element.subtitle.toString().toLowerCase().includes(busqueda.toLowerCase())){
                return Element;
            }
        })
        setLibros2(resultado);
    }

    const cargarLibros = () =>{
        obtenerLibros().then(data => {
            if(data.error){

            }else{                
                setLibros(data);
                setLibros2(data);
                setisLoading(!isLoading);
            }
        })
    }

    useEffect(()=>{
        cargarLibros();
    },[])          

    const controlModal= () => {
        setModal(!modal);
    }

    return (        
        <div>
            <Modal show={modal} onHide={()=>controlModal()}>
                    <Modal.Header>
                        <h2 style={{"font-size":"18px", marginTop:"5px", textAlign:"center"}}>Libro: {element.title}</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container-fluid">
                            <div className="row">
                            <div class="col-md-4">
                                <h3 className="textoModal" style={{"margin-top":"25px"}}>SubTitulo</h3>
                                {element.subtitle}
                                <h3 className="textoModal">ISBN-13</h3>
                                {element.isbn13}
                                <h3 className="textoModal">Precio</h3>
                                {element.price}
                                <h3 className="textoModal">Url</h3>
                                <a href={element.url}>Ir a la web</a>
                            </div>
                            <div class="col-md-4">
                                <img src={element.image}></img>
                            </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button className="btn btn-success" onClick={()=>controlModal()} >Cerrar</Button>
                    </Modal.Footer>
            </Modal>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid NavBar-text">
                    <a className="navbar-brand">Prueba de<br></br>Conocimiento</a>
                    <div className="d-flex NavBar-search   ">
                    <input className="form-control me-2" onChange={handleChange} value={Busqueda} placeholder="Buscar" aria-label="Buscar"/>
                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                    </div>
                </div>
            </nav>
            <div className="container cont">
            <ReactHTMLTableToExcel
                id="exportarExcel"
                className="btn btn-success btn-excel"
                table="tabla-datos"
                filename="resultados-excel"
                sheet="pagina 1"
                buttonText="Exportar a Excel"
                />
            <CSVLink data={libros2} className="buttonCont" filename="resultado-busqueda.csv" ><button type="button" className="btn btn-success">Exportar a CSV</button></CSVLink>
            
            </div>
            <div className="tableMargin">
            {Tabla()}
            </div>
            
        </div>
    )
}

export default Inicio;