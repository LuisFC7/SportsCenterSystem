<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RecepcionistModel extends Model{
    use HasFactory;

    protected $table = 'recepcionista';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'user_schedule',
        'user_hire_date'
    ];

    public function generalUser(){
        // return $this->belongsTo(Users::class, 'id');
        return $this->belongsTo(UsersModel::class, 'user_id', 'id');

    }

}
