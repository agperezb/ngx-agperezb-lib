import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators }  from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public formLogin: FormGroup = new FormGroup<any>({});

  constructor() {
  }

  ngOnInit(): void {
    this.initFormLogin();
  }

  private initFormLogin(): void {
    this.formLogin = new FormGroup<any>({
      email: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(5), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  get email() { return this.formLogin.get('email'); }

  public sendLogin(): void {
    console.log(this.formLogin.value)
  }

}
