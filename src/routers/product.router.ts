import { Request, Response, Router } from "express";
import productsServices from "../services/product.services";
import { authorizationMiddleware } from "../middlewares/authorization.middleware"

const router = Router();
// req são os dados enviados pelo usuario
// res é a resposta para o usuario
router.get('/', authorizationMiddleware, async (req: Request, res: Response) => {
    const produtos = await productsServices.getAll();
    res.send(produtos);
});

router.get('/:cod', authorizationMiddleware, async (req: Request, res: Response) => {

    const produto = await productsServices.getBy_Id(req.params.cod);
    if (!produto) {
        res.status(400).send({ message: "Produto não encontrado!" });
    };
    res.status(200).send({ message: 'Produto encontrado!' });

});

router.post('/', authorizationMiddleware, async (req: Request, res: Response) => {
    await productsServices.create(req.body);
    res.status(201).send({ message: 'Produto criado com sucesso!' });
});



router.delete('/remove/:cod', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await productsServices.remove(req.params.cod);
        res.send(200).send({ message: "Produto removido com sucesso!!" })
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});

router.put('/:cod', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await productsServices.update(req.params.id, req.body);
        res.send({ message: "Produto atualizado com sucesso!" })
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});

export default router;
