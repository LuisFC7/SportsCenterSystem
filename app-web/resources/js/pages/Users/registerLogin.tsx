import { useForm } from '@inertiajs/react';
import { useState, useRef} from 'react';
import { FormEvent } from 'react';

type UserForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    user_type: number;
    birthdate: string;
    age: number;
    genre: string;
}

interface Props {
    roles: { id: number; role_name: string }[];
}

export default function Register({ roles }: Props) {

    const { data, setData, post, processing, errors } = useForm<UserForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        user_type: 0,
        birthdate: '',
        age: 17,
        genre: ''
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/users-store');
    };

    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-lg bg-black rounded-lg shadow-md p-6 sm:p-8">
                <h1 className="text-3xl font-titles text-white mb-6 text-center">
                    Registrar Usuario
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Nombre */}
                    <div className="flex flex-col font-body font-body">
                        <label htmlFor="name" className="text-white mb-1">
                            Nombre
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col font-body">
                        <label htmlFor="email" className="text-white mb-1 font-body">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {/* Contraseña */}
                    <div className="flex flex-col font-body">
                        {
                            isPasswordFocused && (
                                <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                                <p className="font-bold">Importante</p>
                                <p className="text-sm">La contraseña debe tener 12 caracteres.
                                    Al menos una mayúscula, una minuscula, un digito y un caracter especial.
                                    
                                </p>
                        </div>
                            )
                        }
                        <label htmlFor="password" className="text-white mb-1 font-body">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {/* Confirmar Contraseña */}
                    <div className="flex flex-col font-body">
                        <label htmlFor="password_confirmation" className="text-white mb-1 font-body">
                            Confirmar Contraseña
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirmar Contraseña"
                            value={data.password_confirmation}
                            onChange={e => setData('password_confirmation', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {/* Teléfono */}
                    <div className="flex flex-col font-body">
                        <label htmlFor="phone" className="text-white mb-1 font-body">
                            Teléfono
                        </label>
                        <input
                            id="phone"
                            type="text"
                            name="phone"
                            placeholder="Teléfono"
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {/* Tipo de usuario */}
                    <div className="flex flex-col font-body">
                        <label htmlFor="user_type" className="text-white mb-1 font-body">
                            Tipo de Usuario
                        </label>
                        <select
                            id="user_type"
                            name="user_type"
                            value={data.user_type}
                            onChange={e => setData('user_type', Number(e.target.value))}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        >
                            <option value="disabled"> -- Selecciona un tipo de usuario -- </option>
                            {roles.map(role => (
                                <option key={role.id} value={Number(role.id)}>
                                    {role.role_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fecha de nacimiento */}
                    <div className="flex flex-col font-body">
                        <label htmlFor="birthdate" className="text-white mb-1 font-body">
                            Fecha de Nacimiento
                        </label>
                        <input
                            id="birthdate"
                            type="date"
                            name="birthdate"
                            value={data.birthdate}
                            onChange={e => setData('birthdate', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {/* Edad */}
                    <div className="flex flex-col font-body">
                        <label htmlFor="age" className="text-white mb-1 font-body">
                            Edad
                        </label>
                        <input
                            id="age"
                            type="number"
                            name="age"
                            placeholder="Edad"
                            value={data.age}
                            min={17} 
                            onChange={e => {
                                const value = Number(e.target.value);
                                if (value > 0) setData('age', value);
                                else setData('age', 17); 
                            }}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {/* Género */}
                    <div className="flex flex-col font-body">
                        <label htmlFor="genre" className="text-white mb-1 font-body">
                            Género
                        </label>
                        <select
                            id="genre"
                            name="genre"
                            value={data.genre}
                            onChange={e => setData('genre', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        >
                            <option value="">Selecciona género</option>
                            <option value="male">Masculino</option>
                            <option value="female">Femenino</option>
                            <option value="other">Otro</option>
                        </select>
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 text-white py-3 rounded-md font-body hover:bg-blue-700 transition font-body"
                    >
                        Registrar
                    </button>

                    {/* Errores */}
                    {errors && Object.keys(errors).length > 0 && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-2" role="alert">
                            <p className="font-messages">Error en el registro</p>
                            {Object.values(errors).map((err, i) => (
                                <p key={i}>{err}</p>
                            ))}
                        </div>
                    )}

                    
                </form>
            </div>
        </div>
    );
}
