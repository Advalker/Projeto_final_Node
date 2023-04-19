import { Request, Response, Router } from "express";
import userServices from "../services/user.services";
import { authorizationMiddleware } from "../middlewares/authorization.middleware"
const router = Router();

router.get('/', authorizationMiddleware, async (req: Request, res: Response) => {
    const students = await userServices.getAll();
    res.send(students);
});

router.get('/:document', authorizationMiddleware, async (req: Request, res: Response) => {
    const user = await userServices.getByDocument(req.params.document);
    if (!user) {
        res.status(400).send({ message: "Usuário não encontrado!" });
    };
    res.status(200).send({ message: 'Usuário encontrado!' });
});

router.post('/', async (req: Request, res: Response) => {
    if (req.body.age < 18) {
        return res.status(400).send({ message: 'Não autorizado! Idade mínima é de 18 anos.' });
    }
    await userServices.create(req.body);
    res.status(201).send({ message: 'Usuário criado com sucesso!' });
});

router.post('/authorization', async (req: Request, res: Response) => {
    try {
        const token = await userServices.authorization(req.body.document, req.body.password);
        res.status(200).send({ token });
    } catch (error: any) {
        res.status(401).send({ message: error.message })
    }
});

router.delete('/remove/:document', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await userServices.remove(req.params.document);
        res.send(200).send({ message: "Usuário removido com sucesso!!" })
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});

router.put('/:document', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await userServices.update(req.params.document, req.body);
        res.send({ message: "Usuário atualizado com sucesso!" })
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});

export default router;
