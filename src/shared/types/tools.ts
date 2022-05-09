export type ToolCategory = 'general' | 'development' | 'infrastructure' | 'net-sec';

export type ToolLink = {
  id?: number,
  img: string,
  url: string,
  title: string,
  description: string,
  category: ToolCategory
};

export type ToolLinkBase64Image = ToolLink & { imgBase64: string };
