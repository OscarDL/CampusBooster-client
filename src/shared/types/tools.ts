export type ToolCategory = 'general' | 'development' | 'infrastructure' | 'net-sec';

export type ToolLink = {
  img: string,
  url: string,
  title: string,
  description: string,
  category: ToolCategory
};
