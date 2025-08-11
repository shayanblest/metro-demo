import {ListQuery} from '../../core/queries/list.query';
import {HttpParams} from '@angular/common/http';

export const toHttpParams = (obj: ListQuery): HttpParams => {
  let httpParams = new HttpParams();
  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(val => {
        httpParams = httpParams.append(key, val);
      });
    } else if (value !== null && value !== undefined) {
      httpParams = httpParams.set(key, value as string);
    }
  });
  return httpParams;
}

export const toFormData = (obj: any, form?: FormData, namespace?: string): FormData => {
  const formData = form || new FormData();

  for (const property in obj) {
    if (!obj.hasOwnProperty(property) || obj[property] === undefined || obj[property] === null) {
      continue;
    }

    const formKey = namespace ? `${namespace}[${property}]` : property;
    const value = obj[property];

    if (value instanceof Date) {
      formData.append(formKey, value.toISOString());
    } else if (value instanceof File || value instanceof Blob) {
      formData.append(formKey, value);
    } else {
      formData.append(formKey, value.toString());
    }
  }

  return formData;
}
