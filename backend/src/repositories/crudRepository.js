const NotFoundError = require("../errors/notFound");

class CrudRepository {
  constructor(model, modelName = "Record") {
    this.model = model;
    this.modelName = modelName;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async destroy(id) {
    const response = await this.model.findByIdAndDelete(id);
    if (!response) {
      throw new NotFoundError(this.modelName, id);
    }
    return response;
  }

  async get(id) {
    const response = await this.model.findById(id);
    if (!response) {
      throw new NotFoundError(this.modelName, id);
    }
    return response;
  }

  async getAll() {
    return await this.model.find();
  }

  async update(id, data) {
    const response = await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      throw new NotFoundError(this.modelName, id);
    }
    return response;
  }
}

module.exports = CrudRepository;
