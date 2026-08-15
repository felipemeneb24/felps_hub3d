import UsuarioEntity from "../entities/usuarioEntity.js";
import Repository from "./repository.js";



export default class UsuarioRepository extends Repository{
    constructor(){
        super();
    }

    async validarAcesso(email,senha){
        let sql = "select * from usuario where email = ? and senha = ?";
        let valores = [email,senha];
        let rows = await this.banco.ExecutaComando(sql,valores);

        if(rows.length > 0){
            return UsuarioEntity.toMap(rows[0]);
        }
        return null;
    }

    async obter(id){
        let sql = "select * from usuario where id = ?";
        let valores = [id];
        let rows = await this.banco.ExecutaComando(sql,valores);
        if(rows.length > 0 ){
            return UsuarioEntity.toMap(rows[0]);
        }
        return null;
    }
}