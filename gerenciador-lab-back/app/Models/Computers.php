<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Computers extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'nome', 
        'patrimonio', 
        'retirado', 
        'laboratory_id'
    ];

    public function laboratorio()
    {
        return $this->belongsTo(Laboratory::class, 'laboratory_id');
    }
}