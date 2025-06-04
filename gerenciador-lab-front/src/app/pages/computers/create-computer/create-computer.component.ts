import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComputerService } from '../../../core/services/computers.service';
import { Computers } from '../../../core/models/computers.model';

@Component({
  selector: 'app-create-computer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-computer.component.html',
  styleUrl: './create-computer.component.scss'
})
export class CreateComputerComponent implements OnInit {
  form = this.fb.group({
    nome: ['', Validators.required],
    patrimonio: ['', Validators.required]
  });

  laboratorioId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private computerService: ComputerService
  ) {}

  ngOnInit(): void {
    this.laboratorioId = Number(this.route.snapshot.paramMap.get('laboratorioId'));
  }

  submit(): void {
    if (this.form.invalid) return;

    const novoComputador: Computers = {
      nome: this.form.value.nome!,
      patrimonio: this.form.value.patrimonio!,
      retirado: false,
      laboratory_id: this.laboratorioId
    };

    this.computerService.postComputer(novoComputador).subscribe({
      next: () => this.router.navigate(['/laboratorio', this.laboratorioId]),
      error: () => console.error('Erro ao cadastrar computador')
    });
  }
}
