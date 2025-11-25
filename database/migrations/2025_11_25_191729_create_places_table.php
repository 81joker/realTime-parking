<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('places', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sector_id')->constrained()->onDelete('cascade');
            $table->string('place_number')->unique();
            $table->enum('status', ['available', 'reserved', 'occupied'])->default('available');
            $table->timestamps();
        });

        // Insert Places
        $placePerSector = [20, 15, 15]; // Number of places per sector
        for ($sectorId = 1; $sectorId <= count($placePerSector); $sectorId++) {
            for ($i = 1; $i <= $placePerSector[$sectorId - 1]; $i++) {
                $placeNumber = 'P'.str_pad((array_sum(array_slice($placePerSector, 0, $sectorId - 1)) + $i), 3, '0', STR_PAD_LEFT);
                DB::table('places')->insert([
                    'sector_id' => $sectorId,
                    'place_number' => $placeNumber,
                    'status' => 'available',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
        // $places = [];
        // for ($i = 1; $i <= 50; $i++) {
        //     $sectorId = ($i <= 20) ? 1 : (($i <= 35) ? 2 : 3);
        //     $places[] = [
        //         'sector_id' => $sectorId,
        //         'place_number' => 'P' . str_pad($i, 3, '0', STR_PAD_LEFT),
        //         'status' => 'available',
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ];
        // }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('places');
    }
};
