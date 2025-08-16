<?php

namespace App\Http\Controllers;

use App\Models\UsersModel;
use App\Models\RolesModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UsersController{

    public function showFormCreateUser(){

        $allRoles = RolesModel::all();
        return Inertia::render('Users/registerLogin', ['roles'=>$allRoles]);
    }
    
    //Register and User into the table User First
    public function store(Request $request): RedirectResponse{
        
        $request -> validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,user_email',
            'password' => ['required', 'confirmed', Password::defaults()],
            'phone' => 'nullable|string|max:20',
            'user_type' => 'required|integer',
            'birthdate' => 'required|date',
            'age' => 'required|integer|min:0|max:120',
            'genre'=>'required|string|max:30'
        ]);

        $user = UsersModel::create([
            'user_name' => $request->name,
            'user_email' => $request->user_email,
            'user_password' => Hash::make($request->password),
            'user_phone' => $request->phone,
            'user_status' => 1,
            'rol_id'=>$request->user_type,
            'user_birthdate' => $request-> birthdate,
            'user_age' =>$request->age,
            'user_genre' => $request->genre
        ]);

        return Inertia::render('Users/Index', [
            'message' => 'Usuario creado correctamente',
            'user' => $user
        ]);
    }


}
