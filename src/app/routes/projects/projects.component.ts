import {Component, OnInit} from '@angular/core';
import {GitRepository} from "../../shared/github/GitRepository";
import {GithubService} from "../../services/GithubService";
import {ProjectsFilter} from "../../shared/github/ProjectsFilter";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  public repos: GitRepository[] = [];
  public filters: ProjectsFilter = new ProjectsFilter({});

  constructor(private githubService: GithubService) {}

  ngOnInit() {
      this.githubService.getMyRepos().then((res) => {
          this.repos = res;
      }).catch((err) => {
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

  protected addFilter(filter: string, byValue: string) {
      switch (filter) {
          case "lang": this.filters.lang = byValue; break;
          case "pl": this.filters.pl = byValue; break;
          default: break;
      }
  }

  protected isFilterPositive(repo: GitRepository) {
      let isPositive: boolean = true;

      if (isPositive && this.filters.pl) {
          const filter: string = this.filters.pl.toLowerCase();
          const license: string = repo.license ? repo.license.toLowerCase() : '';

          isPositive = filter !== '' && license.startsWith(filter);
      }

      if (isPositive && this.filters.lang) {
          const filter: string = this.filters.lang.toLowerCase();
          const lang: string = repo.language ? repo.language.toLowerCase() : '';

          isPositive = filter !== '' && lang.startsWith(filter);
      }

      return isPositive;
  }

  protected resetFilters() {
      this.filters = new ProjectsFilter({});
  }
}
