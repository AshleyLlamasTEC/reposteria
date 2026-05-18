<?php

namespace Database\Seeders;

use App\Models\Frosting;
use Illuminate\Database\Seeder;

class FrostingSeeder extends Seeder
{
    /**
     * Poblar coberturas disponibles.
     */
    public function run(): void
    {
        $frostings = [

            [
                'name' => 'Crema de mantequilla',
                'extra_price' => 10,
            ],

            [
                'name' => 'Crema de Queso',
                'extra_price' => 15,
            ],

            [
                'name' => 'Ganache de Chocolate',
                'extra_price' => 18,
            ],

            [
                'name' => 'Crema Batida',
                'extra_price' => 12,
            ],

            [
                'name' => 'Fondant',
                'extra_price' => 25,
            ],

        ];

        foreach ($frostings as $frosting) {

            Frosting::updateOrCreate(
                [
                    'name' => $frosting['name']
                ],
                [
                    ...$frosting,
                    'active' => true
                ]
            );
        }
    }
}
