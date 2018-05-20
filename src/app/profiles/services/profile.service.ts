import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {ProfileInfo} from '../models/profile-info.model';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

  private profileInfoUrl = 'http://localhost:8080/' + 'api/profile-info';
  private profileInfo: Promise<ProfileInfo>;

  constructor(private http: HttpClient) { }

  getProfileInfo(): Promise<ProfileInfo> {
    if (!this.profileInfo) {
      this.profileInfo = this.http.get<ProfileInfo>(this.profileInfoUrl, { observe: 'response' })
        .map((res: HttpResponse<ProfileInfo>) => {
          const data = res.body;
          const pi = new ProfileInfo();
          pi.activeProfiles = data.activeProfiles;
          pi.ribbonEnv = data.ribbonEnv;
          pi.inProduction = data.activeProfiles.includes('prod') ;
          pi.swaggerEnabled = data.activeProfiles.includes('swagger');
          return pi;
        }).toPromise();
    }
    return this.profileInfo;
  }
}
