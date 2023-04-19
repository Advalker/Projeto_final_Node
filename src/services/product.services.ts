import { Product } from "../models/product.models";
import ProductRepository from "../repositories/product.repository";
class ProductServices {

    getAll() {
        return ProductRepository.getAll();
    }

    getBy_Id(cod: string) {

        return ProductRepository.getByCod(cod);
    }

    create(cod: typeof Product) {
        return ProductRepository.create(cod);

    }

    remove(cod: string) {
        return ProductRepository.remove(cod);
    }

    update(cod: string, produto: Partial<typeof Product>) {
        return ProductRepository.update(cod, produto)
    }
}
export default new ProductServices();