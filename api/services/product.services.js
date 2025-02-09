import { faker } from '@faker-js/faker';
import boom from '@hapi/boom';

class ProductService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit ; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return this.products;
  }

  async findOne(id) {
    const product = this.products.find(product => product.id === id);
    if(!product) throw boom.notFound('Product not found');
    if(product.isBlock) throw boom.conflict('Product is block');
    return product;
  }

  async update(data, id) {
    const index = this.products.findIndex(p => p.id === id);
    if(index === -1) throw boom.notFound('Product not found');

    const product = this.products[index];
    const updatedProduct = {
      ...product,
      ...data
    }
    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  async replace(data, id) {
    const index = this.products.findIndex(p => p.id === id);
    if(index === -1) throw boom.notFound('Product not found');

    const replacedProduct = {
      id,
      ...data
    }
    this.products[index] = replacedProduct;
    return replacedProduct;
  }

  async delete(id) {
    const index = this.products.findIndex(p => p.id === id);
    if(index === -1) throw boom.notFound('Product not found');

    this.products.splice(index, 1);
    return { id };
  }
}

export default ProductService;
