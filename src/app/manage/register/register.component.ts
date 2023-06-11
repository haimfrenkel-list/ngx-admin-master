import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup   
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.initForm()
  }
   
  initForm() {
    this.registerForm = new FormGroup({
      "email": new FormControl('', [Validators.required, Validators.email]),
      'userName': new FormControl('', [Validators.required]),
      'role': new FormControl('', [Validators.required]),
      'roleNumber': new FormControl(),
      'privateName': new FormControl(),
      'password': new FormControl('', [Validators.required]),
      'confirmPassword': new FormControl('', [Validators.required]),

    },
      [CustomValidators.MatchValidator('password', 'confirmPassword')]
    )
  }

  get passwordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('confirmPassword').touched
    );
  }

  save() {
    this.authenticationService.register(this.registerForm.value).subscribe(data => {
      if (data) {
        this.router.navigateByUrl('/manage/upload')
      } else {        
        alert('something worng')
      }
    })
  }
}

export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}
