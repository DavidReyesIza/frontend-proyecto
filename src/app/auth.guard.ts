import { ClientesService } from './services/clientes.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public  tomador = false;
  constructor(private clienteService: ClientesService,
    private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
      console.log('admin guard')

      if(this.clienteService.cliente.email){
        return true;
      }else{
        this.router.navigateByUrl('/login')
        return false
      }

  }

}
