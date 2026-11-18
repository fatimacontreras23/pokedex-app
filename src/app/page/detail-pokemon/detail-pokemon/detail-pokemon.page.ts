import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonProgressBar, // NUEVO
  IonFab, // NUEVO
  IonFabButton, // NUEVO
  IonIcon, // NUEVO
  LoadingController, // NUEVO
  NavController, // NUEVO
} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons'; // NUEVO
import { close } from 'ionicons/icons'; // NUEVO
import { Pokemon } from '../../../services/pokemon';
import { IPokemon } from '../../../models/pokemon.model';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonProgressBar, // NUEVO
    IonFab, // NUEVO
    IonFabButton, // NUEVO
    IonIcon, // NUEVO
    CommonModule,
    FormsModule,
  ],
})
export class DetailPokemonPage implements OnInit {
  private route = inject(ActivatedRoute);
  private pokemonService: Pokemon = inject(Pokemon);
  private loadingController = inject(LoadingController); // NUEVO
  private navController = inject(NavController); // NUEVO

  public pokemon = signal<IPokemon | undefined>(undefined);

  // NUEVO: valor máximo de una stat base (para calcular el % de la barra)
  private readonly MAX_STAT = 255;

  // NUEVO
  private readonly statNames: Record<string, string> = {
    hp: 'PS',
    attack: 'Ataque',
    defense: 'Defensa',
    'special-attack': 'At. Esp.',
    'special-defense': 'Def. Esp.',
    speed: 'Velocidad',
  };

  // NUEVO
  private readonly typeNames: Record<string, string> = {
    normal: 'Normal',
    fire: 'Fuego',
    water: 'Agua',
    electric: 'Eléctrico',
    grass: 'Planta',
    ice: 'Hielo',
    fighting: 'Lucha',
    poison: 'Veneno',
    ground: 'Tierra',
    flying: 'Volador',
    psychic: 'Psíquico',
    bug: 'Bicho',
    rock: 'Roca',
    ghost: 'Fantasma',
    dragon: 'Dragón',
    dark: 'Siniestro',
    steel: 'Acero',
    fairy: 'Hada',
  };

  constructor() {
    addIcons({ close }); // NUEVO
  }

  async ngOnInit() { // NUEVO: async
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      // NUEVO: ion-loading mientras carga
      const loading = await this.loadingController.create({
        message: 'Cargando Pokémon...',
      });
      await loading.present();

      this.pokemonService
        .getPokemon(id)
        .then((pokemon: IPokemon) => this.pokemon.set(pokemon))
        .catch((error) => console.error('Error al obtener el pokémon:', error))
        .finally(() => loading.dismiss()); // NUEVO
    }
  }

  // NUEVO
  close() {
    this.navController.back();
  }

  // NUEVO
  statLabel(name: string): string {
    return this.statNames[name] ?? name;
  }

  // NUEVO
  typeLabel(type: string): string {
    return this.typeNames[type] ?? type;
  }

  // NUEVO: progreso de 0 a 1 para ion-progress-bar
  statProgress(value: number): number {
    return Math.min(value / this.MAX_STAT, 1);
  }

  // NUEVO: rojo (bajo), amarillo (medio), verde (alto)
  statColor(value: number): 'danger' | 'warning' | 'success' {
    if (value < 50) return 'danger';
    if (value < 80) return 'warning';
    return 'success';
  }
}