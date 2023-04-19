import { Product } from "../models/product.models";


class ProductRepository {

    getAll() {
        return Product.find();
    }

    getByCod(cod: string) {
        return Product.findOne({ cod: cod });
    }

    create(product: typeof Product) {
        return Product.create(product);
    }

    update(document: string, product: Partial<typeof Product>) {
        return Product.updateOne({ document: document }, { $set: product });
    }

    remove(document: string) {
        return Product.deleteOne({ document: document })
    }

}

export default new ProductRepository();


