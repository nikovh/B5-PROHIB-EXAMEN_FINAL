import { Injectable } from '@angular/core';
import { Publicacion } from '../modelo/publicacion';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  sqlite:SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  db!: SQLiteDBConnection
  plataforma:string       = ""

  DB_NAME: string         = "lista_publicaciones"
  DB_ENCRIPTADA: boolean  = false
  DB_MODE: string         = "no-encryption"
  DB_VERSION: number      = 1
  DB_READ_ONLY: boolean   = false
  TABLE_NAME:string       = "lista_publicaciones"
  DB_SQL_TABLAS: string   = `
   
    CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
      ID            INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo        TEXT NOT NULL,
      foto          TEXT NOT NULL,
      descripcion   TEXT NOT NULL,
      fechaCreacion DATE NOT NULL 
    );
  `
//    DROP TABLE ${this.TABLE_NAME};

  constructor() { }

  private async _iniciarPluginWeb(): Promise<void> {    
    await customElements.whenDefined('jeep-sqlite')
    const jeepSqliteEl = document.querySelector("jeep-sqlite")
    if( jeepSqliteEl != null ) {      
      await this.sqlite.initWebStore()            
    }
  }
  
  async iniciarPlugin(){
    this.plataforma = Capacitor.getPlatform()
    if( this.plataforma == "web") {
      await this._iniciarPluginWeb()
    }
    await this.abrirConexion()
    await this.db.execute(this.DB_SQL_TABLAS)
  }

  async abrirConexion() {                    
    const ret = await this.sqlite.checkConnectionsConsistency() 
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result
    if(ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY)      
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      )
    }
    await this.db.open()
  }
  
  async agregarPublicacion(p:Publicacion){
    const sql = `INSERT INTO ${this.TABLE_NAME}(titulo, foto, descripcion, fechaCreacion) VALUES (?,?,?,Date('now'))`
    await this.db.run(sql, [p.titulo, p.foto, p.descripcion]) 

  }

  async mostrarPublicaciones():Promise<Publicacion[]> { 
    const sql = `SELECT * FROM ${this.TABLE_NAME}`
  const resultado = await this.db.query(sql)
  return resultado?.values ?? []
}

  async borrarPublicacion(publicacionesID: number) {
    const sql = `DELETE FROM ${this.TABLE_NAME} WHERE ID =?`
    await this.db.run(sql, [publicacionesID])
  }
}

