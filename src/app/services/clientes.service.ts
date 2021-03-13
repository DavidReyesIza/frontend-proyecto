import { catchError, map } from 'rxjs/operators';
import { Cliente } from './../components/models/cliente.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  public cliente: Cliente;

  public tokenGlobal;



  constructor(private http: HttpClient) { }
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });



  get token(){
    return localStorage.getItem('usuario') || '';
  }

  obtenerCliente(){

  this.cliente = JSON.parse(localStorage.getItem('usuario')) || [];

  }


  guardarLocalStorage( cliente: Cliente){

    localStorage.setItem('usuario',JSON.stringify(cliente)) // Hay que hacer el parseo a json por que el localStore solo guarda strings
  }


  validar(cliente: Cliente){
    const url = `${base_url}`;

    return this.http.put(`${url}/validar`, cliente,  { headers: this.httpHeaders })
    .pipe(
      map((resp:any)=>{
        console.log(resp)
        const  {id,nombre,apellido,email} = resp.cliente;
         this.cliente = new Cliente (id,email,nombre,apellido,);


        return this.cliente;
      })
    )
  }

  registrarCliente(cliente){
    const url = `${base_url}/clientes`;
    return this.http.post<Cliente>(url, cliente, { headers: this.httpHeaders })
    .pipe(
      map((cliente: any)=>{
        const {id,email} = cliente.cliente
        this.cliente = new Cliente(id,email);

        return cliente;
      })
    )
  }


}
