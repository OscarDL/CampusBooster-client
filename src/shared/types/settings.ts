export enum SupportedLangs {
  English = 'en',
  French = 'fr'
};

export enum SupportedThemes {
  System = 'system',
  Light = 'light',
  Dark = 'dark'
};

export enum LinkTypes {
  Default = 'default',
  Bold = 'bold',
  Underline = 'underline',
  BoldUnderline = 'bold_underline'
};


export type Settings = {
  lang: SupportedLangs,
  theme: SupportedThemes,
  linkType: LinkTypes,

  dataGrid: {
    pagination: boolean
  }
};
