import { Router, RouterModule } from '@angular/router';
import { ClientesService } from './../../services/clientes.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private clientesService: ClientesService,
              private router: Router,
              private clienteService: ClientesService) { }

  public loginForm = this.fb.group({


    // la instruccion || hace que si encuentra un null en la primera condicion establecera un string vacio
    email: ['',Validators.required],
    password: ['',Validators.required]

  });

  ngOnInit(): void {
  }

  login(){
    this.clientesService.validar(this.loginForm.value)
    .subscribe((cliente : any) =>{

      this.clienteService.guardarLocalStorage(cliente);

      swal.fire('Sesion Iniciada',
      `Bienvenido!`,
      'success')

      this.router.navigateByUrl('/mantenimiento')
    },(err) =>{
      console.log(err)
      swal.fire('Error',err.error.mensaje, 'error');
    }

    )
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.loginForm.get(controlName);
    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);
    }
    return error;
  }

}
