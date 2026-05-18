<?php

namespace Database\Seeders;

use App\Models\Size;
use Illuminate\Database\Seeder;

class SizeSeeder extends Seeder
{
    /**
     * Poblar tamaños disponibles.
     */
    public function run(): void
    {
        $sizes = [

            [
                'name' => 'Pequeño',
                'adjustment_percentage' => 1.00,
            ],

            [
                'name' => 'Mediano',
                'adjustment_percentage' => 1.25,
            ],

            [
                'name' => 'Grande',
                'adjustment_percentage' => 1.50,
            ],

            [
                'name' => 'Extra Grande',
                'adjustment_percentage' => 2.00,
            ],

        ];

        foreach ($sizes as $size) {

            Size::updateOrCreate(
                [
                    'name' => $size['name']
                ],
                [
                    ...$size,
                    'active' => true
                ]
            );
        }
    }
}
