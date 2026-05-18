<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Poblar catálogo real de productos.
     */
    public function run(): void
    {
        $products = [
            [
                'category_slug' => 'cakes',
                'name' => 'Pastel de Chocolate',
                'base_price' => 480,
                'image_url' => '/images/shop/pastel-chocolate.jpg',
                'description' =>
                'Pastel de chocolate intenso con relleno de ganache y cubierta de chocolate belga',
                'rating' => 4.8,
                'reviews_count' => 42,
                'delivery_time' => '24-48 horas',
                'serves' => '10-12 personas',
                'ingredients' => [
                    'Chocolate belga',
                    'Harina de almendra',
                    'Crema batida',
                    'Frambuesas'
                ],
                'tags' => [
                    'Chocolate',
                    'Clásico',
                    'Familiar'
                ],
                'popular' => true,
                'is_new' => false,
            ],
            [
                'category_slug' => 'cakes',
                'name' => 'Pastel de Zanahoria',
                'base_price' => 500,
                'image_url' => '/images/shop/pastel-zanahoria.jpg',
                'description' =>
                'Pastel esponjoso de zanahoria con nueces y frosting de queso crema',
                'rating' => 4.9,
                'reviews_count' => 38,
                'delivery_time' => '24 horas',
                'serves' => '8-10 personas',
                'ingredients' => [
                    'Zanahoria rallada',
                    'Nueces',
                    'Queso crema',
                    'Canela'
                ],
                'tags' => [
                    'Tradicional',
                    'Especias',
                    'Nueces'
                ],
                'popular' => true,
                'is_new' => false,
            ],
            [
                'category_slug' => 'cheesecakes',

                'name' => 'Cheesecake de Frutos Rojos',
                'base_price' => 420,
                'image_url' => '/images/shop/frutos.jpg',
                'description' =>
                'Cheesecake cremoso con base de galleta y salsa de frutos rojos casera',
                'rating' => 4.7,
                'reviews_count' => 56,
                'delivery_time' => '12-24 horas',
                'serves' => '6-8 personas',
                'ingredients' => [
                    'Queso crema',
                    'Galleta María',
                    'Frutos rojos',
                    'Mermelada'
                ],
                'tags' => [
                    'Cremoso',
                    'Frutos Rojos',
                    'Postre Frío'
                ],
                'popular' => true,
                'is_new' => false,
            ],
            [
                'category_slug' => 'cupcakes',
                'name' => 'Cupcakes x6',
                'base_price' => 180,
                'image_url' => '/images/shop/cupcakes.jpg',
                'description' =>
                '6 cupcakes decorados con frosting de mantequilla y toppings variados',
                'rating' => 4.5,
                'reviews_count' => 31,
                'delivery_time' => '6-12 horas',
                'serves' => '3-6 personas',
                'ingredients' => [
                    'Harina',
                    'Mantequilla',
                    'Huevos',
                    'Frosting'
                ],
                'tags' => [
                    'Individual',
                    'Decorado',
                    'Fiesta'
                ],
                'popular' => true,
                'is_new' => false,
            ],
            [
                'category_slug' => 'donuts',
                'name' => 'Donas Glaseadas x6',
                'base_price' => 120,
                'image_url' => '/images/shop/donas.jpg',
                'description' =>
                '6 donas esponjosas con glaseados de diferentes sabores y toppings',
                'rating' => 4.4,
                'reviews_count' => 18,
                'delivery_time' => '4-8 horas',
                'serves' => '3-6 personas',
                'ingredients' => [
                    'Harina',
                    'Levadura',
                    'Azúcar',
                    'Glaseados'
                ],
                'tags' => [
                    'Esponjoso',
                    'Glaseado',
                    'Matutino'
                ],
                'popular' => false,
                'is_new' => true,
            ],

        ];

        foreach ($products as $product) {

            $category = Category::where(
                'slug',
                $product['category_slug']
            )->firstOrFail();

            Product::updateOrCreate(
                [
                    'slug' => Str::slug(
                        $product['name']
                    )
                ],
                [
                    'category_id' =>
                    $category->id,

                    'name' =>
                    $product['name'],

                    'slug' =>
                    Str::slug(
                        $product['name']
                    ),

                    'description' =>
                    $product['description'],

                    'base_price' =>
                    $product['base_price'],

                    'stock' => 20,

                    'image_url' =>
                    $product['image_url'],

                    'rating' =>
                    $product['rating'],

                    'reviews_count' =>
                    $product['reviews_count'],

                    'delivery_time' =>
                    $product['delivery_time'],

                    'serves' =>
                    $product['serves'],

                    'ingredients' =>
                    $product['ingredients'],

                    'tags' =>
                    $product['tags'],

                    'popular' =>
                    $product['popular'],

                    'is_new' =>
                    $product['is_new'],

                    'active' =>
                    Product::ACTIVE,

                    'customizable' =>
                    Product::CUSTOMIZABLE,
                ]
            );
        }
    }
}
