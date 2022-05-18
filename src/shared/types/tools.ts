export enum ToolCategory {
  general = 'general',
  development = 'development',
  infrastructure = 'infrastructure',
  netSec = 'net_sec'
};

export type ToolLink = {
  id: number,
  img: string,
  url: string,
  title: string,
  description: string,
  category: ToolCategory
};

export type ToolRequest = {
  id?: number,
  img: string,
  url: string,
  title: string,
  description: string,
  category: ToolCategory
};

export type ToolLinkBase64Image = ToolLink & { imgBase64: string };
