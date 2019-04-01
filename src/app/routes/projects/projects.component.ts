import {Component, OnInit} from '@angular/core';
import {GitRepository} from "../../shared/github/GitRepository";
import {GithubService} from "../../services/GithubService";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectsFilter} from "../../shared/github/ProjectsFilter";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  private repos: GitRepository[] = [];
  private filters: ProjectsFilter = new ProjectsFilter({});

  constructor(private githubService: GithubService, private route: ActivatedRoute, private router: Router) {
      this.router.events.subscribe(() => {
          this.route.queryParams.subscribe(params => {
              this.filters = new ProjectsFilter({
                  lang: params['lang'],
                  pl: params['pl']
              });
          });
      });
  }

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
      const value = "'" + byValue + "'";

      switch (filter) {
          case "lang": this.router.navigate(['/projects'], { queryParams: { "lang": value } }); break;
          case "pl": this.router.navigate(['/projects'], { queryParams: { "pl": value} }); break;
          default: break;
      }
  }

  isFilterPositive(repo: GitRepository) {
      let isPositive: boolean = true;

      if (this.filters.pl) {
          isPositive = repo.license ? repo.license.toLowerCase().includes(this.filters.pl.toLowerCase()) : false;
      }

      if (this.filters.lang) {
          isPositive = repo.language ? repo.language.toLowerCase().includes(this.filters.lang.toLowerCase()) : false;
      }

      return isPositive;
  }

  protected resetFilters() {
      this.filters = new ProjectsFilter({});
  }
}
