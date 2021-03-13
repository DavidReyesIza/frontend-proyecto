import { Router } from '@angular/router';
import { Cliente } from './../models/cliente.model';
import { ClientesService } from './../../services/clientes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 public cliente = Cliente;

  constructor(public clienteService: ClientesService,
    private router: Router) { }

  ngOnInit(): void {
    console.log('vacio',!this.clienteService)
    console.log('con cliente',!this.clienteService.cliente)

  }

  cerrar(){
    localStorage.removeItem("usuario");
    this.clienteService.cliente = Cliente[''];


  }

}
