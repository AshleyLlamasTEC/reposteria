<?php

namespace Database\Seeders;

use App\Models\Flavor;
use Illuminate\Database\Seeder;

class FlavorSeeder extends Seeder
{
    /**
     * Poblar sabores disponibles.
     */
    public function run(): void
    {
        $flavors = [

            ['name' => 'Vainilla', 'extra_price' => 0],
            ['name' => 'Chocolate', 'extra_price' => 10],
            ['name' => 'Fresa', 'extra_price' => 12],
            ['name' => 'Red Velvet', 'extra_price' => 15],
            ['name' => 'Matcha', 'extra_price' => 20],

        ];

        foreach ($flavors as $flavor) {

            Flavor::updateOrCreate(
                [
                    'name' => $flavor['name']
                ],
                [
                    ...$flavor,
                    'active' => true
                ]
            );
        }
    }
}
