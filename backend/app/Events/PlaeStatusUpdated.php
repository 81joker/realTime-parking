<?php

namespace App\Events;

use App\Models\Place;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PlaeStatusUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    // public Place $place;
    /**
     * Create a new event instance.
     */
    public function __construct(public Place $place)
    {
        $this->place = $place;

    }

    /**
     * Get the channels the event should broadcast on.
     *@return PrivateChannel
     */
    public function broadcastOn()
    {
        return new PrivateChannel('places');
    }

    /**
     * Get the channels the event should broadcast on.
     *@return PrivateChannel
     */
    public function broadcastWith()
    {
        return ['place' => $this->place->load('sector' ,'reservations')];
    }

    /**
     * Get the channels the event should broadcast on.
     *@return PrivateChannel
     */
    public function broadcastAs()
    {
        return 'placeUpdated';
    }
}
