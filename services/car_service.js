import { ValidationError, NotFoundError } from '../errors/app_errors.js';

export class CarService {
    constructor(carRepo) {
        this.carRepo = carRepo;
    }

    async getCars() {
        console.log('CAR REPO', this.carRepo);
        return await this.carRepo.find();
    }

    async getCarById(id) {
        const car = await this.carRepo.findById(id);
        if (!car) {
            throw new NotFoundError('El vehículo solicitado no existe');
        }
        return car;
    }

    async createCar(carData) {
        if (!carData.brand || !carData.model) {
            throw new ValidationError('La marca y el modelo son obligatorios');
        }
        if (carData.price <= 0) {
            throw new ValidationError('El precio debe ser un valor positivo');
        }
        return await this.carRepo.create(carData);
    }

    async updateCar(id, carData) {
        if (carData.price !== undefined && carData.price <= 0) {
            throw new ValidationError('El precio debe ser un valor positivo');
        }
        const updatedCar = await this.carRepo.findByIdAndUpdate(id, carData, { new: true });

        if (!updatedCar) {
            throw new NotFoundError('No se encontró el vehiculo a actualizar');
        }
        return updatedCar;
    }

    async deleteCar(id) {
        const deletedCar = await this.carRepo.findByIdAndDelete(id);
        if (!deletedCar) {
            throw new NotFoundError('No se encontró el vehiculo a eliminar');
        }
        return deletedCar;
    }
}