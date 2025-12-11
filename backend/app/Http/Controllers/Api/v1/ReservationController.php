<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlaceResource;
use App\Models\Place;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        // User::create([
        //     'name' => 'Test User',
        //     'email' => 'testuser@example.com',
        //     'password' => bcrypt('password'),
        // ]);
        // check if user already has reserved place
        $reservationExists = Reservation::where([
            'user_id' => 1,
            // 'user_id' => auth()->id(),
            'status' => 'reserved',
        ])->exists();

        // if yes
        if ($reservationExists) {
            return response()->json([
                'error' => 'You already have a reserved place. Please cancel it before making a new reservation.',
            ], 400);
        }
        // check if user already has reserved Park
        $reservationParked = Reservation::where([
            'user_id' => 1,
            // 'user_id' => auth()->id(),
            'status' => 'parked',
        ])->exists();

        // if yes
        if ($reservationParked) {
            return response()->json([
                'error' => 'You already have a reserved parked. Please cancel it before making a new reservation.',
            ]);
        }

        // Find the place
        $place = Place::find($request->place_id);
        if (! $place || $place->status !== 'available') {
            return response()->json([
                'error' => 'Place not found.',
            ]);
        }

        DB::transaction(function () use ($request, $place) {
            // Create the reservation
            Reservation::create([
                'user_id' => 1,
                // 'user_id' => auth()->id(),
                'place_id' => $request->place_id,
                'status' => 'reserved',
            ]);

            // Update the place status
            $place->update([
                'status' => 'reserved',
            ]);

            $place->refresh();

            return response()->json([
                'message' => 'Reservation created successfully.',
                'place' => PlaceResource::make($place->load('sector', 'reservations')),
            ]);
        });

    }
}
