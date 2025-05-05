import path from 'path';
const API_PREFIX = '/api';
export type ApiRoutes = 'projects' | 'configs' | 'certifications';

export function constructApiRoute(route: ApiRoutes): string {
    return path.join(API_PREFIX, route);
}
