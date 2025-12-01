<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlcaeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "place_number" => $this->place_number,
            "status" => $this->status,
            "sector" => SectorResource::make($this->whenLoaded('sector')),
            "reservations" => ReservationResource::collection($this->whenLoaded('reservations')),
                
        ];
    }
}
