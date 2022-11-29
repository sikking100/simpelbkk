<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        \App\Models\User::factory()->create([
            'username' => '7212',
            'password' => Hash::make('212022'),
            'type' => 'kabupaten',
        ]);
        \App\Models\User::factory()->create([
            'username' => '7212012004',
            'password' => Hash::make('996236'),
            'type' => 'desa',
        ]);
    }
}
