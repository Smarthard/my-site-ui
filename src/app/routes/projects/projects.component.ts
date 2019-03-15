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
            this.repos.push(new GitRepository(res[obj]));
          }
      },
      err => {
          console.error(err)
      });
  }

  protected colorizedLang(lang: String) {
    switch (lang.toLowerCase()) {
        case "c":           return "black";
        case "java":        return "chocolate";
        case "python":      return "darkblue";
        case "javascript":  return "gold";
        case "shell":       return "yellowgreen";
        default:            return "gray";
    }
  }
}
