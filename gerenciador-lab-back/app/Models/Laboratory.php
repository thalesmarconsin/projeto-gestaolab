<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laboratory extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome', 
        'localizacao'
    ];

    public function computadores()
    {
        return $this->hasMany(Computers::class);
    }
}