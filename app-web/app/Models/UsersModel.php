<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UsersModel extends Model
{
    use HasFactory;

    protected $table = 'users';

    protected $primaryKey = 'id';

    protected $fillable = [
        'user_name',     
        'user_email',    
        'user_password', 
        'user_phone',
        'user_status',   
        'user_img',      
        'rol_id',            
        'user_age',      
        'user_birthdate',
        'user_genre'
    ];

    public $timestamps = true;

    public function rol(){
        return $this->belongsTo(Rol::class, 'rol_id');
    }

}
