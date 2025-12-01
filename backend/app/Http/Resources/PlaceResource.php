<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property \App\Models\Place $resource
 */
class PlaceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'place_number' => $this->resource->place_number,
            'status' => $this->resource->status,
            'sector' => SectorResource::make($this->whenLoaded('sector')),
            'reservations' => ReservationResource::collection($this->whenLoaded('reservations')),
        ];
    }
}
