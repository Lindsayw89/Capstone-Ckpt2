import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {
  public workouts: Workout[];
  public newWorkout: Workout = { title: '', description: '', workoutType:'', calories:0, workoutDate: new Date()}


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

 async  ngOnInit() {
    this.workouts = await this.http.get<Workout[]>(this.baseUrl + 'workout').toPromise();
  }

  async saveWorkout() {
    console.log(this.newWorkout);
    await this.http.post<Workout[]>(this.baseUrl + 'workout', this.newWorkout).toPromise();
    this.newWorkout = { title: '', description: '', workoutType:'', calories:0 , workoutDate: new Date()};
    this.workouts = await this.http.get<Workout[]>(this.baseUrl + 'workout').toPromise();

}

}

interface Workout {
  title: string;
  description: string;
  workoutType: string;
  calories: 0;
  workoutDate: Date;

}
