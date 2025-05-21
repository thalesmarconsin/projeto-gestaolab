import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LaboratoryService } from '../../../core/services/laboratory.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-laboratorie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-laboratorie.component.html',
  styleUrl: './create-laboratorie.component.scss'
})
export class CreateLaboratorieComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private laboratoryService: LaboratoryService,
    private router: Router,
    private snackBar: SnackbarService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      localizacao: ['']
    });
  }

  submit(): void {
  if (this.form.invalid) return;

  this.laboratoryService.postLaboratory(this.form.value).subscribe({
    next: () => {
      this.snackBar.showSuccessSnackbar('Laboratório criado!');
      this.router.navigate(['/dashboard']);
    },
    error: (error) => {
    const message =
    error?.error?.mensagem ||
    error?.error?.message ||
    'Erro ao criar laboratório';

    this.snackBar.showErrorSnackbar(message);
    console.error('Erro detalhado:', error);
  }
  });
}
}
