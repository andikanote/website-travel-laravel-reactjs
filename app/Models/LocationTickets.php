<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LocationTickets extends Model
{
    protected $table = 'location_ticket';

    protected $fillable = [
        'location_id',
        'ticket_id',
        'ticket_category_id',
    ];

    public function location()
    {
        return $this->belongsTo(Locations::class, 'location_id');
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id');
    }

    public function ticketCategory()
    {
        return $this->belongsTo(TicketCategory::class, 'ticket_category_id');
    }

}
