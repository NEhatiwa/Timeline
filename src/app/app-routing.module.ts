import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeftComponent } from './left/left.component';
import { RightComponent } from './right/right.component';
import { TrialComponent } from './trial/trial.component';

const routes: Routes = [
    { path: 'trial', component: TrialComponent },
    { path: 'left', component: LeftComponent },
    { path: 'right', component: RightComponent }

];

@NgModule( {
    imports: [RouterModule.forRoot( routes )],
    exports: [RouterModule]
} )
export class AppRoutingModule { }