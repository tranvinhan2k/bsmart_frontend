export interface ModuleProps {
  id: number;
  name: string;
}
export interface SectionProps {
  id: number;
  name: string;
  modules: ModuleProps[];
}
