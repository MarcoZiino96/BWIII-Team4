import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { APIricetteService } from '../../services/apiricette.service';
import { iRicetta } from '../../Models/iricetta';
import { iUser } from '../../Models/auth/i-user';
import { iAuthData } from '../../Models/auth/i-auth-data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent {


}
