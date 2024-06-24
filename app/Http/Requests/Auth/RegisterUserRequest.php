<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required|confirmed',
            'password_confirmation' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Masukan nama anda',
            'email.required' => 'Masukan email anda',
            'email.unique' => 'Email sudah terdaftar dalam system',
            'password.required' => 'Masukan password anda',
            'password.confirmed' => 'Konfirmasi password anda tidak sesuai',
            'password_confirmation.required' => 'Masukan password konfirmasi anda'
        ];
    }
}
