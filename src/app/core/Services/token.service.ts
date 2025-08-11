import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {JwtPayload} from '../models/jwt-payload.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private jwtPayload?: JwtPayload;

  constructor(
    private jwtService: JwtHelperService
  ) {
      this.buildPayload();
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    this.buildPayload();
  }

  removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  hasPermission(permission: string): boolean {
    const [resource, requiredActions] = permission.split(':');
    if (!resource || !requiredActions) return false;
    if (!this.jwtPayload?.permissions) {
      return this.hasRole('Programmer');
    }
    else
    {
      const permissions = Array.isArray(this.jwtPayload.permissions) ? this.jwtPayload.permissions : [this.jwtPayload.permissions];
      return permissions?.some(p => {
        const [res, actions] = p.split(':');
        return res === resource && [...requiredActions].every(a => actions.includes(a));
      }) || false;
    }
  }

  isCountyAdmin(): boolean {
    return this.jwtPayload?.countyId !== undefined;
  }

  isProvinceAdmin(): boolean {
    return !this.isCountyAdmin() && this.jwtPayload?.provinceId !== undefined;
  }

  isNationalAdmin(): boolean {
    return !this.isCountyAdmin() && !this.isProvinceAdmin();
  }

  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some(p => this.hasPermission(p));
  }

  hasAllPermissions(permissions: string[]): boolean {
    return permissions.every(p => this.hasPermission(p));
  }

  hasRole(rolesToCheck: string | string[]): boolean {
    const payloadRoles = this.jwtPayload?.roles;
    if (!payloadRoles) return false;
    const userRoles = Array.isArray(payloadRoles) ? payloadRoles : [payloadRoles];
    const roles = Array.isArray(rolesToCheck) ? rolesToCheck : [rolesToCheck];
    return roles.some(role => userRoles.includes(role));
  }

  isTokenValid(): boolean {
    const token = this.getAccessToken();
    if (token) {
      return !this.jwtService.isTokenExpired();
    }
    return false;
  }

  getJwtInfo(): JwtPayload | undefined {
    return this.jwtPayload;
  }

  private getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  private buildPayload() {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      const decodeToken = this.jwtService.decodeToken();
      if (decodeToken) {
        const roles = decodeToken[`${CLAIM_ROLE_SCHEMA}/role`];
        this.jwtPayload = {
          roles: Array.isArray(roles) ? roles[0] : roles,
          fullName: decodeToken['fullname'] || '',
          username: decodeToken[`${CLAIM_SCHEMA}/name`],
          id: decodeToken[`${CLAIM_SCHEMA}/nameidentifier`],
          permissions: decodeToken.Permission,
          roleDisplayName: decodeToken[`roleDisplayName`],
          countyId: decodeToken[`county_id`] ? parseInt(decodeToken[`county_id`]) : undefined,
          provinceId: decodeToken[`province_id`] ? parseInt(decodeToken[`province_id`]) : undefined,
        }
      }
    }
  }

}


export const ACCESS_TOKEN_KEY = 'demo-token';
const CLAIM_ROLE_SCHEMA = "http://schemas.microsoft.com/ws/2008/06/identity/claims";
const CLAIM_SCHEMA = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims";
