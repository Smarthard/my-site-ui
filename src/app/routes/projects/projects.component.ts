import {Component, OnInit} from '@angular/core';
import {GitRepository} from "../../shared/GitRepository";
import {GithubService} from "../../services/GithubService";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  protected repos: GitRepository[] = [];

  constructor(private githbService: GithubService) {}

  ngOnInit() {
    this.githbService.getMyRepos().subscribe(
      res => {
          for (let obj in res) {
            this.repos.push(res[obj]);
          }
      },
      err => {
          console.error(err)
      });
  }

}
