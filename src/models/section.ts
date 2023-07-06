export interface ModulePayload {
  id: number;
  name: string;
}
export interface SectionPayload {
  id: number;
  name: string;
  modules: ModulePayload[];
}
