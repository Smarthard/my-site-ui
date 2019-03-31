import {Component, OnInit} from '@angular/core';
import {GitRepository} from "../../shared/GitRepository";
import {GithubService} from "../../services/GithubService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  private repos: GitRepository[] = [];
  private filters: { lang?: string; pl?: string } = {};

  constructor(private githubService: GithubService, private route: ActivatedRoute, private router: Router) {
      this.router.events.subscribe(() => {
          this.route.queryParams.subscribe(params => {
              this.filters = {
                  lang: params['lang'],
                  pl: params['pl']
              };

              this.filterRepos()
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

  private filterRepos() {
      if (this.repos.length > 0) {
          this.githubService.getFilteredRepos(this.filters).then(res => {
              this.repos = res;
          })
      }
  }

  protected resetFilters() {
      this.router.navigate(['/projects'], {});
  }
}
