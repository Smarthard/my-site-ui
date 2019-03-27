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
  private loadedRepos: GitRepository[];
  private unfiltered: boolean = true;
  protected repos: GitRepository[];
  protected langFilter: string = '';
  protected licenseFilter: string = '';

  constructor(private githubService: GithubService, private route: ActivatedRoute, private router: Router) {
      this.router.events.subscribe(() => {
          this.route.queryParams.subscribe(params => {
              this.langFilter = params['lang'];
              this.licenseFilter = params['pl'];
              this.repos = this.loadedRepos;

              if (this.langFilter != undefined && this.repos != undefined) {
                  this.unfiltered = false;
                  this.repos = this.repos.filter(repo => this.langFilter.includes(repo.language) );
              }

              if (this.licenseFilter != undefined && this.repos != undefined) {
                  this.unfiltered = false;
                  this.repos = this.repos.filter(repo => this.licenseFilter.includes(repo.license) );
              }
          });
      });
  }

  ngOnInit() {
      this.githubService.getMyRepos().then((res) => {
          this.repos = res;
          this.loadedRepos = this.repos;
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

  protected resetFilters() {
      console.log(this.langFilter + " ---- " + this.licenseFilter);
      this.langFilter = '';
      this.licenseFilter = '';
      this.unfiltered = true;

      this.router.navigate(['/projects'], {})
  }
}
