import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repositories/usuarioRepository.js';
const SEGREDO_JWT = "fbdhfg74njffar286"

export default class AuthMiddleware {

    gerarToken(id, nome, email) {
        return jwt.sign({
            id: id,
            nome: nome,
            email: email,
        }, SEGREDO_JWT, { expiresIn: '5h' });
    }

    async validar(req, res, next) {
        if (req.cookies.token) {
            let token = req.cookies.token; //se existir no cabeçalho recupera o valor

            try {
                let payload = jwt.verify(token, SEGREDO_JWT);
                let usuarioRepository = new UsuarioRepository();
                let usuario = await usuarioRepository.obter(payload.id);
                if (usuario) {
                    if (usuario.ativo) {
                        req.usuarioLogado = usuario;
                        next();
                    }
                    else {
                        return res.status(401).json({ msg: "Usuario Inativo" });
                    }
                }
                else{
                    return res.status(401).json({msg: "Usuario não encontrado"});
                }
            }
            catch (ex) {
                console.log(ex)
                return res.status(401).json({ msg: "Token inválido!" });
            }
        }
        else {
            return res.status(401).json({ msg: "Token não encontrado!" });
        }
    }

}