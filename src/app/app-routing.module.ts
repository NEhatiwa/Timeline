import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrialComponent } from './trial/trial.component';

const routes: Routes = [
    //{ path: 'trial', component: TrialComponent }
    // { path: 'second-component', component: SecondComponent },

];

@NgModule( {
    imports: [RouterModule.forRoot( routes )],
    exports: [RouterModule]
} )
export class AppRoutingModule { }

