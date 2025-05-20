import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/module/material.module';
import { SharedModule } from '../../shared/module/shared.module';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, SharedModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup;
  hide = true;
  localStorageKey = 'user';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBarService: SnackbarService,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    const { email, password } = this.form.value;

    if (this.form.invalid) {
      this.snackBarService.showErrorSnackbar('Preencha os campos corretamente');
      return;
    }

    this.authService.login({ email, password }).subscribe({
      next: (res) => {
        this.localStorageService.setItem(this.localStorageKey, res.user);
        this.snackBarService.showSuccessSnackbar('Login realizado com sucesso!');
        this.router.navigateByUrl('/dashboard');
      },
      error: () => {
        this.snackBarService.showErrorSnackbar('Email ou senha inválidos');
      }
    });
  }
}
