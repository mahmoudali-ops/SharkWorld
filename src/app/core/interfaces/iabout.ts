export interface IAbout {
    id: number
    imageCover: string
    aboutTranslationDtos: AboutTranslation[]
  }
  
  export interface AboutTranslation{
    id: number
    title: string
    language: string
    description: string
  }