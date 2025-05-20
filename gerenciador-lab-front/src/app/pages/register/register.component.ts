import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/module/material.module';
import { SharedModule } from '../../shared/module/shared.module';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MaterialModule, SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  hide = true;
  hideConfirmacao = true;
  titulo = 'Cadastro de Usuário';
  localStorageKey = 'login';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackbarService,
    private localStorageService: LocalStorageService
  ) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email]],
      senha: [
        '',
        [Validators.required, Validators.minLength(8), this.senhaValidator],
      ],
      confirmacao: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.form.reset();
  }

  senhaValidator(control: AbstractControl) {
    const senha = control.value;
    const hasNumber = /\d/.test(senha);
    const hasUpper = /[A-Z]/.test(senha);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(senha);
    return hasNumber && hasUpper && hasSpecial ? null : { invalidsenha: true };
  }

  get senha() {
    return this.form.get('senha');
  }

  submit() {
    const { nome, email, senha, confirmacao } = this.form.value;

    if (senha !== confirmacao) {
      this.snackBarService.showErrorSnackbar('Senhas não coincidem');
      return;
    }

    this.authService.register({ name: nome, email, password: senha }).subscribe({
      next: () => {
        this.snackBarService.showSuccessSnackbar('Registrado com sucesso!');
        this.router.navigateByUrl('/login');
      },
      error: () => {
        this.snackBarService.showErrorSnackbar('Erro ao registrar');
      }
    });
  }

  cancelar() {
    this.router.navigate(['/login']);
  }
}
