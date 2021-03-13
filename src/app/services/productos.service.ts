import { map } from 'rxjs/operators';
import { Producto } from './../components/models/producto.model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  public productosPermitidos : Producto[];

  constructor(private http: HttpClient,
              ) { }

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  cargarProductos(){
    const url = `${base_url}/productos`;
    return this.http.get<Producto[]>(url)
    .pipe(
      map(resp => {
        const productos = resp.map(
          producto => new Producto(producto.nombre,producto.precio,producto.clienteId,producto.estado,producto.stock,producto.id,)
        )

        return {
          productos
        }
      })
    )
  }



  cargarProducto(id: number){
    const url = `${base_url}/productos`;
    return this.http.get<Producto>(`${url}/${id}`);
  }

  comprarProducto(producto: Producto){
    const url = `${base_url}/productos`;

    return this.http.put(`${url}/${producto.id}`,producto, { headers: this.httpHeaders });

  }

  create(producto: {nombre,precio,clienteId,estado,stock}){
    const url = `${base_url}/productos`;
    return this.http.post<Producto>(url, producto, { headers: this.httpHeaders })
  }


  editar(producto: Producto){
    const url = `${base_url}/productos`;

    return this.http.put(`${url}/${producto.id}`, producto,  { headers: this.httpHeaders })
    /* .pipe(
      map((resp:any)=>{
        console.log(resp)
        const  {id,nombre,precio,clienteId,estado,stock} = resp.producto;
        const respuesta = new Producto (id,nombre,precio,clienteId,estado,stock);


     return respuesta;
      })
    ) */
  }

  borrarProducto(id: number){
    const url = `${base_url}/productos`;

    return this.http.delete(`${url}/${id}`)

  }






}
