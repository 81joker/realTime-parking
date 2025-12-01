<?php

namespace App\Http\Controllers\Api\v1;

use App\Models\Place;
use App\Http\Controllers\Controller;
use App\Http\Resources\PlcaeResource;
use Illuminate\Http\Resources\Json\JsonResource;

class PlaceController extends Controller
{
    public function index():JsonResource
    {
        $places = Place::with(['sector', 'reservations'])->get();
        return PlcaeResource::collection($places);
    }
}
