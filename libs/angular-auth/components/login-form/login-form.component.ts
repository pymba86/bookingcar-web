import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Auth} from '../../models/auth.model';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() { }

  @Input()
  errorMessage: string | null;

  @Output()
  submitted = new EventEmitter<Auth>();

  submit(auth: Auth) {
    if (this.form.valid) {
      this.submitted.emit(auth);
    }
  }
}
