<?php

namespace Database\Seeders;

use App\Models\Decoration;
use Illuminate\Database\Seeder;

class DecorationSeeder extends Seeder
{
    /**
     * Poblar decoraciones disponibles.
     */
    public function run(): void
    {
        $decorations = [

            [
                'name' => 'Fruta fresca',
                'extra_price' => 20,
            ],

            [
                'name' => 'Chispas de chocolate',
                'extra_price' => 10,
            ],

            [
                'name' => 'Sprinkles',
                'extra_price' => 8,
            ],

            [
                'name' => 'Macarons',
                'extra_price' => 30,
            ],

            [
                'name' => 'Personalización con fondant',
                'extra_price' => 35,
            ],

        ];

        foreach ($decorations as $decoration) {

            Decoration::updateOrCreate(
                [
                    'name' => $decoration['name']
                ],
                [
                    ...$decoration,
                    'active' => true
                ]
            );
        }
    }
}
