import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface UserForm {
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
    roles: { id: number; name: string }[];
}

export default function Register({ roles }: Props) {
    
    const { data, setData, post, processing, errors } = useForm<UserForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        user_type: roles[0]?.id || 0,
        birthdate: '',
        age: 0,
        genre: ''
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/users'); 
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Registrar Usuario</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                />
                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirmar Contraseña"
                    value={data.password_confirmation}
                    onChange={e => setData('password_confirmation', e.target.value)}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Teléfono"
                    value={data.phone}
                    onChange={e => setData('phone', e.target.value)}
                />
                
                <select
    name="user_type"
    value={data.user_type}
    onChange={e => setData('user_type', Number(e.target.value))}
    style={{ color: 'red' }} // 🔴 Esto aplica color al texto seleccionado
>
    {roles.map(role => (
        <option key={role.id} value={role.id}>
            {role.name}
        </option>
    ))}
</select>
                <input
                    type="date"
                    name="birthdate"
                    value={data.birthdate}
                    onChange={e => setData('birthdate', e.target.value)}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Edad"
                    value={data.age}
                    onChange={e => setData('age', Number(e.target.value))}
                />
                <select name="genre" value={data.genre} onChange={e => setData('genre', e.target.value)}>
                    <option value="">Selecciona género</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="other">Otro</option>
                </select>

                <button type="submit" disabled={processing}>Registrar</button>

                {errors && Object.keys(errors).length > 0 && (
                    <div style={{ color: 'red' }}>
                        {Object.values(errors).map((err, i) => <div key={i}>{err}</div>)}
                    </div>
                )}
            </form>
        </div>
    );
}
