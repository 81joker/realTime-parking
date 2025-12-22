<?php

namespace App\Http\Controllers\Api\v1;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Place;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Resources\PlaceResource;

class ReservationController extends Controller
{
    /**
     * Book a reservation for a place.
     */
    public function store(Request $request): JsonResponse
    {
        // check is already has unpaid reservation
        $unpaidReservationExists = Reservation::where([
            'user_id' => $request->user()->id,
            'status' => 'finished',
            // 'amount' => null,
        ])->first();


        if ($unpaidReservationExists) {
            $stripeUrl = $this->createStripeCheckoutSession($unpaidReservationExists);
            return response()->json([
                'payment_url' => $stripeUrl,
                'paymentError' => 'You have an unpaid reservation. Please pay it before making a new reservation.',
            ]);
        }

        // check if user already has reserved place
        $reservationExists = Reservation::where([
            'user_id' => $request->user()->id,
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
            'user_id' => $request->user()->id,
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

            $message = 'Reservation created successfully.';

            return $this->placeResource($place, $message);
        });
    }

    /**
     * Cancel a reservation.
     *
     * @param  User  $user
     */
    public function cancel(Request $request, Reservation $reservation): JsonResponse
    {

        if ($response = $this->ensureUserOwnsReservation($request, $reservation)) {
            return $response;
        } else {

            DB::transaction(function () use ($reservation) {

                // Update the place status
                $reservation->update([
                    'status' => 'cancelled',
                ]);

                $reservation->place->update([
                    'status' => 'available',
                ]);
            });
        }

        $message = 'Reservation cancelled successfully.';

        return $this->placeResource($reservation->place, $message);
    }

    /**
     * Start parking for a reservation.
     */
    public function startParking(Request $request, Reservation $reservation): JsonResponse
    {

        if ($response = $this->ensureUserOwnsReservation($request, $reservation)) {
            return $response;
        } else {

            DB::transaction(function () use ($reservation) {
                // Delete the reservation
                // $reservation->delete();

                // Update the place status
                $reservation->update([
                    'status' => 'parked',
                    'start_time' => Carbon::now(),
                ]);

                $reservation->place->update([
                    'status' => 'occupied',
                ]);
            });
        }

        $message = 'Parking started successfully.';

        return $this->placeResource($reservation->place, $message);
    }

    /**
     * End parking for a reservation.
     *
     * @param  User  $user
     */
    public function EndParking(Request $request, Reservation $reservation): JsonResponse
    {

        if ($response = $this->ensureUserOwnsReservation($request, $reservation)) {
            return $response;
        } else {

            DB::transaction(function () use ($reservation) {

                // Update the place status
                $reservation->update([
                    'status' => 'finished',
                    'end_time' => Carbon::now(),
                ]);

                $reservation->place->update([
                    'status' => 'available',
                ]);
            });
        }

        $hours = ceil($reservation->start_time->diffInMinutes($reservation->end_time) / 60);
        $place = $reservation->place;
        $sector = $place->sector;
        $pricePerHour = $sector->price;
        $amount = $hours * $pricePerHour;
        $reservation->update([
            'amount' => $amount,
        ]);

        $message = 'Parking ended successfully. Total amount: '.$amount.' USD';

        return $this->placeResource($reservation->place, $message);
    }

    /**
     * Ensure the authenticated user owns the reservation.
     *
     * @param  User  $user
     */
    private function ensureUserOwnsReservation(Request $request, Reservation $reservation): ?JsonResponse
    {
        if ($reservation->user_id !== 1) {
            // if ($reservation->user_id !== $user->id) {
            return response()->json([
                'error' => 'No Active reservation not found.',
            ]);
        }

        return null;
    }

    /**
     * Prepare the place resource response.
     */
    private function placeResource(Place $place, string $message): JsonResponse
    {
        return response()->json([
            'message' => $message,
            'place' => PlaceResource::make($place->load('sector', 'reservations')),
        ]);
    }

    /**
     * Pay reservation amount via Stripe Checkout.
     * @param  Reservation  $reservation
     * @return string  
     */
    private function createStripeCheckoutSession(Reservation $reservation): string
    {
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
        

        $checkoutSession = \Stripe\Checkout\Session::create([
            // 'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => 'Parking Reservation #'.$reservation->place->place_num,
                    ],
                    'unit_amount' =>(int) $reservation->amount * 100, // amount in cents
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => env('FRONTEND_URL').'/payment-success?session_id={CHECKOUT_SESSION_ID}&reservation_id='.$reservation->id,
            'cancel_url' => env('FRONTEND_URL').'/payment-cancel',
        ]);
        return $checkoutSession->url;
    }
}
