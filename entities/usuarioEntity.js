export default class UsuarioEntity {

    #id;
    #nome;
    #email;
    #ativo;
    #senha;

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get nome() {
        return this.#nome;
    }
    set nome(value) {
        this.#nome = value;
    }

    get email() {
        return this.#email;
    }
    set email(value) {
        this.#email = value;
    }

    get ativo() {
        return this.#ativo;
    }
    set ativo(value) {
        this.#ativo = value;
    }

    get senha() {
        return this.#senha;
    }
    set senha(value) {
        this.#senha = value;
    }

    constructor(id, nome, email, ativo, senha) {
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#ativo = ativo;
        this.#senha = senha;
    }

    static toMap(row){
        let usuario = new UsuarioEntity(row["usu_id"],row["usu_nome"],row["usu_email"],row["usu_ativo"],row["usu_senha"]);
        return usuario;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            email: this.#email,
            ativo: this.#ativo,
            senha: this.#senha
        }
    }
}