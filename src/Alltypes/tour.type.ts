export interface ITourresponse {
  _id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  arrivalLocation: string;
  departureLocation: string;
  division: string;       
  tourType: string;       
  images: string[];       
  deletedImages: string[]; 
  amenities: string[];    
  included: string[];     
  excluded: string[];     
  tourPlan: string[];    
  minAge: number;
  maxGests : number;
  costFrom: number;
  startDate: string;      
  endDate: string;        
  createdAt: string;
  updatedAt: string;
}
