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
              let repo: GitRepository = new GitRepository(res[obj]);

              if (repo.fork) {
                  this.githbService.getRepoInfo(repo.url).subscribe(
                      res => {
                          repo = new GitRepository(res);
                          this.repos.push(repo);
                      },
                      err => {
                          console.error(err);
                      }
                  )
              } else {
                  this.repos.push(repo);
              }
          }
      },
      err => {
          console.error(err);
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
