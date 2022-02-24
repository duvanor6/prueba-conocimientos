import Axios from 'axios';

export const obtenerLibros = async() =>{
    const response = await Axios(`https://api.itbook.store/1.0/new`)
    const librosIndv = response.data.books;    
    return transFormarLibro(librosIndv);
    
}

const transFormarLibro = (librosIndv ) => {
    const librosArry = librosIndv.map( lib =>{
        return {
            title: lib.title,
            subtitle: lib.subtitle,
            isbn13: lib.isbn13,
            price: lib.price,
            image: lib.image,
            url: lib.url
        }
    })

    return librosArry;
}