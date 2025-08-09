import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services';
import { Observable } from 'rxjs';
import { User } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  
  user$: Observable<User>;

  constructor(){
    this.user$ = this.authService.getUser(this.route.snapshot.paramMap.get('userId'));
  }

}
