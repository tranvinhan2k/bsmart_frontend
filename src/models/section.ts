export interface ModuleProps {
  id: number;
  name: string;
}
export interface SectionProps {
  id: number;
  name: string;
  introduce: string;
  modules: ModuleProps[];
}
