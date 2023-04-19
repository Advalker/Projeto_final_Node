import { IUser } from "../models/user.models";
import UserRepository from "../repositories/user.repository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const secretJWT = process.env.JWT_SECRET_KEY || "";

class UserServices {

    getAll() {
        return UserRepository.getAll();
    }

    getByDocument(document: string) {

        return UserRepository.getByDocument(document);
    }

    async create(user: IUser) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10)
        }
        return UserRepository.create(user);

    }

    async authorization(document: string, password: string) {
        const user = await UserRepository.getByDocument(document);
        if (!user) throw new Error('Usuário não encontrado!');

        const result = await bcrypt.compare(password, user.password);

        if (result) {
            return jwt.sign({ document: user.document, _id: user._id }, secretJWT, {
                expiresIn: '1h'
            });
        };

        throw new Error('Falha na autenticação')
    }

    remove(document: string) {
        return UserRepository.remove(document);
    }

    update(document: string, user: Partial<IUser>) {
        return UserRepository.update(document, user)
    }
}
export default new UserServices();