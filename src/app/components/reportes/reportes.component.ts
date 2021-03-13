import { ClientesService } from './../../services/clientes.service';
import { Producto } from './../models/producto.model';
import { ProductosService } from './../../services/productos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  public productosVendidos : Producto[];
  public  contadorProductos =0;
  public promedio = 0;
  public contador=0;
  public contadorPromedio = 0;
  public PromedioGeneral= 0;

  productos: Producto[] = Producto[''];

  constructor(private productosService: ProductosService,
              private clienteService: ClientesService) { }

  ngOnInit(): void {

    console.log('permitidoos',this.productosService.productosPermitidos)
    this.cargarProductos()

    this.Reportes();

  }

  cargarProductos(){


   this.productosService.cargarProductos().subscribe(({productos}) =>{
      this.productosService.productosPermitidos =  this.productos = productos.filter(producto => producto.clienteId == this.clienteService.cliente.id);
      })


  }

  Reportes (){

    setTimeout(() => {


      this.productosVendidos = this.productosService.productosPermitidos.filter(producto => !producto.estado)

    }, 300);


    setTimeout(() => {

      this.productosVendidos.forEach(producto => this.contadorPromedio =+ producto.precio)

    }, 340);

    setTimeout(() => {

      this.productosVendidos.forEach(producto => this.contadorProductos++)

    }, 360);

    setTimeout(() => {

      this.PromedioGeneral = this.contadorPromedio/this.contadorProductos

    }, 380);



  }

  verValor(){
    console.log('Ver valor',this.productosVendidos);
  }


}
