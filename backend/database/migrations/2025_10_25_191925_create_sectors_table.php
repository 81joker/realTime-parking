<?php

use App\Models\Sector;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sectors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description')->nullable();
            $table->decimal('price', 8, 2);
            // $table->decimal('price_per_hour', 8, 2);
            $table->timestamps();
        });
        // Insert Sectors
        Sector::insert([
            [
                'name' => 'Sector A',
                'description' => 'This is Sector A description.',
                'price' => 10.00,
            ],
            [
                'name' => 'Sector B',
                'description' => 'This is Sector B description.',
                'price' => 15.00,
            ],
            [
                'name' => 'Sector C',
                'description' => 'This is Sector C description.',
                'price' => 20.00,
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sectors');
    }
};
