/**
 * Configuración de precios para pedidos personalizados.
 */

const prices = {
    base: {
        pastel: 200,
        tarta: 180,
        cupcakes: 150,
        galletas: 120,
        cheesecake: 220,
    },
    flavors: {
        chocolate: 50,
        vainilla: 40,
        fresa: 45,
        limon: 42,
        'red-velvet': 55,
        'tres-leches': 48,
        zanahoria: 52,
        coco: 46,
        cafe: 53,
        'frutos-rojos': 58,
    },
    sizes: {
        chico: 1.0,
        mediano: 1.5,
        grande: 2.0,
        'extra-grande': 2.8,
    },
    quantities: {
        6: 0.5,
        12: 1.0,
        24: 1.8,
        36: 2.5,
        48: 3.0,
        72: 4.0,
        100: 5.5,
    },
    fillings: {
        crema: 20,
        mermelada: 15,
        ganache: 30,
        frutas: 25,
        'crema-pastelera': 22,
        'dulce-de-leche': 28,
        ninguno: 0,
    },
    frostings: {
        mantequilla: 20,
        crema: 15,
        fondant: 50,
        chocolate: 30,
        merengue: 25,
        'crema-cheese': 35,
        ninguno: 0,
    },
    decorations: {
        basica: 0,
        media: 80,
        compleja: 150,
        tematico: 200,
        personalizado: 300,
    },
};


/**
 * Configuración por tipo.
 */
const configurations = {
    pastel: {
        hasFilling: true,
        hasFrosting: true,
        hasSize: true,
        hasQuantity: false,
    },
    tarta: {
        hasFilling: false,
        hasFrosting: false,
        hasSize: true,
        hasQuantity: false,
    },
    cupcakes: {
        hasFilling: true,
        hasFrosting: true,
        hasSize: false,
        hasQuantity: true,
    },
    galletas: {
        hasFilling: false,
        hasFrosting: false,
        hasSize: false,
        hasQuantity: true,
    },
    cheesecake: {
        hasFilling: false,
        hasFrosting: false,
        hasSize: true,
        hasQuantity: false,
    },
};


/**
 * Calcula precio del pedido.
 */
export function calculateCustomOrderPrice(
    customOrder
) {

    const config =
        configurations[
            customOrder.tipo
        ];

    const basePrice =
        prices.base[
            customOrder.tipo
        ] || 0;

    const flavorPrice =
        prices.flavors[
            customOrder.sabor
        ] || 0;

    const fillingPrice =
        config.hasFilling
            ? prices.fillings[
                customOrder.relleno
            ] || 0
            : 0;

    const frostingPrice =
        config.hasFrosting
            ? prices.frostings[
                customOrder.betun
            ] || 0
            : 0;

    const decorationPrice =
        prices.decorations[
            customOrder.decoracion
        ] || 0;

    const themePrice =
        customOrder.tematica?.trim()
            ? 100
            : 0;

    let multiplier = 1;

    if (
        config.hasSize
    ) {

        multiplier =
            prices.sizes[
                customOrder.tamaño
            ] || 1;
    }

    if (
        config.hasQuantity
    ) {

        multiplier =
            prices.quantities[
                customOrder.cantidad
            ] || 1;
    }

    const subtotal =
        (
            basePrice +
            flavorPrice
        ) * multiplier;

    const total =
        subtotal +
        fillingPrice +
        frostingPrice +
        decorationPrice +
        themePrice;
    return {
        base: basePrice,
        flavor: flavorPrice,
        filling: fillingPrice,
        frosting: frostingPrice,
        decoration: decorationPrice,
        theme: themePrice,
        multiplier,
        total:
            Math.round(
                total
            ),
    };
}
