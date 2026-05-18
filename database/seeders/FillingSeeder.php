<?php

namespace Database\Seeders;

use App\Models\Filling;
use Illuminate\Database\Seeder;

class FillingSeeder extends Seeder
{
    /**
     * Poblar rellenos disponibles.
     */
    public function run(): void
    {
        $fillings = [

            [
                'name' => 'Ganache de Chocolate',
                'extra_price' => 15,
            ],

            [
                'name' => 'Crema de Vainilla',
                'extra_price' => 10,
            ],

            [
                'name' => 'Mermelada de Fresa',
                'extra_price' => 12,
            ],

            [
                'name' => 'Queso de Crema',
                'extra_price' => 18,
            ],

            [
                'name' => 'Dulce de Leche',
                'extra_price' => 20,
            ],

        ];

        foreach ($fillings as $filling) {

            Filling::updateOrCreate(
                [
                    'name' => $filling['name']
                ],
                [
                    ...$filling,
                    'active' => true
                ]
            );
        }
    }
}
