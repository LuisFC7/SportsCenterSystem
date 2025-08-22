<?php

namespace App\Http\Controllers;

use App\Models\UsersModel;
use App\Models\RolesModel;
use App\Models\RecepcionistModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules\Password;


class UsersController{

    public function showFormCreateUser(){

        $allRoles = RolesModel::all();
        // dd($allRoles->toArray());
        return Inertia::render('Users/registerLogin', ['roles'=>$allRoles]);
    }
    
    //Register and User into the table User First
    public function store(Request $request){
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,user_email',
            'password' => ['required', 'confirmed', Password::defaults()],
            'phone' => 'nullable|string|max:20',
            'image'=> 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'user_type' => 'required|integer',
            'birthdate' => 'required|date',
            'age' => 'required|integer|min:0|max:120',
            'schedule' => 'required|string|max:50',   
            'hired_date' => 'required|date'
        ],[
            'name.required' => 'El nombre completo es obligatorio',
            'email.required'=> 'El email es obligatorio',
            'email.unique' => 'El correo introducido ya se encuentra registrado',
            'password.required' => 'La contraseña es obligatoria',
            'user_type.required' => 'Debe seleccionar un tipo de usuario',
            'birthdate.required'=> 'La fecha de nacimiento es obligatoria',
            'schedule.required' => 'Debe indicar el horario laboral',
            'hired_date.required' => 'Debe indicar la fecha de contratación'
        ]);
        
        if($request->hasFile('image')){
            $path = $request->file('image')->store('profiles_img', 'public');
        }

        $user = UsersModel::create([
            'user_name' => $request->name,
            'user_email' => $request->email,
            'user_password' => Hash::make($request->password),
            'user_phone' => $request->phone,
            'user_img' => $path ?? null,
            'user_status' => 1,
            'rol_id'=>$request->user_type,
            'user_birthdate' => $request-> birthdate,
            'user_age' =>$request->age,
            'user_genre' => $request->genre
        ]);
        
        $createdUser = UsersModel::where('user_email', $request->email)->first();

        $recepcionist = RecepcionistModel::create([
            'user_id'=>$createdUser->id,
            'user_schedule' => $request ->schedule,
            'user_hire_date' => $request ->hired_date
        ]);

        return redirect()->route('home')->with('flash', [
            'message' => 'Usuario creado correctamente 🎉'
        ]);
    }
}