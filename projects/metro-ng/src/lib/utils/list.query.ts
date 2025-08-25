export interface ListQuery {
  search?: string;
  filter?: string;
  page?: number;
  length?: number;
  sort?: string;
  include?: string;
  countOnly?: boolean;

}

export interface ParsedFilter {
  [key: string]: {
    op: string;
    value: string;
  };
}

export function parseFilterString(filter?: string): ParsedFilter {
  if (!filter) return {};
  const result: ParsedFilter = {};
  const conditions = filter.split(',');
  for (const condition of conditions) {
    const match = condition.match(/^(.+?):(\w+)\((.*)\)$/);
    if (match) {
      const [, key, op, value] = match;
      result[key] = { op, value };
    }
  }
  return result;
}

export function buildFilterString(filters: ParsedFilter): string {
  if (!filters) return '';
  const parts: string[] = [];
  for (const key in filters) {
    const { op, value } = filters[key];
    parts.push(`${key}:${op}(${value ?? ''})`);
  }
  return parts.join(',');
}
