import { ProductoRepository } from "../domain/productoRepository";

interface ProductoData {
    nombre: string;
    descripcion?: string;
    precio: number;
    cantidad: number;
    disponible?: boolean;
}

export class CreateProducto {
    private productoRepository: ProductoRepository;

    constructor(productoRepository: ProductoRepository) {
        this.productoRepository = productoRepository;
    }

    async execute(data: ProductoData) {
        const { nombre, descripcion, precio, cantidad, disponible = true } = data;

        // Validar los datos de entrada
        if (!nombre || precio <= 0 || cantidad < 0) {
            throw new Error("Datos inválidos para crear el producto");
        }

        const nuevoProducto = {
            nombre,
            descripcion,
            precio,
            cantidad,
            disponible,
        };

        // Guardar el producto utilizando el repositorio
        return this.productoRepository.createProducto(nuevoProducto);
    }
}
