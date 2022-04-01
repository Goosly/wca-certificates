import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';

@NgModule({
  imports: [RouterModule.forRoot([{
    path: '',
    // loadChildren: () => import('src/app/app.module').then(m => m.AppModule),
    // loadChildren: () => import('@app/app.module').then(m => m.AppModule),
    component: HomeComponent,
  }])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
