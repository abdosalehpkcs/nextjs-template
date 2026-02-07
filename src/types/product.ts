export type Brand = 
  | 'fanta'
  | 'monster'
  | 'coca-cola'
  | 'spa-reine'
  | 'schweppes'
  | 'freez';

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: string;
  description: string;
  imageUrl: string;
  packageSize?: string;
  featured?: boolean;
}

export interface BrandInfo {
  slug: Brand;
  name: string;
  description: string;
  color: string;
}
