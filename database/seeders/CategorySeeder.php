<?php

namespace Database\Seeders;

use App\Models\Category;

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Poblar categorías base del catálogo.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Cakes',
                'slug' => 'cakes',
            ],
            [
                'name' => 'Cheesecakes',
                'slug' => 'cheesecakes',
            ],
            [
                'name' => 'Cupcakes',
                'slug' => 'cupcakes',
            ],
            [
                'name' => 'Cookies',
                'slug' => 'cookies',
            ],
            [
                'name' => 'Brownies',
                'slug' => 'brownies',
            ],
            [
                'name' => 'Donuts',
                'slug' => 'donuts',
            ],
        ];

        foreach ($categories as $category) {

            Category::updateOrCreate(

                [
                    'slug' => $category['slug']
                ],
                [
                    'name' =>
                        $category['name'],

                    'slug' =>
                        $category['slug'],

                    'description' =>
                        $category['name'] . ' category',
                        
                    'active' => true,
                ]
            );
        }
    }
}
