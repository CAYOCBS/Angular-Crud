import { Component, OnInit, TemplateRef } from '@angular/core';
import { Professor } from '../models/Professor';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProfessorService } from './professor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.scss']
})
export class ProfessoresComponent implements OnInit {
  public modalRef?: BsModalRef;
  public professorForm: FormGroup;
  public titulo = 'Professores';
  public professorSelecionado: Professor;
  public modo = 'post';

  public professores: Professor[];



  voltar(){
    this.professorSelecionado = null;
  }

  constructor(private modalService: BsModalService,
              private fb: FormBuilder,
              private professorService: ProfessorService) {
                this.criaForm();
              }
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  ngOnInit() {
    this.carregarProfessor();
  }

  criaForm(){
    this.professorForm = this.fb.group({
    id: [''],
    nome: ['', Validators.required]
   });
  }

  professorSelect(professor: Professor){
    this.professorSelecionado = professor;
    this.professorForm.patchValue(professor);
  }

  professorNovo(){
    this.professorSelecionado = new Professor();
    this.professorForm.patchValue(this.professorSelecionado);    
  }

  salvarProfessor(professor: Professor){
    (professor.id === 0) ? this.modo = 'post' : this.modo = 'put';
    this.professorService[this.modo](professor).subscribe(
      (retorno: Professor) => {
        console.log(retorno);
        this.carregarProfessor();
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }


  professorSubmit(){
    this.salvarProfessor(this.professorForm.value);
  }

  carregarProfessor(){
    this.professorService.getAll().subscribe(
      (professores: Professor[]) => {
        this.professores = professores;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }
  

}
