import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  formValues: any;
  submitting = false;
  hasError = false;
  hidePass = true;
  private userSub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createFormValues();
    this.createForm();
  }

  createFormValues() {
    this.formValues = {
      email: ['', Validators.required],
      password: ['', Validators.required],
    };
  }

  createForm() {
    this.userForm = this.fb.group(this.formValues);
  }

  get form() {
    if (this.form && this.form.controls) {
      return this.form.controls;
    }
  }

  submitForm() {
    this.submitting = true;
    if (!this.form.valid) {
      this.submitting = false;
      this.hasError = true;
      return;
    }
    const params = this.form.value;
    this.userSub = this.userService.login(params).subscribe(
      (data) => {
        if (data) {
          console.log('You have logged in Successfully!');
          this.submitting = false;
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        if (error) {
          const errMsg = 'There was an error!';
          console.log(errMsg);
          this.hasError = true;
          this.submitting = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.userForm.reset();
    this.userSub.unsubscribe();
  }
}
