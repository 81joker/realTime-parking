<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlaceResource;
use App\Models\Place;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    /**
     * Book a reservation for a place.
     * @return JsonResponse
     * @param Request $request
     */
    public function store(Request $request): JsonResponse
    {
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

        return DB::transaction(function () use ($request, $place) {
            // Create the reservation
            Reservation::create([
                'user_id' => 1,
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
                'place' => PlaceResource::make($place->load(['sector', 'reservations'])),
            ]);
        });

    }

    /**
     * Cancel a reservation.
     */
    public function cancel(Request $request, Reservation $reservation): JsonResponse
    {

        if ($reservation->user_id !== 1) {
            return response()->json([
                'error' => 'No Active reservation not found.',
            ]);
        
        } else {

            // $place = Place::find($reservation->place_id);
            // DB::transaction(function () use ($reservation, $place) {

            DB::transaction(function () use ($reservation) {
                // Delete the reservation
                // $reservation->delete();

                // Update the place status
                $reservation->update([
                    'status' => 'cancelled',
                ]);

                // $place->update([
                //     'status' => 'available',
                // ]);
                $reservation->place->update([
                    'status' => 'available',
                ]);
            });
        }

        return response()->json([
            'message' => 'Reservation cancelled successfully.',
            'place' => PlaceResource::make($reservation->place->load('sector', 'reservations')),
        ]);
    }
    // public function cancel($id) : JsonResponse
    // {
    //     $reservation = Reservation::find($id);

    //     if (!$reservation) {
    //         return response()->json([
    //             'error' => 'Reservation not found.',
    //         ], 404);
    //     }

    //     $place = Place::find($reservation->place_id);

    //     DB::transaction(function () use ($reservation, $place) {
    //         // Delete the reservation
    //         $reservation->delete();

    //         // Update the place status
    //         $place->update([
    //             'status' => 'available',
    //         ]);
    //     });

    //     return response()->json([
    //         'message' => 'Reservation cancelled successfully.',
    //     ]);
    // }
}
