import { ClientesService } from './../../services/clientes.service';
import { Router } from '@angular/router';
import { Producto } from './../models/producto.model';
import { ProductosService } from './../../services/productos.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {

  productos: Producto[] = Producto[''];

  constructor(private productosService: ProductosService,
    private router: Router,
    private clienteService: ClientesService) {

      this.cargarProductos();
     }

  ngOnInit(): void {
    this.cargarProductos();

    console.log('El cliente cargao es',this.clienteService.cliente)

    setTimeout(() => {
      console.log('productos cargados',this.productosService.productosPermitidos)

    }, 5000);

  }

  cargarProductos(){
    //this.productosService.cargarProductos().subscribe(({productos}) => this.productos = productos)
     this.productosService.cargarProductos().subscribe(({productos}) =>{
      this.productosService.productosPermitidos=this.productos = productos.filter(producto => producto.clienteId == this.clienteService.cliente.id);
    })


  }

  navegar(){
    this.router.navigateByUrl('/guardar-editar/')
  }

  borrarProducto(id){

      const swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Esta seguro?',
        text: "No podra recuperar este producto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Borralo!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.productosService.borrarProducto(id).subscribe((producto: any) => {

          });

          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Tu producto ha sido Eliminado.',
            'success'
          )
          this.cargarProductos();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Eliminacion Cancelada',
            'error'
          )
        }
      })




  }

}
