import AuthMiddleware from "../middlewares/authMiddleware.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";

export default class LoginControler {
    #usuarioRepository;

    constructor(){
        this.#usuarioRepository = new UsuarioRepository();
    }

    async token(req, res){
        try{
            let{email, senha} = req.body;
            if(email && senha){
                let usuario = await this.#usuarioRepository.validarAcesso(email,senha);
                if(usuario){
                    let auth = new AuthMiddleware();
                    let token = auth.gerarToken(usuario.id, usuario.nome, usuario.email, usuario.senha);
                    res.cookie("token",token,{
                        httpOnly: true
                    })
                    return res.status(200).json({token: token, usuario: usuario});
                }
                else{
                    return res.status(404).json({msg: "Usuario não encontrado"})
                }
            }
            else{
                return res.status(400).json({msg: "Informe um email e uma senha para gerar um token de acesso!"});
            }
        }
        catch(ex){
            console.log(ex);
            return res.status(500).json({msg: "Erro ao gerar token de acesso"});
        }
    }
}