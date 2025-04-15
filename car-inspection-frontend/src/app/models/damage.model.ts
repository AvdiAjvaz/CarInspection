export interface Damage {
  id?: number;
  carId: number;
  x: number;
  y: number;
  pershkrimi: string;
  data_e_regjistrimit: Date;
  view: string; // ✅ opsionale
  status: string; // ✅ opsionale
  shkalla_e_demtimit: string; // ✅ opsionale, do të vendoset automatikisht në server
}
