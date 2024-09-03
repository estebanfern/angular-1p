import { Component } from '@angular/core';
import { PostapiService } from '../service/postapi.service';
import { Post } from '../model/post';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [PostapiService],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  postList: Post[] = [];

  constructor(private servicePost: PostapiService) {

  }

  recargarLista(){
    this.servicePost.getLista().subscribe(
      entity => this.postList = entity,
      error => console.log('no se pudo conseguir la lista de compradores')
    );
  }

  ngOnInit(): void {
    this.recargarLista();
  }

}
