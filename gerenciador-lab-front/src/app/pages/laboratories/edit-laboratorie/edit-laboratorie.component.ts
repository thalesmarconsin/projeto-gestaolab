import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-laboratorie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-laboratorie.component.html',
  styleUrls: ['./edit-laboratorie.component.scss']
})
export class EditLaboratorieComponent implements OnInit {
  laboratorieForm!: FormGroup;
  laboratorieId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.laboratorieId = Number(this.route.snapshot.paramMap.get('id'));

    this.laboratorieForm = this.fb.group({
      nome: ['', Validators.required],
      localizacao: [''] // opcional
    });

    this.loadLaboratorieData();
  }

  loadLaboratorieData() {
    // Aqui você pode chamar o service para buscar os dados do laboratório
    // Exemplo mockado:
    const mockLaboratorie = {
      id: this.laboratorieId,
      nome: 'Laboratório de Redes',
      localizacao: 'Prédio B, sala 12'
    };

    this.laboratorieForm.patchValue(mockLaboratorie);
  }

  onSubmit() {
    if (this.laboratorieForm.valid) {
      console.log('Laboratório editado:', this.laboratorieForm.value);
      // Chamar service.updateLaboratorie(this.laboratorieId, this.laboratorieForm.value)
      this.router.navigate(['/dashboard']);
    }
  }
}
